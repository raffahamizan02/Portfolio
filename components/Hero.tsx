"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import HeroVisual from "./HeroVisual";
import TerminalLine from "./TerminalLine";
import ShapeGrid from "./ShapeGrid";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 90 * i + 60);
    });
  }, []);

  return (
    <section id="top" className="relative pt-[76px] pb-24 overflow-hidden" ref={rootRef}>
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden opacity-85" aria-hidden="true">
        <ShapeGrid
          direction="diagonal"
          speed={0.35}
          squareSize={42}
          shape="square"
          hoverTrailAmount={4}
          borderColor={theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}
          hoverFillColor={theme === "dark" ? "rgba(201, 82, 95, 0.22)" : "rgba(168, 57, 74, 0.12)"}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-7 grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">
        <div>
          <div className="reveal">
            <TerminalLine />
          </div>

          <h1 className="reveal mt-6 font-display font-semibold text-[clamp(2.3rem,5vw,3.6rem)] leading-[1.12] max-w-[15ch]">
            Muhammad{" "}
            <span className="text-accent">Abhiraffa Hamizan</span>
          </h1>

          <p className="reveal mt-5 text-[1.05rem] text-muted max-w-[42ch] leading-[1.6]">
            BackEnd Developer
          </p>

          <div className="reveal flex gap-4 flex-wrap mt-8">
            <Button href="#projects">View my projects</Button>
            <Button href="#contact" variant="ghost">
              Contact me
            </Button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}