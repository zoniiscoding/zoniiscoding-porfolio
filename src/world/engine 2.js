/**
 * Framework-agnostic scroll-driven world engine. One requestAnimationFrame
 * loop for the whole site, shared by every consumer via WorldContext.
 *
 * Deliberately small: purely time-based ambient loops (idle breathing, coin
 * spin, cloud drift, sparkle twinkle) are plain CSS `steps()`/keyframe
 * animations and never touch this engine. This only computes the things that
 * are genuinely tied to *scroll* — how far the world has travelled, and
 * whether the player is currently walking — and hands that off to
 * subscribers, which mutate their own DOM nodes directly. No subscriber ever
 * triggers a React re-render from here.
 */

// How many world px the ground/player travel per page px scrolled. Kept below
// 1 so the world reads as a bigger place than the page is tall.
const WORLD_SPEED = 0.55;
// Smoothed px/ms scroll speed above which the player is considered "walking".
const WALK_THRESHOLD = 0.12;
// How long (ms) speed must stay below threshold before switching back to idle.
// Prevents flicker between idle/walk at the edge of a scroll gesture.
const IDLE_DELAY = 160;
// Exponential smoothing factor for velocity — higher reacts faster, lower is calmer.
const VELOCITY_SMOOTHING = 0.2;

export function createWorld() {
  let running = false;
  let rafId = null;
  let lastT = 0;
  let lastScrollY = typeof window === "undefined" ? 0 : window.scrollY;
  let smoothedVelocity = 0;
  let worldOffset = lastScrollY * WORLD_SPEED;
  let moving = false;
  let facing = 1;
  let idleTimer = 0;

  /** Called every animation frame. For continuous values: ground offset, walk-frame index. */
  const frameListeners = new Set();
  /** Called only when `moving` or `facing` actually change. For CSS state/class toggles. */
  const stateListeners = new Set();
  /** One-shot broadcast, e.g. "play the wave gesture now" — see Player.jsx / About.jsx. */
  const greetListeners = new Set();

  function tick(t) {
    if (!running) return;

    const dt = lastT ? t - lastT : 16;
    lastT = t;

    const scrollY = window.scrollY;
    const dy = scrollY - lastScrollY;
    lastScrollY = scrollY;

    const instantVelocity = dy / Math.max(dt, 1);
    smoothedVelocity += (instantVelocity - smoothedVelocity) * VELOCITY_SMOOTHING;
    worldOffset += dy * WORLD_SPEED;

    const speed = Math.abs(smoothedVelocity);
    let nextMoving = moving;
    if (speed > WALK_THRESHOLD) {
      nextMoving = true;
      idleTimer = 0;
    } else {
      idleTimer += dt;
      if (idleTimer > IDLE_DELAY) nextMoving = false;
    }

    const nextFacing = Math.abs(dy) > 0.5 ? (dy > 0 ? 1 : -1) : facing;

    const state = { worldOffset, moving: nextMoving, facing: nextFacing, dt };
    for (const fn of frameListeners) fn(state);

    if (nextMoving !== moving || nextFacing !== facing) {
      moving = nextMoving;
      facing = nextFacing;
      for (const fn of stateListeners) fn(state);
    }

    rafId = requestAnimationFrame(tick);
  }

  function handleVisibility() {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (running && !rafId) {
      lastT = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  return {
    /** No-ops if prefers-reduced-motion is set — the world stays static on purpose. */
    start() {
      if (running) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      running = true;
      lastT = 0;
      document.addEventListener("visibilitychange", handleVisibility);
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    },
    /** state: { worldOffset, moving, facing, dt } — fires every rAF tick. */
    onFrame(fn) {
      frameListeners.add(fn);
      return () => frameListeners.delete(fn);
    },
    /** state: { worldOffset, moving, facing, dt } — fires only on moving/facing change. */
    onStateChange(fn) {
      stateListeners.add(fn);
      return () => stateListeners.delete(fn);
    },
    getSnapshot() {
      return { worldOffset, moving, facing };
    },
    /** Independent of start()/stop() — works even under reduced motion, where
        the CSS animation it triggers simply resolves instantly. */
    greet() {
      for (const fn of greetListeners) fn();
    },
    onGreet(fn) {
      greetListeners.add(fn);
      return () => greetListeners.delete(fn);
    },
  };
}
