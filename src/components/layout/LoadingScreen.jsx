import { useEffect } from "react";
import { motion } from "framer-motion";
import { sprites } from "../../world/spriteManifest";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
        transition={{
          scale: { duration: 0.4 },
          opacity: { duration: 0.4 },
          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <img src={sprites.single.macbook.src} alt="" aria-hidden="true" style={{ height: "5.5rem" }} />
      </motion.div>

      <motion.p
        className="font-pixel text-sm tracking-widest text-muted uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading portfolio
      </motion.p>

      <motion.div
        className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
