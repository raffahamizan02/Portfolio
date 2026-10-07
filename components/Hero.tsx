"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import HeroVisual from "./HeroVisual";
import TerminalLine from "./TerminalLine";
import GradientWaves from "./GradientWaves";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 90 * i + 60);
    });
  }, []);

  return (
    <section id="top" className="relative pt-20 sm:pt-24 md:pt-[76px] pb-16 sm:pb-20 md:pb-24 overflow-hidden" ref={rootRef}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <GradientWaves
          horizonColor="#4E050F"
          waveColor="#C8102E"
          crestColor="#FFFFFF"
          speed={0.35}
          amplitude={2.4}
          waveScale={0.6}
          waveRatio={0.9}
          swell={32}
          turbulence={18}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={16}
          detail="medium"
          brightness={1.0}
          opacity={0.85}
          mouseInteraction={true}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.05}
        />
        <div
          className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F6EB61 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[var(--bg)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 md:px-7 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-12 md:gap-16 items-center">
        <div>
          <div className="reveal">
            <TerminalLine />
          </div>

          <h1 className="reveal mt-5 sm:mt-6 font-display font-semibold text-[clamp(1.9rem,6.8vw,3.6rem)] leading-[1.12] max-w-[15ch] break-words [text-wrap:balance]">
            Muhammad{" "}
            <span className="text-accent">Abhiraffa Hamizan</span>
          </h1>

          <p className="reveal mt-4 sm:mt-5 text-[1rem] sm:text-[1.05rem] text-muted max-w-[42ch] leading-[1.6]">
            BackEnd Developer
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button href="#projects" className="w-full sm:w-auto">View my projects</Button>
            <Button href="#contact" variant="ghost" className="w-full sm:w-auto">
              Contact me
            </Button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}