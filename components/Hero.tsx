"use client";

import { useEffect, useRef } from "react";
import HeroVisual from "./HeroVisual";
import GradientWaves from "./GradientWaves";
import RotatingText from "./RotatingText";
import FuzzyText from "./FuzzyText";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 90 * i + 60);
    });
  }, []);

  return (
    <section id="top" className="relative pt-12 sm:pt-16 md:pt-28 pb-14 sm:pb-18 md:pb-24 overflow-hidden" ref={rootRef}>
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
          className="absolute -top-24 sm:-top-32 -left-16 sm:-left-20 w-[300px] sm:w-[450px] lg:w-[500px] h-[300px] sm:h-[450px] lg:h-[500px] rounded-full blur-[100px] sm:blur-[130px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 -right-16 sm:right-0 w-[240px] sm:w-[380px] lg:w-[420px] h-[240px] sm:h-[380px] lg:h-[420px] rounded-full blur-[90px] sm:blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #E21B3C 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-[var(--bg)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-8 sm:gap-10 lg:gap-14 items-center">
        <div className="min-w-0 w-full">
          <h1 className="reveal font-display font-black text-[clamp(2.1rem,6vw,4.25rem)] sm:text-[clamp(2.5rem,5.4vw,4.35rem)] lg:text-[clamp(2.85rem,4.8vw,4.5rem)] leading-[1.06] tracking-tight uppercase text-white flex flex-col gap-2 sm:gap-3 [text-wrap:balance]">
            <span>EVERY SINGLE</span>

            <span className="inline-flex items-baseline gap-x-2.5 sm:gap-x-4">
              <FuzzyText
                color="#C8102E"
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize="inherit"
                fontWeight={900}
                fontFamily="inherit"
              >
                COMMIT
              </FuzzyText>
              <span>IS ABOUT</span>
            </span>

            <span className="inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 gap-y-2.5 max-w-full">
              <span>CONTINUOUS</span>
              <RotatingText
                texts={["Growth", "Mastery", "Progress", "Compounding"]}
                mainClassName="px-3 sm:px-4 md:px-4.5 py-1 sm:py-1.5 bg-[#C8102E] text-white font-black rounded-xl sm:rounded-2xl overflow-hidden justify-center inline-flex align-middle uppercase shadow-[0_0_25px_rgba(200,16,46,0.65)] border border-[#E21B3C]/50"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={5000}
              />
            </span>
          </h1>

          <div className="reveal mt-7 sm:mt-9 space-y-2 select-none">
            <div className="flex items-center gap-3">
              <p className="font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white tracking-wider uppercase">
                Muhammad <span className="text-[#C8102E]">Abhiraffa Hamizan</span>
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[275px] justify-self-center lg:justify-self-end mt-4 sm:mt-6 lg:mt-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
