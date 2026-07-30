import { useEffect, useRef } from "react";
import Sprite from "../../components/pixel/Sprite";
import { sprites } from "../spriteManifest";
import { useActor } from "../useActor";

// The 4-frame sheet is two 2-frame trots (0-1 facing one way, 2-3 the other —
// see scripts/build-sprites.mjs / public/assets/README.md). Rather than mix
// them, only frames 0-1 are used, mirrored via the `data-facing` CSS
// transform, matching how the player's own facing flip works.
const CAT_STRIDE = 34; // deliberately different from the player's stride so the two don't move in lockstep

export default function Cat() {
  const rootRef = useRef(null);
  const poseRef = useRef(null);
  const cat = sprites.sheets.cat;

  useActor({
    onFrame: ({ worldOffset, moving }) => {
      if (!moving || !poseRef.current) return;
      const idx = Math.floor(Math.abs(worldOffset) / CAT_STRIDE) % 2;
      poseRef.current.style.backgroundPositionX = `${(idx / (cat.frames - 1)) * 100}%`;
    },
    onStateChange: ({ moving, facing }) => {
      const root = rootRef.current;
      if (!root) return;
      root.dataset.state = moving ? "walk" : "idle";
      root.dataset.facing = facing;
      if (!moving && poseRef.current) poseRef.current.style.backgroundPositionX = "0%";
    },
  });

  // Occasional "look around" flourish while idle. A plain timer rather than
  // an engine subscription — it's cosmetic personality, not scroll-driven,
  // so it has no business running 60x/second.
  useEffect(() => {
    let timeoutId;
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        if (rootRef.current?.dataset.state === "idle") {
          poseRef.current?.classList.add("cat__look");
          setTimeout(() => poseRef.current?.classList.remove("cat__look"), 700);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div ref={rootRef} className="cat" data-state="idle" data-facing="1">
      <Sprite ref={poseRef} sheet={cat} frame={0} className="cat__pose" />
    </div>
  );
}
