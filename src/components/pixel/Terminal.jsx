import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionEvents } from "../../hooks/useSectionEvents";
import { useTypewriter } from "../../hooks/useTypewriter";

const BOOT_TEXT = "> loading projects...";

/**
 * A brief boot beat before the project windows appear — "launched from a
 * terminal" rather than "here's a list of cards." Kept short on purpose:
 * this is a wink, not a gate. A recruiter skimming for project links should
 * never feel like they're waiting on a fake loading screen.
 */
export default function Terminal({ children }) {
  const [active, setActive] = useState(false);
  const sectionRef = useSectionEvents(() => setActive(true));
  const { displayed, done } = useTypewriter(BOOT_TEXT, { active, speed: 18 });

  return (
    <div ref={sectionRef}>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mb-8 w-fit rounded-lg border-2 border-soil/30 bg-soil px-5 py-3 font-mono text-sm text-gold"
          >
            {displayed}
            <span className="animate-pulse">_</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
