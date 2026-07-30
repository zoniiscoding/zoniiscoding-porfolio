import "./pixel.css";
import { sprites } from "../../world/spriteManifest";
import { nineSliceStyle } from "./nineSlice";
import { useTypewriter } from "../../hooks/useTypewriter";

const SCALE = 0.42;

/**
 * NPC-style dialogue box (public/assets/ui/dialog_box.png) with a typewriter
 * reveal — used by About and Contact. The heart and continue-arrow were cut
 * out of the sliceable art at build time (see scripts/build-sprites.mjs) and
 * are layered back on here as free-floating ornaments so the box itself
 * stretches cleanly to any amount of text.
 *
 * The animated text is aria-hidden; a plain, complete copy sits alongside it
 * for screen readers, so nothing is ever gated behind the animation.
 */
export default function PixelDialog({ text, speaker, active = true, className = "" }) {
  const box = nineSliceStyle(sprites.ui.dialog, SCALE);
  const { displayed, done } = useTypewriter(text, { active });

  return (
    <div className={`pixel-dialog${className ? ` ${className}` : ""}`}>
      <img
        src={sprites.single.dialog_heart.src}
        alt=""
        aria-hidden="true"
        className="pixel-dialog__heart"
      />
      <div className="pixel-dialog__box" style={box}>
        {speaker && <p className="pixel-dialog__speaker">{speaker}</p>}
        <p className="pixel-dialog__text" aria-hidden="true">
          {displayed}
          {!done && <span className="pixel-dialog__cursor">|</span>}
        </p>
        <p className="sr-only">{text}</p>
        {done && (
          <img
            src={sprites.single.dialog_arrow.src}
            alt=""
            aria-hidden="true"
            className="pixel-dialog__arrow"
          />
        )}
      </div>
    </div>
  );
}
