import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  return (
    <div className="group/carousel relative h-full w-full">
      <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl shadow-xl shadow-black/30 ring-1 ring-white/10 md:min-h-[300px] lg:min-h-full lg:rounded-l-2xl lg:rounded-r-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} screenshot ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/carousel:scale-105"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-card/80 text-text opacity-90 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/20 md:left-4 md:h-10 md:w-10 md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-card/80 text-text opacity-90 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/20 md:right-4 md:h-10 md:w-10 md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
