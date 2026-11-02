import { spawn } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";

// Number of pieces per quality. Change only here, in code. Admins never see it.
export const TRAILER_SEGMENT_COUNT = 10;

// Where the server saves the generated files
const HLS_ROOT = path.resolve("public/hls");

// The address the frontend uses to reach the server
const BASE_URL = process.env.PUBLIC_BASE_URL || "http://localhost:5000";

// The three qualities to create
const QUALITIES = [
  { name: "480p", height: 480, bitrate: "800k" },
  { name: "720p", height: 720, bitrate: "2500k" },
  { name: "1080p", height: 1080, bitrate: "5000k" },
];

// Runs a command (like ffmpeg) and waits until it finishes
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    let errorText = "";
    child.stderr.on("data", (data) => (errorText += data));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(errorText.slice(-500)));
    });
  });
}

// Reads how long the video is, in seconds
function getVideoLength(file) {
  return new Promise((resolve, reject) => {
    let output = "";
    const child = spawn("ffprobe", [
      "-v", "error",
      "-show_entries", "format=duration",
      "-of", "csv=p=0",
      file,
    ]);
    child.stdout.on("data", (data) => (output += data));
    child.on("error", reject);
    child.on("close", () => {
      const seconds = parseFloat(output);
      if (!seconds) reject(new Error("Could not read video length"));
      else resolve(seconds);
    });
  });
}

// Main function: takes the uploaded trailer URL and returns the master playlist URL
export async function buildHlsFromUrl(sourceUrl, movieId, segmentCount) {

  // A temporary folder for working files
  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "hls-"));
  const inputFile = path.join(workDir, "source.mp4");
  const outputDir = path.join(workDir, "out");

  try {
    await fs.mkdir(outputDir);

    // 1. Download the uploaded trailer from Cloudinary
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    await fs.writeFile(inputFile, Buffer.from(await response.arrayBuffer()));

    // 2. Find the video length and the exact cut times
    const totalSeconds = await getVideoLength(inputFile);
    const pieceSeconds = totalSeconds / segmentCount;

    // Cut points for pieces 1 to (segmentCount - 1), e.g. for 10: 9 cut points
    const cutTimes = Array.from({ length: segmentCount - 1 }, (_, i) =>
      ((totalSeconds * (i + 1)) / segmentCount).toFixed(3)
    ).join(",");

    // 3. Build the ffmpeg command
    // One copy of the video per quality, each resized to its height
    const n = QUALITIES.length;
    const splitLabels = QUALITIES.map((_, i) => `[v${i}]`).join("");
    const resizeParts = QUALITIES.map(
      (q, i) => `[v${i}]scale=-2:${q.height}[v${i}out]`
    );
    const filter = `[0:v]split=${n}${splitLabels};${resizeParts.join(";")}`;

    const args = ["-y", "-i", inputFile, "-filter_complex", filter];

    // For each quality: video stream, bitrate, and audio
    QUALITIES.forEach((q, i) => {
      args.push(
        "-map", `[v${i}out]`,
        `-c:v:${i}`, "libx264",
        `-b:v:${i}`, q.bitrate,
        "-map", "0:a:0?",
        `-c:a:${i}`, "aac",
        `-b:a:${i}`, "128k"
      );
    });

    // Pair each video with its audio, and name it, so files are video_480p_..., video_720p_..., etc.
    const streamMap = QUALITIES.map((q, i) => `v:${i},a:${i},name:${q.name}`).join(" ");

    args.push(
      "-preset", "veryfast",
      // Force a keyframe at each exact cut point
      "-force_key_frames", cutTimes,
      // Stop extra cuts at scene changes
      "-sc_threshold", "0",
      "-f", "hls",
      // Half a piece, so each forced keyframe starts a new segment
      "-hls_time", (pieceSeconds / 2).toFixed(3),
      "-hls_playlist_type", "vod",
      "-hls_segment_filename", path.join(outputDir, "video_%v_%04d.ts"),
      "-master_pl_name", "video.m3u8",
      "-var_stream_map", streamMap,
      path.join(outputDir, "video_%v.m3u8")
    );

    // 4. Create the files
    await runCommand("ffmpeg", args);

    // 5. Copy the finished files into the public folder for this movie
    const targetDir = path.join(HLS_ROOT, movieId);
    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(HLS_ROOT, { recursive: true });
    await fs.cp(outputDir, targetDir, { recursive: true });

    // 6. Return the master playlist address (this is what gets saved)
    return `${BASE_URL}/hls/${movieId}/video.m3u8`;
  } finally {
    // Delete the temporary working files
    await fs.rm(workDir, { recursive: true, force: true });
  }
}