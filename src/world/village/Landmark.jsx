import Scatter from "./Scatter";
import { sprites } from "../spriteManifest";

/**
 * One clickable place in the village — art, grounding scatter, and an
 * ambient "alive at rest" detail. Keyboard users reach it by Tab, Enter/
 * Space to walk there, same as a click. The "Enter X" prompt itself lives
 * in Village.jsx, not here — it's anchored to the player's stand point
 * rather than the landmark's own box, since landmark heights vary wildly
 * (a cottage vs. a mailbox) and anchoring the prompt to the structure kept
 * putting it right where the player's head ends up.
 */
export default function Landmark({
  id,
  x,
  y,
  xMobile,
  yMobile,
  label,
  artAsset,
  width = "14vw",
  scatter = [],
  floorTiles = [],
  ambient,
  visited = false,
  onSelect,
}) {
  const art = sprites.single[artAsset];
  if (!art) return null;

  return (
    <div
      className={`landmark${visited ? " landmark--visited" : ""}`}
      style={{
        "--x": `${x}%`,
        "--y": `${y}%`,
        "--x-mobile": xMobile !== undefined ? `${xMobile}%` : undefined,
        "--y-mobile": yMobile !== undefined ? `${yMobile}%` : undefined,
        "--landmark-w": width,
      }}
    >
      {floorTiles.map(({ asset, top, left, width: tileW }, i) => {
        const tile = sprites.single[asset];
        if (!tile) return null;
        return (
          <img
            key={`floor-${asset}-${i}`}
            src={tile.src}
            alt=""
            aria-hidden="true"
            className="landmark__floor"
            style={{ top, left, width: tileW }}
          />
        );
      })}
      <Scatter items={scatter} />
      <div className="landmark__notice" />
      {ambient === "glow" && (
        <div className="landmark__glow" style={{ width: "30%", height: "18%", left: "35%", top: "8%" }} />
      )}
      <div className={ambient === "sway" ? "landmark__sway" : undefined}>
        <button
          type="button"
          className="landmark__hit"
          onClick={() => onSelect(id)}
          aria-label={`Walk to the ${label}`}
        >
          <img src={art.src} alt="" className="landmark__art" />
        </button>
      </div>
      <span className="landmark__label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
