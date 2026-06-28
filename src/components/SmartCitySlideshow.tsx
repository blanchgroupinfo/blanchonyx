import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

type MediaItem = {
  src: string;
  type: "image" | "video";
  title: string;
  desc: string;
};

// Eager load all smart city assets
const mediaModules = import.meta.glob<string>("../assets/smart-city-slideshow/*.{png,jpg,jpeg,gif,mp4,webp}", {
  eager: true,
  import: "default",
});

const infoMap: Record<string, { title: string; desc: string }> = {
  colonnade_skyline: {
    title: "The Colonnade Skyline & Concentric District",
    desc: "A futuristic 8-ring eco-sovereign city design under a starry desert night, where blue illumination signifies advanced intelligence, trust, and secure infrastructure.",
  },
  grand_plaza: {
    title: "Blanch Colonnade Grand Plaza",
    desc: "The ceremonial and cultural heart of the city—a grand plaza for conventions, major launches, and celebrations featuring synchronized fountain displays and menorah fireworks.",
  },
  supercar_desert: {
    title: "Sovereign Mobility & Desert Outpost",
    desc: "Combining sovereign land holdings, autonomous transport, and digital identity platforms within a secure kingdom-aligned physical and digital corridor.",
  },
};

const mediaItems: MediaItem[] = Object.entries(mediaModules)
  .map(([path, src]) => {
    const filename = path.split("/").pop()?.split(".")[0] || "";
    const type = path.toLowerCase().endsWith(".mp4") ? "video" : "image";
    const info = infoMap[filename] || {
      title: "Smart City Vista",
      desc: "A landmark destination of the Blanch Corridor.",
    };
    return {
      src,
      type,
      title: info.title,
      desc: info.desc,
    };
  })
  .filter((item) => !!item.src);

export default function SmartCitySlideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (mediaItems.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  if (mediaItems.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const current = mediaItems[index];

  return (
    <div className="w-full max-w-5xl mx-auto my-12" id="smart-city-slideshow-container">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-primary/25 bg-card/40 backdrop-blur-md shadow-2xl group">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <video
                src={current.src}
                className="w-full h-full object-cover select-none"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
            {/* Subtle gradient overlay to enhance text readability */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end min-h-[120px]">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-[10px] tracking-[0.2em] font-heading uppercase text-primary">ARCHITECTURAL RENDER {index + 1}/{mediaItems.length}</span>
              </div>
              <h3 className="font-heading text-lg md:text-2xl text-white tracking-wider mb-2">{current.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm max-w-3xl leading-relaxed">{current.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Manual controls (visible on hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/30 bg-black/60 hover:bg-black/80 flex items-center justify-center text-primary/80 hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/30 bg-black/60 hover:bg-black/80 flex items-center justify-center text-primary/80 hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dynamic page indicator dots */}
        <div className="absolute top-4 right-4 flex space-x-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-primary w-4" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
