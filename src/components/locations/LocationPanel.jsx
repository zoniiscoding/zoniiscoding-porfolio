import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./locations.css";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Shared chrome for every location interior. Internally a real dialog
 * (role="dialog", focus trap, Escape, focus returns to whatever opened it)
 * but visually it opens *from* the landmark's own position in the village
 * (via --origin-x/--origin-y transform-origin) and keeps that location's
 * own artwork as its backdrop — the goal is "you stepped into this place,"
 * not "a card appeared over the page."
 */
export default function LocationPanel({
  open,
  onClose,
  titleId,
  originX = 50,
  originY = 50,
  backdropAsset,
  returnFocusSelector,
  children,
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // The element that had focus when this opened is often the "Enter X"
      // prompt button, which unmounts in the same commit that mounts this
      // panel — confirmEnter clearing arrivedId and setting openId happen
      // together. The browser defocuses to <body> synchronously the moment
      // that node is removed, which happens *before* this effect ever runs,
      // so `document.activeElement` was already <body> by the time we
      // captured it above — document.contains(body) is trivially true, so
      // that alone doesn't catch it. Treat body the same as "gone" and fall
      // back to that landmark's (still-mounted) "Walk to X" button.
      const stillThere =
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused !== document.body &&
        document.contains(previouslyFocused);
      const fallback = !stillThere && returnFocusSelector ? document.querySelector(returnFocusSelector) : null;
      (stillThere ? previouslyFocused : fallback)?.focus();
    };
  }, [open, onClose, returnFocusSelector]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="location-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          style={{ "--origin-x": `${originX}%`, "--origin-y": `${originY}%` }}
        >
          <div className="location-overlay__dim" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="location-panel"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {backdropAsset && (
              <img src={backdropAsset} alt="" aria-hidden="true" className="location-panel__backdrop" />
            )}
            <div className="location-panel__scrim" aria-hidden="true" />

            <button type="button" ref={closeRef} className="location-panel__close pixel-btn" onClick={onClose}>
              ← Back to Village
            </button>

            <div className="location-panel__content">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
