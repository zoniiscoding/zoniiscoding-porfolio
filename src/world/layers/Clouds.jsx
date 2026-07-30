import { sprites } from "../spriteManifest";

// Fixed, hand-placed positions and drift timings rather than randomized —
// generated randomness on a 3-cloud sky reads as jittery, not deliberate.
const CLOUDS = [
  { key: "cloud_sm", top: "10%", left: "8%", width: "18vw", duration: "34s" },
  { key: "cloud_lg", top: "18%", left: "58%", width: "26vw", duration: "48s" },
  { key: "cloud_md", top: "32%", left: "28%", width: "20vw", duration: "40s" },
];

export default function Clouds() {
  return (
    <>
      {CLOUDS.map(({ key, top, left, width, duration }) => {
        const cloud = sprites.single[key];
        return (
          <img
            key={key}
            src={cloud.src}
            alt=""
            aria-hidden="true"
            className="cloud"
            style={{ top, left, width, "--drift-duration": duration }}
          />
        );
      })}
    </>
  );
}
