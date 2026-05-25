import { motion } from "framer-motion";
import { Code2, Database, Box, Terminal, Braces, Layers } from "lucide-react";

const icons = [
  { Icon: Code2, x: "8%", y: "18%", delay: 0 },
  { Icon: Database, x: "88%", y: "22%", delay: 0.5 },
  { Icon: Box, x: "12%", y: "72%", delay: 1 },
  { Icon: Terminal, x: "85%", y: "68%", delay: 1.2 },
  { Icon: Braces, x: "78%", y: "42%", delay: 0.8 },
  { Icon: Layers, x: "18%", y: "45%", delay: 0.3 },
];

export default function FloatingTechIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-card/40 text-primary/60 backdrop-blur-sm md:h-14 md:w-14"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </motion.div>
      ))}
    </div>
  );
}
