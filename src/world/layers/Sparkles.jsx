import Sprite from "../../components/pixel/Sprite";
import { sprites } from "../spriteManifest";

// Hand-picked frame indices (distinct star designs, not animation frames of
// one sparkle) and scattered positions with staggered twinkle timing.
const SPARKLES = [
  { frame: 0, top: "14%", left: "12%", size: "2.2vw", delay: "0s", duration: "2.8s" },
  { frame: 2, top: "24%", left: "82%", size: "2.6vw", delay: "0.8s", duration: "3.2s" },
  { frame: 5, top: "9%", left: "45%", size: "1.8vw", delay: "1.5s", duration: "2.4s" },
  { frame: 8, top: "38%", left: "68%", size: "2vw", delay: "0.4s", duration: "3s" },
  { frame: 3, top: "44%", left: "18%", size: "1.6vw", delay: "2s", duration: "2.6s" },
];

export default function Sparkles() {
  const sheet = sprites.sheets.sparkle;
  return (
    <>
      {SPARKLES.map(({ frame, top, left, size, delay, duration }, i) => (
        <Sprite
          key={i}
          sheet={sheet}
          frame={frame}
          className="sparkle"
          style={{
            top,
            left,
            width: size,
            "--twinkle-delay": delay,
            "--twinkle-duration": duration,
          }}
        />
      ))}
    </>
  );
}
