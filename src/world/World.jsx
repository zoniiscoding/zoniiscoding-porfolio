import "./world.css";
import Clouds from "./layers/Clouds";
import Sparkles from "./layers/Sparkles";
import Ground from "./layers/Ground";

/**
 * The decorative game layer: fixed, behind all page content, and completely
 * inert to interaction (`pointer-events: none` throughout in world.css). The
 * document underneath is a normal scrolling page — this never hijacks scroll
 * or intercepts input, so keyboard nav, screen readers and find-in-page all
 * keep working untouched.
 *
 * Must render under a <WorldProvider> — that's mounted in App.jsx rather than
 * here, so section components (e.g. About's wave-before-dialogue moment) can
 * also reach the world via useWorld() without being nested inside this tree.
 */
export default function World() {
  return (
    <>
      <div className="world-sky" aria-hidden="true">
        <Clouds />
        <Sparkles />
      </div>
      <Ground />
    </>
  );
}
