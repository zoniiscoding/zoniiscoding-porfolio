import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleBackground from "./components/ui/ParticleBackground";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import { useActiveSection } from "./hooks/useActiveSection";
import { navLinks } from "./data/portfolio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const sectionIds = navLinks.map((l) => l.id);
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-bg">
          <ParticleBackground />
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}
