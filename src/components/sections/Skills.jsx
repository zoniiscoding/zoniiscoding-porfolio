import { motion } from "framer-motion";
import { Layout, Server, Database, Code2, Wrench } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import PixelWindow from "../pixel/PixelWindow";
import { skillCategories } from "../../data/portfolio";

const categoryIcons = {
  Layout,
  Server,
  Database,
  Code2,
  Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-20 md:px-6 md:py-24">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          subtitle="Technologies I use to build scalable, production-ready software"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.icon] ?? Code2;

            return (
              <PixelWindow key={category.title} title={category.title}>
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
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="cursor-default rounded-lg border border-muted/20 bg-bg/40 px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-text"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </PixelWindow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
