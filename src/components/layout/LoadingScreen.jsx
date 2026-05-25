import { useEffect } from "react";
import { motion } from "framer-motion";

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
        className="relative mb-8 h-16 w-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-xl bg-gradient-to-br from-primary to-secondary"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-white">
          TJ
        </span>
      </motion.div>

      <motion.p
        className="font-mono text-sm tracking-widest text-muted uppercase"
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
