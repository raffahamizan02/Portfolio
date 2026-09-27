"use client";

import {
  SiGithub,
  SiGit,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPython,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { LogoLoop } from "./LogoLoop";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

const iconMap: Record<string, ReactNode> = {
  PHP: <SiPhp />,
  Java: <FaJava />,
  JS: <SiJavascript />,
  Py: <SiPython />,
  Laravel: <SiLaravel />,
  MySQL: <SiMysql />,
  MongoDB: <SiMongodb />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
};

const logos = skills.map((skill) => ({
  node: iconMap[skill.icon],
  title: skill.name,
  ariaLabel: skill.name,
}));

export default function Skills() {
  return (
    <section id="skills" className="section-space section-rule scroll-mt-20">
      <div className="portfolio-shell">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono-label text-red">01 / Skills</div>
              <h2 className="mt-4 font-display text-[clamp(36px,5vw,56px)] font-medium leading-none tracking-[-0.04em]">
                WHAT I BUILD WITH
              </h2>
            </div>
            <p className="body-copy max-w-[34ch]">
              A focused stack for backend development, APIs, data, and the tools that keep projects moving.
            </p>
          </div>

          <div className="mt-14">
            <LogoLoop
              logos={logos}
              speed={45}
              logoHeight={30}
              gap={56}
              pauseOnHover
              scaleOnHover
              ariaLabel="Backend development technologies"
              className="border-y border-line py-8"
              renderItem={(item) => {
                if (!("node" in item)) return null;
                return (
                  <div className="group flex items-center gap-3 text-white">
                    <span className="text-2xl transition-colors duration-200 group-hover:text-red">
                      {item.node}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary transition-colors duration-200 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
