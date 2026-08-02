import { useEffect, useRef } from "react";
import Sprite from "../../components/pixel/Sprite";
import { sprites } from "../spriteManifest";
import { useActor } from "../useActor";

// The 4-frame sheet is two 2-frame trots (0-1 facing one way, 2-3 the other —
// see scripts/build-sprites.mjs / public/assets/README.md). Rather than mix
// them, only frames 0-1 are used, mirrored via the `data-facing` CSS
// transform, matching how the player's own facing flip works.
const CAT_STRIDE = 2.6; // deliberately different from the player's stride so the two don't move in lockstep

/**
 * The cat's lag behind the player is a CSS transition, not hand-rolled JS
 * lerp: its left/top are set to the player's own position every frame (same
 * as Player.jsx), and a `transition` on those properties means the browser
 * is always easing toward a slightly-stale target while the player is
 * moving, then settles the rest of the way on its own once the player stops
 * — even after the engine's rAF loop has already gone quiet.
 */
export default function Cat() {
  const rootRef = useRef(null);
  const poseRef = useRef(null);
  const cat = sprites.sheets.cat;

  const world = useActor({
    onFrame: ({ x, y, distance, moving }) => {
      const root = rootRef.current;
      if (!root) return;
      root.style.left = `${x}%`;
      root.style.top = `${y}%`;
      if (moving && poseRef.current) {
        const idx = Math.floor(distance / CAT_STRIDE) % 2;
        poseRef.current.style.backgroundPositionX = `${(idx / (cat.frames - 1)) * 100}%`;
      }
    },
    onStateChange: ({ moving, facing }) => {
      const root = rootRef.current;
      if (!root) return;
      root.dataset.state = moving ? "walk" : "idle";
      root.dataset.facing = facing;
      if (!moving && poseRef.current) poseRef.current.style.backgroundPositionX = "0%";
    },
  });

  // See Player.jsx — onFrame only fires once movement starts.
  useEffect(() => {
    const { x, y } = world.getSnapshot();
    const root = rootRef.current;
    if (root) {
      root.style.left = `${x}%`;
      root.style.top = `${y}%`;
    }
  }, [world]);

  // Occasional "look around" flourish while idle. A plain timer rather than
  // an engine subscription — it's cosmetic personality, not movement, so it
  // has no business running only while the player is walking.
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
