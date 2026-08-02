import { sprites } from "../spriteManifest";

// Wider, flatter tiles read as a flowing trail; the tall corner/T-junction
// pieces are saved for actual junctions (see Village.jsx's tree-side paths).
const TRAIL_TILES = ["path_1", "path_2", "path_5", "path_6", "path_8", "path_9"];

function pointOnQuadratic(p0, p1, p2, t) {
  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
  return { x, y };
}

/**
 * A hand-placed stone trail between two points, gently curved (not a ruler
 * line) via a perpendicular bulge on its midpoint — this is what makes the
 * village read as one connected place with paths that wind, rather than
 * landmarks floating independently.
 */
export default function VillagePath({ from, to, bulge = 0, steps = 5, tileWidth = "6%", seed = 0 }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const control = { x: mx + (-dy / len) * bulge, y: my + (dx / len) * bulge };

  const tiles = [];
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const pos = pointOnQuadratic(from, control, to, t);
    tiles.push({ ...pos, asset: TRAIL_TILES[(i + seed) % TRAIL_TILES.length] });
  }

  return (
    <>
      {tiles.map((tile, i) => {
        const sprite = sprites.single[tile.asset];
        if (!sprite) return null;
        return (
          <img
            key={i}
            src={sprite.src}
            alt=""
            aria-hidden="true"
            className="village__path-tile"
            style={{ left: `${tile.x}%`, top: `${tile.y}%`, width: tileWidth }}
          />
        );
      })}
    </>
  );
}
