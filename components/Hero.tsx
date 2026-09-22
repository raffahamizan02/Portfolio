"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import HeroVisual from "./HeroVisual";
import TerminalLine from "./TerminalLine";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 90 * i + 60);
    });
  }, []);

  return (
    <section id="top" className="pt-[76px] pb-24" ref={rootRef}>
      <div className="max-w-content mx-auto px-7 grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">
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