import { useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time. Distinct from useTypingEffect
 * (which loops through multiple words, deleting between each) — this is a
 * one-shot reveal for a fixed passage, used by PixelDialog.
 *
 * Respects prefers-reduced-motion by revealing instantly. Callers should
 * still render the full `text` in a visually-hidden node alongside the
 * animated one, since the animated copy is meant to be aria-hidden — see
 * PixelDialog.
 */
export function useTypewriter(text, { active = true, speed = 28 } = {}) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [trackedText, setTrackedText] = useState(text);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  // Reset when `text` changes, following React's documented pattern for
  // adjusting state in response to a prop change during render rather than
  // in an effect (https://react.dev/learn/you-might-not-need-an-effect).
  if (text !== trackedText) {
    setTrackedText(text);
    setDisplayed("");
    setDone(false);
  }

  useEffect(() => {
    if (!active || reduceMotion) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed, reduceMotion]);

  if (!active || reduceMotion) return { displayed: text, done: true };
  return { displayed, done };
}
