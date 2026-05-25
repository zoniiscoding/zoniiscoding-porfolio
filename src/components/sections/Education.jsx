import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Trophy } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { education } from "../../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="relative px-4 py-20 md:px-6 md:py-24">
      <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Education"
          title="Academic Background"
          subtitle="Strong CS fundamentals with cloud computing specialization"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass glow-primary rounded-2xl p-8 md:p-10"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h3 className="mb-1 text-2xl font-bold text-text">
              {education.institution}
            </h3>
            <p className="mb-1 text-lg text-primary">{education.degree}</p>
            <p className="mb-4 text-muted">{education.minor}</p>
            <span className="inline-block rounded-full border border-muted/30 bg-bg/50 px-4 py-1 font-mono text-sm text-muted">
              {education.period}
            </span>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-secondary" />
                <h4 className="font-semibold text-text">Relevant Coursework</h4>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {education.coursework.map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {course}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/5 p-6 md:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-text">LeetCode</h4>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted md:text-base">
                {education.leetcode}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold gradient-text">175+</span>
                <span className="mb-1 text-sm text-muted">problems solved</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Arrays", "Graphs", "Trees", "DP", "Greedy"].map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg bg-card/80 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
