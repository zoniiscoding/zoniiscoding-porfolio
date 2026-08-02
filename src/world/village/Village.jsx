import "../world.css";
import "./village.css";
import { sprites } from "../spriteManifest";
import { LANDMARKS, PATHS, TREE_POS } from "./landmarks";
import Landmark from "./Landmark";
import VillagePath from "./VillagePath";
import Player from "../actors/Player";
import Cat from "../actors/Cat";

// Resolves a PATHS endpoint id ("tree" or a landmark id) to its {x,y}.
const POINTS = { tree: TREE_POS, ...LANDMARKS };

// Standalone landscaping in the gaps between landmarks — not tied to any
// one place, just there so the corners and edges don't read as empty
// grass. Mirrors the density of a real village clearing.
const DECOR = [
  { asset: "bush_mound", top: "42%", left: "7%", width: "13%" },
  { asset: "rock_2", top: "38%", left: "90%", width: "9%" },
  { asset: "bush_1", top: "46%", left: "95%", width: "11%", flip: true },
  { asset: "rock_5", top: "55%", left: "3%", width: "9%" },
  { asset: "bush_3", top: "57%", left: "97%", width: "11%" },
  { asset: "mushroom_1", top: "88%", left: "30%", width: "8%" },
  { asset: "mushroom_2", top: "62%", left: "48%", width: "7%" },
  { asset: "rock_1", top: "90%", left: "62%", width: "8%" },
];

export default function Village({ nav, visited }) {
  const tree = sprites.single.hero_tree;
  const signpost = sprites.single.signpost;
  const bridge = sprites.single.bridge;
  const cloudSm = sprites.single.cloud_sm;
  const cloudMd = sprites.single.cloud_md;

  return (
    <div className="village">
      <div className="village__stage">
        <div className="village__sky" />

        {cloudSm && (
          <img
            src={cloudSm.src}
            alt=""
            aria-hidden="true"
            className="village__cloud"
            style={{ top: "6%", left: "12%", width: "16%", animationDuration: "70s" }}
          />
        )}
        {cloudMd && (
          <img
            src={cloudMd.src}
            alt=""
            aria-hidden="true"
            className="village__cloud"
            style={{ top: "3%", left: "62%", width: "20%", animationDuration: "85s", animationDirection: "reverse" }}
          />
        )}

        <div className="village__ground" />

        {PATHS.map(({ from, to, bulge }, i) => {
          const a = POINTS[from];
          const b = POINTS[to];
          if (!a || !b) return null;
          return <VillagePath key={`${from}-${to}`} from={a} to={b} bulge={bulge} seed={i} />;
        })}

        {DECOR.map(({ asset, top, left, width, flip }, i) => {
          const sprite = sprites.single[asset];
          if (!sprite) return null;
          return (
            <img
              key={`decor-${asset}-${i}`}
              src={sprite.src}
              alt=""
              aria-hidden="true"
              className="village__decor"
              style={{ top, left, width, transform: flip ? "scaleX(-1)" : undefined }}
            />
          );
        })}

        {bridge && (
          <img
            src={bridge.src}
            alt=""
            aria-hidden="true"
            className="village__bridge"
            style={{ top: "82%", left: "94%", width: "16%", transform: "translate(-50%, -30%) rotate(-2deg)" }}
          />
        )}

        {signpost && (
          <img
            src={signpost.src}
            alt=""
            aria-hidden="true"
            className="village__decor"
            style={{ top: `${TREE_POS.y + 12}%`, left: `${TREE_POS.x - 8}%`, width: "6%" }}
          />
        )}

        <img
          src={tree.src}
          alt=""
          aria-hidden="true"
          className="village__tree"
          style={{
            "--x": `${TREE_POS.x}%`,
            "--y": `${TREE_POS.y}%`,
            "--x-mobile": `${TREE_POS.xMobile}%`,
            "--y-mobile": `${TREE_POS.yMobile}%`,
          }}
        />

        {Object.entries(LANDMARKS).map(([id, spot]) => (
          <Landmark
            key={id}
            id={id}
            {...spot}
            artAsset={visited.has(id) && spot.artAssetVisited ? spot.artAssetVisited : spot.artAsset}
            visited={visited.has(id)}
            onSelect={(spotId) => nav.goTo(spotId)}
          />
        ))}

        <Cat />
        <Player />

        {nav.arrivedId &&
          LANDMARKS[nav.arrivedId] &&
          (() => {
            const spot = LANDMARKS[nav.arrivedId];
            const offset = spot.standOffset ?? 8;
            return (
              <button
                type="button"
                className="village__prompt pixel-btn"
                style={{
                  "--x": `${spot.x}%`,
                  "--y": `${spot.y + offset}%`,
                  "--x-mobile": spot.xMobile !== undefined ? `${spot.xMobile}%` : undefined,
                  "--y-mobile": `${(spot.yMobile ?? spot.y) + offset}%`,
                }}
                onClick={() => nav.confirmEnter(nav.arrivedId)}
              >
                Enter {spot.label}
                <kbd>E</kbd>
              </button>
            );
          })()}
      </div>
    </div>
  );
}
