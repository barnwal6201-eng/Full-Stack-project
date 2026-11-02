import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const CONTROLS = [
  "play-large",
  "restart",
  "rewind",
  "play",
  "fast-forward",
  "progress",
  "current-time",
  "duration",
  "mute",
  "volume",
  "captions",
  "settings",
  "pip",
  "airplay",
  "fullscreen",
];

export default function TrailerPlayer({ src, isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!isOpen || !video || !src) return;

    let hls = null;
    let player = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const heights = [...new Set(hls.levels.map((l) => l.height))].sort(
          (a, b) => b - a
        );

        player = new Plyr(video, {
          controls: CONTROLS,
          quality: {
            default: 240, //  Auto
            options: [0, ...heights],
            forced: true,
            onChange: (height) => {
              // -1 lets hls.js choose the quality automatically
              hls.currentLevel =
                height === 0
                  ? -1
                  : hls.levels.findIndex((l) => l.height === height);
            },
          },
        });
      });
    } else {
      video.src = src;
      player = new Plyr(video, { controls: CONTROLS });
    }

    return () => {
      player?.destroy();
      hls?.destroy();
      if (!Hls.isSupported()) {
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [src, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <button
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-10 right-0 text-3xl text-white hover:text-gray-300"
        >
          x
        </button>

        <video ref={videoRef} playsInline autoPlay className="w-full rounded-lg" />
      </div>
    </div>
  );
}