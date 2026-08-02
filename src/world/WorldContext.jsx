import { createContext, useContext, useEffect, useMemo } from "react";
import { createWorld } from "./engine";
import { PLAYER_START } from "./village/landmarks";

const WorldContext = createContext(null);

export function WorldProvider({ children }) {
  const world = useMemo(() => createWorld({ startX: PLAYER_START.x, startY: PLAYER_START.y }), []);

  useEffect(() => {
    world.start();
    return () => world.stop();
  }, [world]);

  return <WorldContext.Provider value={world}>{children}</WorldContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook is colocated with its provider on purpose
export function useWorld() {
  const world = useContext(WorldContext);
  if (!world) throw new Error("useWorld must be used within a WorldProvider");
  return world;
}
