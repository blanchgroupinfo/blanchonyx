import { useEffect, useState } from "react";

// Load all media files from the slideshow folder using Vite's glob import.
// This returns an object where the key is the relative path and the value is a function
// that resolves to the module (the URL of the asset).
const mediaModules = import.meta.glob("../assets/slideshow/*.{png,jpg,jpeg,gif,mp4}");

type MediaItem = {
  src: string;
  type: "image" | "video";
};

export default function Slideshow() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [index, setIndex] = useState(0);

  // Load media URLs once on mount
  useEffect(() => {
    const load = async () => {
      const entries = Object.entries(mediaModules);
      const items: MediaItem[] = [];
      for (const [path, resolver] of entries) {
        const mod = await (resolver as () => Promise<{ default: string }> )();
        const src = mod.default;
        const lower = src.toLowerCase();
        const type = lower.endsWith(".mp4") ? "video" : "image";
        items.push({ src, type });
      }
      // Sort to have a deterministic order (alphabetical by path)
      items.sort((a, b) => a.src.localeCompare(b.src));
      setMedia(items);
    };
    load();
  }, []);

  // Auto‑advance the slideshow every 5 seconds
  useEffect(() => {
    if (media.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % media.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [media]);

  if (media.length === 0) {
    return null; // nothing to show yet
  }

  const current = media[index];

  return (
<div className="relative w-full-[1100px] max-w-mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {current.type === "image" ? (
          <img
          src={current.src}
          alt="Slideshow item"
          className="w-full-[1100px] h-object-cover"
  />
        ) : (
        <video
          src={current.src}
          className="w-full-[1100px] h-object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {/* Simple navigation dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-primary" : "bg-gray-400"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
