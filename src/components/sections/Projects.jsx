import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import ProjectCarousel from "../ui/ProjectCarousel";
import SectionHeading from "../ui/SectionHeading";
import PixelWindow from "../pixel/PixelWindow";
import PixelButton from "../pixel/PixelButton";
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

        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <PixelWindow key={project.id} title={project.title} bodyClassName="!p-0">
              <div className="grid lg:grid-cols-5">
                <div className={`relative bg-gradient-to-br ${project.gradient} p-4 lg:col-span-2 lg:p-5`}>
                  <ProjectCarousel images={project.images} alt={project.title} />
                  <span className="absolute top-6 left-6 z-10 rounded-lg bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted uppercase backdrop-blur-sm">
                    0{project.id}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-7 lg:col-span-3">
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
                    <div className="flex flex-wrap gap-3">
                      <PixelButton href={project.github} external icon={GitHubIcon}>
                        View on GitHub
                      </PixelButton>
                      {project.liveDemo && (
                        <PixelButton href={project.liveDemo} external icon={ExternalLink}>
                          Live Demo
                        </PixelButton>
                      )}
                    </div>
                  ) : (
                    <p className="inline-flex w-fit items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700">
                      {project.note}
                    </p>
                  )}
                </div>
              </div>
            </PixelWindow>
          ))}
        </div>
      </div>
    </section>
  );
}
