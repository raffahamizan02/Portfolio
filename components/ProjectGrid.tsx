import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { projects, profile } from "@/lib/data";

export default function ProjectGrid() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading
            title="All projects"
            description=""
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}

          <Reveal delay={(projects.length % 3) * 0.08}>
            <article className="border border-dashed border-hairline rounded-m flex items-center justify-center text-center p-6.5 h-full">
              <div className="flex flex-col items-center gap-3.5">
                <h3 className="font-display font-semibold text-[1.12rem]">More on the way</h3>
                <p className="text-muted text-[0.95rem] leading-[1.6]">
                  Additional projects are in progress and will be added here as they&apos;re finished.
                </p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[0.86rem] hover:text-accent"
                >
                  See GitHub in the meantime
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}