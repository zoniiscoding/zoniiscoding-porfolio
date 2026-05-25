import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import ProjectCarousel from "../ui/ProjectCarousel";
import SectionHeading from "../ui/SectionHeading";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          subtitle="Products built across full-stack engineering, AI, and machine learning"
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="glass glow-hover group overflow-hidden rounded-2xl border border-muted/10 transition-all duration-300 hover:border-primary/20"
            >
              <div className="grid lg:grid-cols-5">
                <div
                  className={`relative bg-gradient-to-br ${project.gradient} p-4 lg:col-span-2 lg:p-5`}
                >
                  <ProjectCarousel
                    images={project.images}
                    alt={project.title}
                  />
                  <span className="absolute top-6 left-6 z-10 rounded-lg bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted uppercase backdrop-blur-sm">
                    0{project.id}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-7 lg:col-span-3">
                  <h3 className="mb-2.5 text-xl font-bold tracking-tight text-text transition-colors group-hover:text-primary md:text-2xl">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted md:text-[15px] md:leading-7">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-secondary/15 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.showLinks ? (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/25 transition-shadow hover:shadow-primary/40"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      View on GitHub
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </motion.a>
                  ) : (
                    <p className="inline-flex items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300/90">
                      {project.note}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
