import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectPreviewCard from "./ProjectPreviewCard";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";

export default function ProjectPreview() {
  const featured = projects.slice(0, 2);

  return (
    <section id="projects" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading
            title="Featured projects"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectPreviewCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-s border border-hairline px-5 py-[11px] text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Lihat semua project
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}