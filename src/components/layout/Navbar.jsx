import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../../data/portfolio";

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-6"
    >
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 shadow-lg md:px-6">
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-2.5 font-semibold text-text"
        >
          <img
            src={personal.avatar}
            alt={personal.name}
            className="h-9 w-9 rounded-lg object-cover ring-2 ring-primary/25 transition-all group-hover:ring-primary/50"
          />
          <span className="hidden text-sm tracking-tight sm:inline">
            Tanisha Joshi
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === id
                    ? "text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {label}
                {activeSection === id && (
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

        <button
          className="rounded-lg p-2 text-text md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                      activeSection === id
                        ? "bg-primary/15 text-text"
                        : "text-muted"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
