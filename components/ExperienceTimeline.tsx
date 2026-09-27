"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { journey } from "@/lib/data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 65%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="section-space section-rule scroll-mt-20">
      <div className="portfolio-shell">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono-label text-red">03 / Journey</div>
              <h2 className="mt-4 font-display text-[clamp(36px,5vw,56px)] font-medium leading-none tracking-[-0.04em]">
                FROM SCHOOL TO SOFTWARE
              </h2>
            </div>
            <p className="body-copy max-w-[34ch]">
              Education, competition, and the experiences shaping how I approach engineering problems.
            </p>
          </div>
        </Reveal>

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-[110px] top-0 hidden h-full w-px bg-line md:block">
            <motion.div
              className="h-full w-px origin-top bg-red"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div>
            {journey.map((item, index) => (
              <Reveal key={item.when} delay={index * 0.08}>
                <article className="grid gap-5 border-t border-line py-8 md:grid-cols-[110px_1px_1fr] md:gap-0">
                  <div className="mono-label text-text-tertiary md:pr-6">
                    {item.when}
                  </div>

                  <div className="relative hidden md:block">
                    <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red bg-black" />
                  </div>

                  <div className="md:pl-8">
                    <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <div className="mt-1 text-[15px] text-red">{item.org}</div>
                    <p className="mt-3 max-w-[60ch] leading-[1.65] text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
