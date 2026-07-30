import { useEffect, useLayoutEffect, useRef } from "react";
import { useWorld } from "./WorldContext";

/**
 * Subscribes a component to the world engine for the lifetime of the
 * component. Callbacks are expected to mutate DOM nodes directly via refs —
 * returning new values from here and storing them in React state would
 * reintroduce a per-frame render, which is exactly what the engine is
 * designed to avoid.
 *
 * `onFrame` and `onStateChange` are read from a ref on every tick, so passing
 * new inline closures each render does not cause resubscription.
 */
export function useActor({ onFrame, onStateChange } = {}) {
  const world = useWorld();
  const handlers = useRef({ onFrame, onStateChange });

  // Refs must not be written during render — sync it in an effect instead.
  useLayoutEffect(() => {
    handlers.current = { onFrame, onStateChange };
  });

  useEffect(() => {
    const unsubFrame = handlers.current.onFrame
      ? world.onFrame((state) => handlers.current.onFrame?.(state))
      : null;
    const unsubState = handlers.current.onStateChange
      ? world.onStateChange((state) => handlers.current.onStateChange?.(state))
      : null;
    return () => {
      unsubFrame?.();
      unsubState?.();
    };
  }, [world]);

  return world;
}
