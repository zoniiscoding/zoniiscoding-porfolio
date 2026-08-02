import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WorldProvider } from "./world/WorldContext";
import { useVillageNav } from "./world/village/useVillageNav";
import { LANDMARKS } from "./world/village/landmarks";
import { sprites } from "./world/spriteManifest";
import Village from "./world/village/Village";
import LocationPanel from "./components/locations/LocationPanel";
import CottageLocation from "./components/locations/CottageLocation";
import BulletinLocation from "./components/locations/BulletinLocation";
import WorkshopLocation from "./components/locations/WorkshopLocation";
import BookshelfLocation from "./components/locations/BookshelfLocation";
import ChestLocation from "./components/locations/ChestLocation";
import MailboxLocation from "./components/locations/MailboxLocation";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Which component renders inside the panel, and which sprite backs it as a
// dimmed, blurred backdrop — keeps that location's own artwork behind the
// content instead of a flat card. Keyed by landmark id (see landmarks.js).
const LOCATIONS = {
  about: { Component: CottageLocation, backdrop: "cottage" },
  skills: { Component: BulletinLocation, backdrop: "board_empty" },
  projects: { Component: WorkshopLocation, backdrop: "desk" },
  education: { Component: BookshelfLocation, backdrop: "bookshelf" },
  resume: { Component: ChestLocation, backdrop: "chest_open" },
  contact: { Component: MailboxLocation, backdrop: "mailbox_open" },
};

function VillageExperience() {
  const nav = useVillageNav(LANDMARKS);
  const [visited, setVisited] = useState(() => new Set());
  // Tracks which location's content to render plus whether it had already
  // been visited *before* this open — captured once per open-transition
  // (not read live off `visited`, which flips true the instant this same
  // render adds to it) and kept stable through the close animation, when
  // nav.openId has already gone back to null but the panel is still
  // animating out and needs something to keep rendering.
  const [openMeta, setOpenMeta] = useState({ id: null, wasVisited: false, entryId: null, token: 0 });

  // Adjusted during render (React's documented pattern for state that
  // depends on a changing prop) rather than in an effect, since this is a
  // one-time reaction to a value change, not a sync with an external system.
  // Keyed on openToken (not just openId) because "Experience" and
  // "Projects" both resolve to the same Workshop landmark — re-entering it
  // via a different nav link needs to count as a fresh open even though
  // openId itself doesn't change.
  if (nav.openId && nav.openToken !== openMeta.token) {
    setOpenMeta({ id: nav.openId, wasVisited: visited.has(nav.openId), entryId: nav.entryId, token: nav.openToken });
    setVisited((prev) => new Set(prev).add(nav.openId));
  }

  const location = openMeta.id ? LOCATIONS[openMeta.id] : null;
  const spot = openMeta.id ? LANDMARKS[openMeta.id] : null;

  return (
    <>
      {/* inert while a panel is open: keyboard/Tab focus trapping in
          LocationPanel only covers the Tab key — a screen reader's virtual
          cursor ignores that. inert removes the whole village from both,
          so nothing behind the dimmed backdrop is reachable at all. */}
      <div inert={!!nav.openId}>
        <Navbar
          activeId={nav.entryId ?? nav.openId}
          onNavigate={(id) =>
            // "Experience" deep-links into the same Workshop landmark as
            // "Projects" — same destination, different default tab (see
            // WorkshopLocation's initialTab).
            id === "experience"
              ? nav.goTo("experience", { autoOpen: true, landmarkId: "projects" })
              : nav.goTo(id, { autoOpen: true })
          }
          onGoHome={nav.close}
        />
        <main id="main-content" className="relative z-10 px-4 pt-40 pb-16 sm:pt-32 md:px-6">
          <Village nav={nav} visited={visited} />
        </main>
        <Footer />
      </div>

      {location && spot && (
        <LocationPanel
          open={!!nav.openId}
          onClose={nav.close}
          titleId={`location-${openMeta.id}-title`}
          originX={spot.x}
          originY={spot.y}
          backdropAsset={sprites.single[location.backdrop]?.src}
          returnFocusSelector={`[aria-label="Walk to the ${spot.label}"]`}
        >
          <location.Component
            key={`${openMeta.id}-${openMeta.token}`}
            titleId={`location-${openMeta.id}-title`}
            firstVisit={!openMeta.wasVisited}
            initialTab={openMeta.entryId === "experience" ? "experience" : "projects"}
          />
        </LocationPanel>
      )}
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <WorldProvider>
          <div className="relative min-h-screen bg-bg">
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <VillageExperience />
          </div>
        </WorldProvider>
      )}
    </>
  );
}
