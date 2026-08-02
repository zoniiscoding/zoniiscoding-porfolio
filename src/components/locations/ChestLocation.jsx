import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import PixelButton from "../pixel/PixelButton";
import { sprites } from "../../world/spriteManifest";
import { personal } from "../../data/portfolio";

const STAGES = ["chest_closed", "chest_opening", "chest_open"];

/**
 * Plays the closed -> opening -> open reveal once, the first time this
 * chest is opened this session — on later visits it jumps straight to the
 * open state (the chest itself stays "open" in the village too, see
 * Village.jsx's artAssetVisited).
 */
const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function ChestLocation({ titleId, firstVisit }) {
  const playReveal = firstVisit && !reduceMotion;
  const [stageIndex, setStageIndex] = useState(playReveal ? 0 : 2);
  const revealed = stageIndex === 2;

  useEffect(() => {
    if (!playReveal) return;
    const t1 = setTimeout(() => setStageIndex(1), 450);
    const t2 = setTimeout(() => setStageIndex(2), 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [playReveal]);

  const art = sprites.single[STAGES[stageIndex]];

  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">Resume</span>
        <h2 id={titleId} className="location-heading__title">
          Treasure Chest
        </h2>
        <p className="location-heading__subtitle">Everything above, in one document</p>
      </div>

      <div className="location-reveal">
        <motion.img
          key={stageIndex}
          src={art.src}
          alt=""
          aria-hidden="true"
          className="location-reveal__art"
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A one-page summary of my experience, projects, and education — opens in a new tab.
            </p>
            <PixelButton href={personal.resume} external icon={FileText}>
              View Resume
            </PixelButton>
          </motion.div>
        )}
      </div>
    </>
  );
}
