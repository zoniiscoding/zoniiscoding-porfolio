import { forwardRef } from "react";

/**
 * Renders one cell from a sprite sheet built by scripts/build-sprites.mjs.
 *
 * Sizing is percentage-based (`background-size: calc(frames * 100%) 100%`),
 * not pixel-based, so the same sheet scales cleanly at any display size set
 * via CSS `height` + `aspect-ratio` — no per-breakpoint math needed.
 *
 * Two ways to animate:
 * - `animate`: a self-running CSS `steps()` loop through every frame at a
 *   fixed `fps`. Use for ambient, time-based motion (idle breathing, coin
 *   spin) — costs no JS.
 * - Scroll- or physics-driven motion (the walk cycle, which must advance by
 *   distance travelled, not time) instead sets `backgroundPositionX` directly
 *   on this component's DOM node via `ref`, bypassing React entirely so it
 *   never triggers a render. See src/world/actors/Player.jsx.
 */
const Sprite = forwardRef(function Sprite(
  { sheet, frame = 0, animate = false, fps = 8, className = "", style, ...rest },
  ref
) {
  const { src, frames, cellW, cellH } = sheet;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`sprite${animate ? " sprite--cycle" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--frames": frames,
        backgroundImage: `url(${src})`,
        aspectRatio: `${cellW} / ${cellH}`,
        backgroundPositionX: animate ? undefined : `${(frame / Math.max(frames - 1, 1)) * 100}%`,
        animationDuration: animate ? `${frames / fps}s` : undefined,
        ...style,
      }}
      {...rest}
    />
  );
});

export default Sprite;
