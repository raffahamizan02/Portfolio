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
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={0.95}
          opacity={0.8}
          mouseInteraction={true}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.05}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--bg)] pointer-events-none" />
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