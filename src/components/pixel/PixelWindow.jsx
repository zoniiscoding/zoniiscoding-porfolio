import { motion } from "framer-motion";
import "./pixel.css";
import { sprites } from "../../world/spriteManifest";
import { nineSliceStyle } from "./nineSlice";

const TOP_SCALE = 0.34;
const BODY_SCALE = 0.34;

const openAnimation = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Retro OS window (public/assets/ui/retro_window.png) — used for Projects,
 * Skills and Experience/Education. Split into two art pieces at build time
 * (title strip + body): slicing the whole window as one image would need a
 * huge inset to clear the title-bar buttons, eating content width down the
 * entire right edge. See scripts/build-sprites.mjs.
 */
export default function PixelWindow({ title, children, className = "", bodyClassName = "" }) {
  const top = nineSliceStyle(sprites.ui.window_top, TOP_SCALE);
  const body = nineSliceStyle(sprites.ui.window_body, BODY_SCALE);

  return (
    <motion.div
      className={`pixel-window${className ? ` ${className}` : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={openAnimation}
    >
      <div className="pixel-window__top" style={top}>
        {title && <span className="pixel-window__title">{title}</span>}
      </div>
      <div className={`pixel-window__body${bodyClassName ? ` ${bodyClassName}` : ""}`} style={body}>
        {children}
      </div>
    </motion.div>
  );
}
