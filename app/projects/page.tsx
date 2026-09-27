import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — " + profile.name,
  description: "Selected projects by Muhammad Abhiraffa Hamizan.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="portfolio-shell">
            <Link
              href="/"
              className="interactive-underline inline-flex items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary"
            >
              <ArrowLeft size={13} />
              Back home
            </Link>

            <div className="mt-14">
              <div className="mono-label text-red">02 / Projects</div>
              <h1 className="display-title mt-5 max-w-[8ch] text-[clamp(56px,8vw,112px)]">
                ALL WORK.
              </h1>
              <p className="mt-7 max-w-[52ch] text-[clamp(18px,2vw,23px)] leading-[1.4] text-text-secondary">
                A closer look at projects I have built, explored, and contributed to.
              </p>
            </div>

            <div className="mt-20 divide-y divide-line border-y border-line">
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={"/projects/" + project.slug}
                  className="group grid gap-6 py-8 transition-colors md:grid-cols-[80px_1fr_auto]"
                >
                  <div className="mono-label text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <h2 className="font-display text-3xl font-medium tracking-[-0.03em] transition-colors group-hover:text-red">
                        {project.title}
                      </h2>
                      <ArrowUpRight
                        size={18}
                        className="text-text-tertiary transition-colors group-hover:text-red"
                      />
                    </div>
                    <p className="mt-3 max-w-[60ch] leading-[1.65] text-text-secondary">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mono-label text-text-tertiary md:pt-1">
                    {project.year}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
