"use client";

import { useState } from "react";
import DecayCard from "./DecayCard";

export default function HeroVisual() {
  const [isSurging, setIsSurging] = useState(false);

  return (
    <div
      className="reveal relative max-w-[315px] xs:max-w-[340px] sm:max-w-[370px] w-full mx-auto md:mr-0 md:justify-self-end select-none overflow-visible flex items-center justify-center"
      onPointerEnter={() => setIsSurging(true)}
      onPointerLeave={() => setIsSurging(false)}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-3xl opacity-60 pointer-events-none transition-opacity duration-500 blur-2xl"
        style={{
          background: isSurging
            ? "radial-gradient(circle at 50% 50%, rgba(200, 16, 46, 0.38) 0%, rgba(246, 235, 97, 0.2) 45%, transparent 75%)"
            : "radial-gradient(circle at 50% 50%, rgba(200, 16, 46, 0.22) 0%, rgba(212, 180, 99, 0.12) 45%, transparent 75%)",
        }}
      />

      <DecayCard
        width={340}
        height={425}
        image="/projects/profile.jpg"
        baseFrequency={0.015}
        numOctaves={5}
        seed={4}
        maxDisplacement={380}
        movementBound={45}
        borderRadius={28}
        className="relative z-10 drop-shadow-[0_20px_45px_rgba(200,16,46,0.25)]"
      />
    </div>
  );
}