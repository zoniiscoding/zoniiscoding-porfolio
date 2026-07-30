import { useEffect, useRef } from "react";
import { sprites } from "../spriteManifest";
import { useActor } from "../useActor";
import Player from "../actors/Player";
import Cat from "../actors/Cat";

export default function Ground() {
  const stripRef = useRef(null);
  const tileWidthRef = useRef(1);
  const ground = sprites.single.ground;
  const aspect = ground.width / ground.height;

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => {
      tileWidthRef.current = el.clientHeight * aspect || 1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect]);

  useActor({
    onFrame: ({ worldOffset }) => {
      const el = stripRef.current;
      if (!el) return;
      const tileW = tileWidthRef.current;
      // Wrapped into [-tileW, 0) so the background never has to jump — it
      // just keeps scrolling and repeating.
      const offset = -(((worldOffset % tileW) + tileW) % tileW);
      el.style.backgroundPositionX = `${offset}px`;
    },
  });

  return (
    <div className="world-ground" aria-hidden="true">
      <div
        ref={stripRef}
        className="ground-strip"
        style={{ backgroundImage: `url(${ground.src})`, backgroundSize: "auto 100%" }}
      />
      <div className="actors">
        <Cat />
        <Player />
      </div>
    </div>
  );
}
