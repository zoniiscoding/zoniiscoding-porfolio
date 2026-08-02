import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Code, Radio } from "lucide-react";
import PixelDialog from "../pixel/PixelDialog";
import { aboutParagraphs } from "../../data/portfolio";

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "End-to-end web apps with React, FastAPI, and modern APIs.",
  },
  {
    icon: Radio,
    title: "AI-Powered Systems",
    desc: "Real-time voice interaction, LLM integration, and RAG-driven applications built for production.",
  },
  {
    icon: User,
    title: "Clean Engineering",
    desc: "Scalable backends, reusable components, and maintainable codebases.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// The wave gesture already plays on arrival in the village (useVillageNav) —
// starting the dialogue slightly after the panel opens reads as "she's about
// to speak" rather than a dead pause, without re-triggering the wave itself.
const DIALOGUE_DELAY_MS = 300;

export default function CottageLocation({ titleId }) {
  const [dialogueActive, setDialogueActive] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDialogueActive(true), DIALOGUE_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">About</span>
        <h2 id={titleId} className="location-heading__title">
          How I Build
        </h2>
        <p className="location-heading__subtitle">Software, systems, and experiences that feel intentional</p>
      </div>

      <PixelDialog speaker="Tanisha" text={aboutParagraphs[0]} active={dialogueActive} />

      <div className="mt-6 grid gap-8 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3">
          <div className="space-y-5">
            {aboutParagraphs.slice(1).map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[15px] leading-[1.85] tracking-[0.01em] text-muted/95"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            custom={aboutParagraphs.length}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "WebSockets", "RAG / LLMs", "Tailwind CSS"].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[11px] tracking-wide text-primary/90"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 md:col-span-2">
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-semibold tracking-tight text-text">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
