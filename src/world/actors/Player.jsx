import { useEffect, useRef } from "react";
import Sprite from "../../components/pixel/Sprite";
import { sprites } from "../spriteManifest";
import { useActor } from "../useActor";

// World px of travel per walk-cycle frame advance. Distance-driven, not
// time-driven — this is what keeps the feet planted instead of sliding: if
// the visitor stops mid-scroll, the frame simply stops with them.
const STRIDE = 60;

// Must match the .player__pose--wave animation-duration in world.css.
const WAVE_DURATION_MS = 950;

export default function Player() {
  const rootRef = useRef(null);
  const walkRef = useRef(null);
  const walk = sprites.player.walk;

  const world = useActor({
    onFrame: ({ worldOffset, moving }) => {
      if (!moving || !walkRef.current) return;
      const idx = Math.floor(Math.abs(worldOffset) / STRIDE) % walk.frames;
      walkRef.current.style.backgroundPositionX = `${(idx / (walk.frames - 1)) * 100}%`;
    },
    onStateChange: ({ moving, facing }) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.dataset.state !== "wave") root.dataset.state = moving ? "walk" : "idle";
      root.style.setProperty("--facing", facing);
    },
  });

  // One-off greeting gesture, e.g. triggered when the About section scrolls
  // into view — see useSectionEvents. Independent of the continuous
  // idle/walk state machine above.
  useEffect(() => {
    return world.onGreet(() => {
      const root = rootRef.current;
      if (!root) return;
      root.dataset.state = "wave";
      setTimeout(() => {
        if (root.dataset.state === "wave") {
          root.dataset.state = world.getSnapshot().moving ? "walk" : "idle";
        }
      }, WAVE_DURATION_MS);
    });
  }, [world]);

  return (
    <div ref={rootRef} className="player" data-state="idle">
      {/* Animated via the bespoke .player__pose--idle keyframe in world.css,
          not Sprite's generic uniform cycle — see the comment there. */}
      <Sprite sheet={sprites.player.idle} className="player__pose player__pose--idle" />
      <Sprite ref={walkRef} sheet={walk} className="player__pose player__pose--walk" />
      <Sprite sheet={sprites.player.wave} className="player__pose player__pose--wave" />
    </div>
  );
}
