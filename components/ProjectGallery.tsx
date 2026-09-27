"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import CircularGallery from "./CircularGallery";
import { projects } from "@/lib/data";

export default function ProjectGallery() {
  const [active, setActive] = useState(0);

  const items = useMemo(
    () =>
      projects.map((project) => ({
        image: project.image ?? "",
        text: project.title,
      })),
    []
  );

  const project = projects[active];

  return (
    <section id="projects" className="section-space section-rule scroll-mt-20">
      <div className="portfolio-shell">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono-label text-red">02 / Projects</div>
              <h2 className="mt-4 font-display text-[clamp(36px,5vw,56px)] font-medium leading-none tracking-[-0.04em]">
                SELECTED WORK
              </h2>
            </div>
            <Link
              href="/projects"
              className="interactive-underline w-fit font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary transition-colors hover:text-white"
            >
              View all projects ↗
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 h-[500px] overflow-hidden md:h-[640px]">
            <CircularGallery
              items={items}
              bend={1}
              textColor="#FFFFFF"
              borderRadius={0.04}
              font="600 24px Space Grotesk"
              scrollSpeed={2}
              scrollEase={0.08}
              className="h-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 grid gap-8 border-t border-line pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mono-label text-text-tertiary">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-[58ch] leading-[1.6] text-text-secondary">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>

            <Link
              href={"/projects/" + project.slug}
              className="group inline-flex w-fit items-center gap-2 rounded-pill border border-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 hover:border-red hover:text-red"
            >
              View details
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </Reveal>

        {projects.length > 1 && (
          <div className="mt-6 flex gap-2" aria-label="Choose highlighted project">
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActive(index)}
                aria-label={"Show " + item.title}
                aria-pressed={active === index}
                className={
                  "h-2 w-2 rounded-full border transition-colors duration-200 " +
                  (active === index
                    ? "border-red bg-red"
                    : "border-line bg-black hover:border-white")
                }
              />
            ))}
          </div>
        )}

        <p className="mt-4 mono-label text-text-tertiary">
          Drag to explore
        </p>
      </div>
    </section>
  );
}
