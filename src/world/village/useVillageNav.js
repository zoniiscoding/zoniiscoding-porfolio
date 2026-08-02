import { useCallback, useEffect, useRef, useState } from "react";
import { useWorld } from "../WorldContext";

// A small pause after arrival before the prompt appears — "stop, face the
// destination, brief idle beat, then reveal" rather than an instant popup
// the moment position matches.
const ARRIVAL_PAUSE_MS = 350;

/**
 * The state machine behind every landmark: walking → a brief arrival pause →
 * either a prompt ("Enter Cottage") for explore-by-click, or straight to
 * open for nav-triggered fast travel. One instance, shared by the whole
 * village, since only one landmark can be "current" at a time.
 */
export function useVillageNav(landmarks) {
  const world = useWorld();
  const [arrivedId, setArrivedId] = useState(null);
  const [openId, setOpenId] = useState(null);
  // Which nav id was actually requested, distinct from openId (the physical
  // landmark). "experience" and "projects" both resolve to the same
  // Workshop landmark — entryId is how the caller knows which one to
  // default its view to. Paired with a token that bumps on every open (not
  // just when the landmark id changes), so re-entering the same landmark
  // via a different nav id is still detectable as a fresh open.
  const [entryId, setEntryId] = useState(null);
  const [openToken, setOpenToken] = useState(0);
  const autoOpenRef = useRef(false);
  const tokenRef = useRef(0);

  const goTo = useCallback(
    (id, { autoOpen = false, landmarkId } = {}) => {
      const targetId = landmarkId ?? id;
      const spot = landmarks[targetId];
      if (!spot) return;
      setArrivedId(null);
      autoOpenRef.current = autoOpen;
      world.walkTo(spot.x, spot.y + (spot.standOffset ?? 8), {
        onArrive: () => {
          world.greet();
          setTimeout(() => {
            if (autoOpenRef.current) {
              tokenRef.current += 1;
              setEntryId(id);
              setOpenId(targetId);
              setOpenToken(tokenRef.current);
            } else {
              setArrivedId(targetId);
            }
          }, ARRIVAL_PAUSE_MS);
        },
      });
    },
    [world, landmarks]
  );

  const confirmEnter = useCallback((id) => {
    tokenRef.current += 1;
    setArrivedId(null);
    setEntryId(id);
    setOpenId(id);
    setOpenToken(tokenRef.current);
  }, []);

  const close = useCallback(() => setOpenId(null), []);

  // Keyboard: E confirms entry once arrived, mirroring the on-screen prompt.
  useEffect(() => {
    if (!arrivedId) return;
    const onKey = (e) => {
      if (e.key === "e" || e.key === "E") confirmEnter(arrivedId);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [arrivedId, confirmEnter]);

  return { arrivedId, openId, entryId, openToken, goTo, confirmEnter, close };
}
