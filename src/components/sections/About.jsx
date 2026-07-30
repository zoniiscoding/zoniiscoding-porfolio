import { useState } from "react";
import { motion } from "framer-motion";
import { User, Code, Radio } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import PixelDialog from "../pixel/PixelDialog";
import { useWorld } from "../../world/WorldContext";
import { useSectionEvents } from "../../hooks/useSectionEvents";
import { aboutParagraphs } from "../../data/portfolio";

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "End-to-end web apps with React, Node.js, and modern APIs.",
  },
  {
    icon: Radio,
    title: "Real-Time Systems",
    desc: "Built interactive applications with real-time communication, AI-powered workflows, authentication systems, and responsive user experiences.",
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
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Wave plays for ~0.95s (see Player.jsx WAVE_DURATION_MS) — starting the
// typewriter a little before it finishes reads as "she's about to speak"
// rather than a dead pause.
const DIALOGUE_DELAY_MS = 650;

export default function About() {
  const world = useWorld();
  const [dialogueActive, setDialogueActive] = useState(false);

  const sectionRef = useSectionEvents(() => {
    world.greet();
    setTimeout(() => setDialogueActive(true), DIALOGUE_DELAY_MS);
  });

  return (
    <section id="about" ref={sectionRef} className="relative px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="How I Build"
          subtitle="Software, systems, and experiences that feel intentional"
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <PixelDialog speaker="Tanisha" text={aboutParagraphs[0]} active={dialogueActive} />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="glass mt-6 rounded-2xl p-8 md:p-10"
            >
              <div className="max-w-lg space-y-6">
                {aboutParagraphs.slice(1).map((paragraph, i) => (
                  <motion.p
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    className="text-[15px] leading-[1.85] tracking-[0.01em] text-muted/95 md:text-base md:leading-[1.9]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                custom={aboutParagraphs.length}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-9 flex flex-wrap gap-2.5"
              >
                {["React", "Node.js", "FastAPI", "Firebase", "MongoDB", "WebSockets"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[11px] tracking-wide text-primary/90"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold tracking-tight text-text">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
