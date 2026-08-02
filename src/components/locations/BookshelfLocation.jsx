import { GraduationCap, BookOpen, Trophy, Award } from "lucide-react";
import PixelWindow from "../pixel/PixelWindow";
import { education, certifications } from "../../data/portfolio";

export default function BookshelfLocation({ titleId }) {
  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">Education</span>
        <h2 id={titleId} className="location-heading__title">
          Academic Background
        </h2>
        <p className="location-heading__subtitle">Strong CS fundamentals with cloud computing specialization</p>
      </div>

      <PixelWindow title={education.institution}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h3 className="mb-1 text-2xl font-bold text-text">{education.institution}</h3>
            <p className="mb-1 text-lg text-primary">{education.degree}</p>
            <p className="mb-4 text-muted">{education.minor}</p>
            <span className="inline-block rounded-full border border-muted/30 bg-bg/50 px-4 py-1 font-mono text-sm text-muted">
              {education.period}
            </span>
          </div>

          <div className="flex flex-col gap-8 lg:border-l lg:border-muted/15 lg:pl-10">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-secondary" />
                <h4 className="font-semibold text-text">Relevant Coursework</h4>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {education.coursework.map((course) => (
                  <li key={course} className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-text">LeetCode</h4>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted">{education.leetcode}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold gradient-text">175+</span>
                <span className="mb-1 text-sm text-muted">problems solved</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Arrays", "Graphs", "Trees", "DP", "Greedy"].map((topic) => (
                  <span key={topic} className="rounded-lg bg-bg/50 px-2.5 py-1 font-mono text-xs text-muted">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {certifications.length > 0 && (
          <div className="mt-8 border-t border-muted/15 pt-8">
            <div className="mb-4 flex items-center gap-3">
              <Award className="h-5 w-5 text-secondary" />
              <h4 className="font-semibold text-text">Certifications</h4>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </PixelWindow>
    </>
  );
}
