import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Fires `onEnter` once — the first time the returned ref's element becomes
 * sufficiently visible while scrolling. Used to choreograph section
 * entrances (e.g. the player waving before the About dialogue opens).
 */
export function useSectionEvents(onEnter, { threshold = 0.4 } = {}) {
  const ref = useRef(null);
  const firedRef = useRef(false);
  const onEnterRef = useRef(onEnter);

  useLayoutEffect(() => {
    onEnterRef.current = onEnter;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !firedRef.current) {
          firedRef.current = true;
          onEnterRef.current?.();
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
