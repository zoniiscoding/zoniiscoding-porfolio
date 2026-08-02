import { motion } from "framer-motion";
import { Layout, Server, Database, Code2, Wrench, Brain } from "lucide-react";
import PixelWindow from "../pixel/PixelWindow";
import { skillCategories } from "../../data/portfolio";

const categoryIcons = { Layout, Server, Database, Code2, Wrench, Brain };

export default function BulletinLocation({ titleId }) {
  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">Skills</span>
        <h2 id={titleId} className="location-heading__title">
          Technical Expertise
        </h2>
        <p className="location-heading__subtitle">
          Technologies I use to build scalable, production-ready software
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, ci) => {
          const Icon = categoryIcons[category.icon] ?? Code2;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 14, rotate: ci % 2 === 0 ? -1.5 : 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: ci % 2 === 0 ? -1 : 1 }}
              transition={{ delay: ci * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PixelWindow title={category.title}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ci * 0.08 + i * 0.03 }}
                      className="cursor-default rounded-lg border border-muted/20 bg-bg/40 px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-text"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </PixelWindow>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
