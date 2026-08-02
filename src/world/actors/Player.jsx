import { useEffect, useRef } from "react";
import Sprite from "../../components/pixel/Sprite";
import { sprites } from "../spriteManifest";
import { useActor } from "../useActor";

// Percentage-points of stage distance travelled per walk-cycle frame advance.
// Distance-driven, not time-driven — this is what keeps the feet planted
// instead of sliding: if a walk is interrupted mid-tween, the frame simply
// stops with it rather than looping on a timer regardless of motion.
const STRIDE = 4.5;

// Must match .player__pose--wave's animation-duration in world.css.
const WAVE_DURATION_MS = 950;

export default function Player() {
  const rootRef = useRef(null);
  const walkRef = useRef(null);
  const walk = sprites.player.walk;

  const world = useActor({
    onFrame: ({ x, y, distance, moving }) => {
      const root = rootRef.current;
      if (!root) return;
      root.style.left = `${x}%`;
      root.style.top = `${y}%`;
      if (moving && walkRef.current) {
        const idx = Math.floor(distance / STRIDE) % walk.frames;
        walkRef.current.style.backgroundPositionX = `${(idx / (walk.frames - 1)) * 100}%`;
      }
    },
    onStateChange: ({ moving, facing }) => {
      const root = rootRef.current;
      if (!root) return;
      // A new walk always wins, even over a wave still mid-playback — you
      // shouldn't keep waving once you've set off toward the next landmark.
      // Arrival (moving: false) still defers to an active wave, since greet()
      // is what sets "wave" in the first place, right after this fires.
      if (moving) root.dataset.state = "walk";
      else if (root.dataset.state !== "wave") root.dataset.state = "idle";
      root.style.setProperty("--facing", facing);
    },
  });

  // onFrame only fires once movement starts — without this, the player has
  // no left/top at all until the first walkTo(), since nothing ever pushed
  // the engine's initial position to the DOM.
  useEffect(() => {
    const { x, y } = world.getSnapshot();
    const root = rootRef.current;
    if (root) {
      root.style.left = `${x}%`;
      root.style.top = `${y}%`;
    }
  }, [world]);

  // One-off greeting gesture, e.g. triggered on arrival at a landmark.
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
