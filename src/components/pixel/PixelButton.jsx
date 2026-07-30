import "./pixel.css";
import { sprites } from "../../world/spriteManifest";
import { nineSliceStyle } from "./nineSlice";

const SCALE = 0.62;

/**
 * The one pixel-art button used for every call-to-action site-wide (per
 * public/assets/README.md: Start, Resume, Projects, Contact, Downloads).
 * Renders as an `<a>` when `href` is given, a `<button>` otherwise. Hover/tap
 * motion is plain CSS (see .pixel-btn in pixel.css) — no need for a second
 * animation system on top of it.
 */
export default function PixelButton({
  children,
  href,
  external = false,
  icon: Icon,
  className = "",
  style,
  ...props
}) {
  const border = nineSliceStyle(sprites.ui.button, SCALE);

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`pixel-btn${className ? ` ${className}` : ""}`}
        style={{ ...border, ...style }}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={`pixel-btn${className ? ` ${className}` : ""}`}
      style={{ ...border, ...style }}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
