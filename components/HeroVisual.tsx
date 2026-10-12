"use client";

import DecayCard from "./DecayCard";

export default function HeroVisual() {
  return (
    <div className="reveal relative w-full mx-auto select-none overflow-visible flex items-center justify-center">
      {/* Cloud-like ambient backdrop glow with soft luminous breathing */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-[36px] opacity-40 blur-2xl pointer-events-none -z-10 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(200,16,46,0.45) 0%, rgba(226,27,60,0.2) 60%, transparent 80%)",
          animationDuration: "5.5s"
        }}
        aria-hidden="true"
      />

      <DecayCard
        width={270}
        height={345}
        image="/projects/profile.jpg"
        cloudSpeed={1.0}
        amplitudeX={16}
        amplitudeY={13}
        tiltAmplitude={3.2}
        rotAmplitude={2.2}
        borderRadius={24}
        glareColor="#ffffff"
        glareOpacity={0.35}
        glareAngle={-35}
        glareSize={240}
        transitionDuration={2800}
        autoPlay={true}
        continuous={true}
        className="relative z-10 drop-shadow-[0_20px_40px_rgba(200,16,46,0.25)] w-full max-w-[240px] xs:max-w-[255px] sm:max-w-[270px]"
      />
    </div>
  );
}