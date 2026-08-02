import { motion } from "framer-motion";
import Sprite from "../pixel/Sprite";
import { sprites } from "../../world/spriteManifest";
import { navLinks, personal } from "../../data/portfolio";

/**
 * The fast path: every link walks the player to that landmark and opens it
 * directly on arrival (no explore prompt) — see useVillageNav's `autoOpen`.
 * The logo returns to the village (closes whatever's open).
 *
 * Every link stays visible at every width — no hamburger/dropdown to open
 * first. On narrow screens the row wraps onto a second line instead of
 * hiding behind a menu, trading a taller header for one-tap access.
 */
export default function Navbar({ activeId, onNavigate, onGoHome }) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-6"
    >
      <nav className="glass mx-auto flex max-w-6xl flex-col items-center gap-2 rounded-2xl px-4 py-3 shadow-lg sm:flex-row sm:justify-between md:px-6">
        <button onClick={onGoHome} className="group flex items-center gap-2.5 font-semibold text-text">
          <img
            src={personal.avatar}
            alt={personal.name}
            className="h-9 w-9 rounded-lg object-cover ring-2 ring-primary/25 transition-all group-hover:ring-primary/50"
          />
          <span className="font-pixel text-sm tracking-tight">Tanisha Joshi</span>
          <Sprite sheet={sprites.sheets.coin} animate fps={10} className="h-4 w-4" />
        </button>

        <ul className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`relative rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:py-2 sm:text-sm ${
                  activeId === id ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {label}
                {activeId === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
