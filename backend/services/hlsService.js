import path from "path";

export const TRAILER_SEGMENT_COUNT = 10;

/**
 * Clean replacement: Removes ffmpeg processing entirely.
 * Instead of transcoding locally, it converts a standard Cloudinary delivery URL
 * into an Adaptive Bitrate HLS Master Playlist URL using Cloudinary's streaming profiles.
 */
export async function buildHlsFromUrl(sourceUrl, movieId, segmentCount) {
  try {
    if (!sourceUrl) throw new Error("No source URL provided");
    
    if (!sourceUrl.includes("cloudinary.com")) {
      throw new Error("Source URL must be a valid Cloudinary delivery URL to use auto-HLS styling.");
    }

    // 2. Locate the /video/upload/ position to inject the streaming profile
    const targetPattern = "/video/upload/";
    const uploadIndex = sourceUrl.indexOf(targetPattern);
    
    if (uploadIndex === -1) {
      throw new Error("Could not parse Cloudinary URL structure.");
    }

    // 3. Extract the base URL and the remaining file path
    const baseUrl = sourceUrl.substring(0, uploadIndex + targetPattern.length);
    let remainingPath = sourceUrl.substring(uploadIndex + targetPattern.length);

    // 4. Strip any existing version tags (e.g., v1793616236/) to allow the manifest generation safely
    remainingPath = remainingPath.replace(/^v\d+\//, "");

    // 5. Swap out the extension from .mp4 (or whatever it is) to .m3u8 for HLS
    const extension = path.extname(remainingPath);
    if (extension) {
      remainingPath = remainingPath.substring(0, remainingPath.length - extension.length);
    }
    remainingPath += ".m3u8";

    /**
     * 6. Construct the Master Playlist URL
     * 'sp_auto' tells Cloudinary to automatically generate multiple streaming layers 
     * (matching your original goals for 480p, 720p, etc.) dynamically based on client bandwidth.
     */
    const masterPlaylistUrl = `${baseUrl}sp_auto/${remainingPath}`;

    // Return the Cloudinary-hosted HLS link directly instead of your localhost public route
    return masterPlaylistUrl;

  } catch (error) {
    console.error("Failed to map Cloudinary HLS playlist:", error);
    throw error;
  }
}
