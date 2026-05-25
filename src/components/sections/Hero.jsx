import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import Button from "../ui/Button";
import FloatingTechIcons from "../ui/FloatingTechIcons";
import { personal, typingRoles } from "../../data/portfolio";
import { useTypingEffect } from "../../hooks/useTypingEffect";

export default function Hero() {
  const typed = useTypingEffect(typingRoles);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 md:px-6 md:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[100px]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <FloatingTechIcons />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-2 font-mono text-sm text-muted md:text-base"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 flex min-h-[2rem] items-center justify-center font-mono text-lg text-secondary md:text-xl"
        >
          <span>{typed}</span>
          <span className="ml-0.5 animate-pulse text-primary">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-2 text-lg text-muted md:text-xl"
        >
          {personal.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {personal.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button onClick={scrollToProjects}>View Projects</Button>
          <Button
            variant="outline"
            href={personal.github}
            icon={GitHubIcon}
            external
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            href={personal.linkedin}
            icon={LinkedInIcon}
            external
          >
            LinkedIn
          </Button>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-muted transition-colors hover:text-primary"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
