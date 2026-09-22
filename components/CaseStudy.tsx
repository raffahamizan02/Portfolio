import Link from "next/link";
import type { Project } from "@/lib/data";

const sectionOrder: { key: keyof Project["caseStudy"]; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "goals", label: "Goals" },
  { key: "research", label: "Research & discovery" },
  { key: "process", label: "Process" },
  { key: "designDevelopment", label: "Design & development" },
  { key: "challenges", label: "Challenges" },
  { key: "solution", label: "Solution" },
  { key: "results", label: "Results" },
  { key: "learnings", label: "Key learnings" },
];

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="py-20">
      <div className="max-w-content mx-auto px-7">
        <Link href="/#projects" className="text-[0.9rem] text-muted hover:text-accent">
          ← Back to projects
        </Link>

        <header className="mt-8 max-w-2xl">
          <span className="block font-mono text-[0.78rem] text-accent mb-4">
            Case study — {project.year}
          </span>
          <h1 className="font-display font-semibold text-[clamp(2rem,4vw,2.8rem)] leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-muted text-[1.05rem] leading-[1.7]">{project.description}</p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-hairline">
            <div>
              <dt className="font-mono text-[0.78rem] text-muted">Role</dt>
              <dd className="mt-1 font-semibold">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.78rem] text-muted">Technologies</dt>
              <dd className="mt-1 font-semibold">{project.technologies.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.78rem] text-muted">Links</dt>
              <dd className="mt-1 font-semibold">
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    Repository
                  </a>
                ) : (
                  <span className="text-muted font-normal">Coming soon</span>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-14 flex flex-col gap-10 max-w-2xl">
          {sectionOrder.map(({ key, label }) => {
            const value = project.caseStudy[key];
            return (
              <section key={key}>
                <h2 className="font-display font-semibold text-[1.2rem] mb-3">{label}</h2>
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-5 text-muted text-[0.98rem] leading-[1.75]">
                    {value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted text-[0.98rem] leading-[1.75]">{value}</p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
