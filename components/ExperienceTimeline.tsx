"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import JourneyCardSwap from "./JourneyCardSwap";
import { journey } from "@/lib/data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-14 sm:py-20 md:py-24 border-t border-hairline overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <Reveal>
              <div className="space-y-2.5">
                <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl tracking-tight text-ink">
                  Journey<span className="text-accent">.</span>
                </h2>
                <p className="text-sm sm:text-[15px] text-muted leading-relaxed max-w-[48ch]">
                  A roadmap of my education, backend engineering pursuits, and tournament milestones.
                </p>
              </div>
            </Reveal>

            <div ref={containerRef} className="relative flex flex-col space-y-7 pt-2">
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px bg-hairline"
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-[7px] top-2 w-px bg-accent origin-top"
                style={{ height: lineHeight }}
              />

              {journey.map((item, i) => (
                <Reveal key={i} delay={i * 0.08} className="relative pl-7 group">
                  <div className="absolute left-[3px] top-[7px] w-[9px] h-[9px] rounded-full bg-bg border-2 border-accent transition-transform duration-200 group-hover:scale-125 z-10" />

                  <span className="font-mono text-[11px] sm:text-xs text-muted block mb-1">
                    {item.when}
                  </span>
                  <h3 className="font-display font-semibold text-[1rem] sm:text-[1.05rem] text-ink leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-accent text-[0.84rem] sm:text-[0.88rem] font-medium block mt-0.5">
                    {item.org}
                  </span>
                  <p className="text-muted text-[0.84rem] sm:text-[0.88rem] leading-relaxed mt-1.5 max-w-[45ch]">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-2 lg:pt-0">
            <Reveal delay={0.15} className="w-full">
              <JourneyCardSwap />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}