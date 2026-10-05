"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { journey } from "@/lib/data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 65%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-14 sm:py-20 md:py-24 border-t border-hairline overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
        <Reveal>
          <SectionHeading
            title="Journey"
          />
        </Reveal>

        <div ref={containerRef} className="relative flex flex-col">
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[160px] top-2 bottom-2 w-px bg-hairline"
          />
          <motion.div
            aria-hidden="true"
            className="hidden md:block absolute left-[160px] top-2 w-px bg-accent origin-top"
            style={{ height: lineHeight }}
          />

          {journey.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="grid grid-cols-[16px_1fr] sm:grid-cols-[20px_1fr] md:grid-cols-[160px_1px_1fr] gap-0 relative"
            >
              <div className="hidden md:block font-mono text-[0.85rem] text-muted py-7 pr-6">
                {item.when}
              </div>
              <div className="bg-hairline md:bg-transparent relative row-span-2 md:row-span-1">
                <div className="absolute top-[28px] sm:top-[34px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-bg border-2 border-accent z-10" />
              </div>
              <div className="col-start-2 md:col-start-3 py-4 sm:py-6 pl-3.5 sm:pl-8">
                <span className="md:hidden font-mono text-[0.78rem] sm:text-[0.8rem] text-muted block mb-1">
                  {item.when}
                </span>
                <h3 className="font-display font-semibold text-[1.02rem] sm:text-[1.06rem] break-words leading-snug">{item.title}</h3>
                <span className="text-accent text-[0.86rem] sm:text-[0.9rem] mt-1 block break-words">{item.org}</span>
                <p className="text-muted mt-2 sm:mt-3 text-[0.88rem] sm:text-[0.95rem] leading-relaxed sm:leading-[1.65] break-words">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}