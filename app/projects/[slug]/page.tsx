import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile, projects } from "@/lib/data";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return {};

  return {
    title: project.title + " — " + profile.name,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <article className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="portfolio-shell">
            <Link
              href="/projects"
              className="interactive-underline inline-flex items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary"
            >
              <ArrowLeft size={13} />
              Back to projects
            </Link>

            <header className="mt-14 grid-12 gap-y-10">
              <div className="col-span-12 lg:col-span-8">
                <div className="mono-label text-red">
                  {project.year} / {project.role}
                </div>
                <h1 className="display-title mt-5 text-[clamp(56px,8vw,112px)]">
                  {project.title}
                </h1>
                <p className="mt-7 max-w-[52ch] text-[clamp(18px,2vw,23px)] leading-[1.4] text-text-secondary">
                  {project.description}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-4 lg:pt-8">
                <div className="border-t border-line pt-5">
                  <div className="mono-label text-text-tertiary">Stack</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-pill border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {project.image ? (
              <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-card border border-line md:mt-20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1023px) 92vw, 1280px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <section className="mt-20 grid gap-10 border-t border-line pt-8 md:grid-cols-[220px_1fr]">
              <div className="mono-label text-red">01 / Overview</div>
              <div className="max-w-[68ch] space-y-5 text-[17px] leading-[1.8] text-text-secondary">
                <p>{project.description}</p>
                <p>
                  This case-study shell stays factual and can be expanded with architecture notes, implementation details, and measured outcomes as those details are documented.
                </p>
              </div>
            </section>

            <div className="mt-14 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-pill border border-white bg-white px-[22px] font-mono text-[12px] uppercase tracking-[0.08em] text-black transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  Live demo <ArrowUpRight size={15} />
                </Link>
              ) : null}

              {project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-pill border border-line px-[22px] font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors hover:border-red hover:text-red"
                >
                  Source <ArrowUpRight size={15} />
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
