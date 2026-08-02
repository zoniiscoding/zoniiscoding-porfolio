/**
 * Position-tween world engine. One requestAnimationFrame loop for the whole
 * village, shared by every consumer via WorldContext.
 *
 * The player has a position `{x, y}` in percentage coordinates within the
 * village stage. Calling `walkTo(x, y)` eases the player there over time,
 * driving the same distance-based walk-cycle math the site already used for
 * scroll (frame index from distance travelled, not elapsed time — so a walk
 * never looks like it's sliding). The loop only runs while something is
 * actually moving; it stops itself the instant the player arrives, rather
 * than ticking 60x/second for a scene that isn't changing.
 *
 * Ambient, purely time-based loops (idle breathing, coin spin, cloud drift)
 * are still plain CSS — they never touch this engine.
 */

const DEFAULT_DURATION = 1300; // ms for a typical walk across the village

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export function createWorld({ startX = 50, startY = 62 } = {}) {
  let running = false;
  let rafId = null;
  let lastT = 0;

  let x = startX;
  let y = startY;
  let fromX = x;
  let fromY = y;
  let targetX = null;
  let targetY = null;
  let elapsed = 0;
  let duration = DEFAULT_DURATION;
  let distance = 0; // cumulative, for walk-frame stepping — never resets
  let moving = false;
  let facing = 1;
  let arriveCallback = null;

  const frameListeners = new Set();
  const stateListeners = new Set();
  const greetListeners = new Set();

  function snapshot(dt = 0) {
    return { x, y, moving, facing, distance, dt };
  }

  function tick(t) {
    if (!running) return;
    const dt = lastT ? t - lastT : 16;
    lastT = t;

    if (targetX !== null) {
      elapsed += dt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      const prevX = x;
      const prevY = y;
      x = fromX + (targetX - fromX) * eased;
      y = fromY + (targetY - fromY) * eased;
      distance += Math.hypot(x - prevX, y - prevY);
      if (x !== prevX) facing = x > prevX ? 1 : -1;
      moving = progress < 1;

      if (progress >= 1) {
        x = targetX;
        y = targetY;
        targetX = null;
        targetY = null;
        const cb = arriveCallback;
        arriveCallback = null;
        for (const fn of stateListeners) fn(snapshot(dt));
        cb?.();
      }
    }

    for (const fn of frameListeners) fn(snapshot(dt));

    rafId = moving || targetX !== null ? requestAnimationFrame(tick) : null;
  }

  function handleVisibility() {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (running && !rafId && (moving || targetX !== null)) {
      lastT = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  return {
    /** No-ops the animated tween if prefers-reduced-motion is set — walkTo()
        still moves the player, just instantly, since the engine checks
        `running` itself rather than requiring every caller to. */
    start() {
      if (running) return;
      running = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      lastT = 0;
      document.addEventListener("visibilitychange", handleVisibility);
    },
    stop() {
      running = false;
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    },
    /** Ease the player to (nx, ny) — percentage coordinates within the stage.
        `onArrive` fires once, on actual arrival (or synchronously if motion
        is reduced and the move was instant). */
    walkTo(nx, ny, { onArrive, duration: dur = DEFAULT_DURATION } = {}) {
      if (!running) {
        x = nx;
        y = ny;
        targetX = null;
        targetY = null;
        moving = false;
        for (const fn of stateListeners) fn(snapshot());
        for (const fn of frameListeners) fn(snapshot());
        onArrive?.();
        return;
      }
      fromX = x;
      fromY = y;
      targetX = nx;
      targetY = ny;
      elapsed = 0;
      duration = dur;
      arriveCallback = onArrive;
      // stateListeners otherwise only fires on arrival (inside tick's
      // progress>=1 branch) — without this, a consumer's onStateChange
      // never learns a walk has *started*, so a pose set by something
      // else (e.g. the wave gesture) would stay stuck for the whole walk.
      moving = true;
      for (const fn of stateListeners) fn(snapshot());
      if (!rafId) {
        lastT = 0;
        rafId = requestAnimationFrame(tick);
      }
    },
    /** state: { x, y, moving, facing, distance, dt } — fires every rAF tick
        while something is moving. */
    onFrame(fn) {
      frameListeners.add(fn);
      return () => frameListeners.delete(fn);
    },
    /** Fires only when `moving` changes, plus once on arrival. */
    onStateChange(fn) {
      stateListeners.add(fn);
      return () => stateListeners.delete(fn);
    },
    getSnapshot() {
      return snapshot();
    },
    /** Independent of movement — works even under reduced motion, where the
        CSS animation it triggers simply resolves instantly. */
    greet() {
      for (const fn of greetListeners) fn();
    },
    onGreet(fn) {
      greetListeners.add(fn);
      return () => greetListeners.delete(fn);
    },
  };
}
