import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import PixelWindow from "../pixel/PixelWindow";
import PixelButton from "../pixel/PixelButton";
import { projects, experience } from "../../data/portfolio";

function ProjectBody({ project }) {
  return (
    <div className="p-6 md:p-7">
      <p className="mb-3 text-sm leading-relaxed text-muted">{project.description}</p>

      {project.highlights && (
        <ul className="mb-4 flex flex-col gap-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
      )}

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
          {project.github && (
            <PixelButton href={project.github} external icon={GitHubIcon}>
              View on GitHub
            </PixelButton>
          )}
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
  );
}

function ExperienceBody({ role }) {
  return (
    <div className="p-6 md:p-7">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
        <Briefcase className="h-5 w-5" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-text">{role.role}</h3>
      <p className="mb-4 text-sm text-primary">{role.company}</p>
      <p className="mb-4 text-sm leading-relaxed text-muted">{role.description}</p>

      {role.highlights && (
        <ul className="mb-5 flex flex-col gap-1.5">
          {role.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
      )}

      {role.techStack && (
        <div className="flex flex-col gap-2">
          {Object.entries(role.techStack).map(([category, items]) => (
            <div key={category} className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] tracking-wide text-muted uppercase">{category}</span>
              {items.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-secondary/15 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkshopLocation({ titleId, initialTab = "projects" }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">Workshop</span>
        <h2 id={titleId} className="location-heading__title">
          {tab === "experience" ? "Professional Experience" : "Featured Work"}
        </h2>
        <p className="location-heading__subtitle">
          {tab === "experience"
            ? "Freelance work delivered end-to-end for real clients"
            : "Products built across full-stack engineering, AI, and machine learning"}
        </p>
      </div>

      <div role="tablist" aria-label="Workshop view" className="mb-6 flex justify-center gap-2">
        <button
          type="button"
          role="tab"
          id="workshop-tab-projects"
          aria-selected={tab === "projects"}
          aria-controls="workshop-tabpanel"
          onClick={() => setTab("projects")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "projects" ? "bg-primary/15 text-text" : "text-muted hover:text-text"
          }`}
        >
          Projects
        </button>
        <button
          type="button"
          role="tab"
          id="workshop-tab-experience"
          aria-selected={tab === "experience"}
          aria-controls="workshop-tabpanel"
          onClick={() => setTab("experience")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "experience" ? "bg-primary/15 text-text" : "text-muted hover:text-text"
          }`}
        >
          Experience
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          id="workshop-tabpanel"
          role="tabpanel"
          aria-labelledby={tab === "projects" ? "workshop-tab-projects" : "workshop-tab-experience"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-8"
        >
          {tab === "projects"
            ? projects.map((project) => (
                <PixelWindow key={project.id} title={project.title} bodyClassName="!p-0">
                  <ProjectBody project={project} />
                </PixelWindow>
              ))
            : experience.map((role) => (
                <PixelWindow key={`${role.company}-${role.role}`} title={`${role.role} · ${role.company}`} bodyClassName="!p-0">
                  <ExperienceBody role={role} />
                </PixelWindow>
              ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
