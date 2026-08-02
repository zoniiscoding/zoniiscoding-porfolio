import { sprites } from "../spriteManifest";

/**
 * Scatters bush/rock/mushroom variants around a landmark — reused with
 * variation throughout the village, never placed once. `items`:
 * [{ asset, top, left, width, flip? }], all percentage/CSS-length strings.
 */
export default function Scatter({ items }) {
  return (
    <>
      {items.map(({ asset, top, left, width, flip = false }, i) => {
        const sprite = sprites.single[asset];
        if (!sprite) return null;
        return (
          <img
            key={`${asset}-${i}`}
            src={sprite.src}
            alt=""
            aria-hidden="true"
            className="landmark__scatter"
            style={{ top, left, width, transform: flip ? "scaleX(-1)" : undefined }}
          />
        );
      })}
    </>
  );
}
