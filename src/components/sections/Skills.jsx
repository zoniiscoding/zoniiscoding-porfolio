import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Code2,
  Wrench,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          subtitle="Technologies I use to build scalable, production-ready software"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.icon] ?? Code2;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: catIndex * 0.08, duration: 0.45 }}
                className="glass glow-hover group rounded-2xl p-6 transition-all duration-300"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.05 + i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="cursor-default rounded-lg border border-muted/20 bg-bg/60 px-3 py-1.5 text-sm text-muted transition-colors group-hover:border-primary/30 group-hover:text-text"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
