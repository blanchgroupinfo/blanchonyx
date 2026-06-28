import { useEffect, useState } from "react";

type MediaItem = {
  src: string;
  type: "image" | "video";
};

// Load all media files from the slideshow folder eagerly at build time.
// This resolves them directly to their static URLs.
const mediaModules = import.meta.glob<string>("../assets/slideshow/*.{png,jpg,jpeg,gif,mp4}", {
  eager: true,
  import: "default",
});

const mediaItems: MediaItem[] = Object.entries(mediaModules)
  .map(([path, src]) => {
    const lowerPath = path.toLowerCase();
    const type = lowerPath.endsWith(".mp4") ? "video" : "image";
    return { src, type };
  })
  .filter((item) => !!item.src)
  // Sort to have a deterministic order (alphabetical by source)
  .sort((a, b) => a.src.localeCompare(b.src));

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  // Auto‑advance the slideshow every 5 seconds
  useEffect(() => {
    if (mediaItems.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % mediaItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (mediaItems.length === 0) {
    return null; // nothing to show yet
  }

  const current = mediaItems[index];

  return (
    <div className="relative w-full max-w-[1100px] mx-auto overflow-hidden rounded-2xl shadow-2xl aspect-video md:aspect-[16/9] bg-black/40 flex items-center justify-center">
      {current.type === "image" ? (
        <img
          src={current.src}
          alt="Slideshow item"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={current.src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {/* Simple navigation dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {mediaItems.map((_, i) => (
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
