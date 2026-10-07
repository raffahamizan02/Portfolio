"use client";

import TextType from "./TextType";

const ROLES = [
  "Backend Developer",
  "IT Student",
  "Vibe Coding",
  "Machine Learning",
];

const ROLE_COLORS = [
  "#C8102E",
  "#F6EB61",
  "#FFFFFF",
  "#E21B3C",
  "#F6EB61",
];

export default function TerminalLine() {
  return (
    <div
      className="group inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-hairline/80 bg-bg-raised/90 backdrop-blur-md pl-3 sm:pl-3.5 pr-4 sm:pr-5 py-1.5 sm:py-2 font-mono text-[0.82rem] sm:text-[0.95rem] max-w-full shadow-[0_4px_20px_-6px_rgba(200,16,46,0.18)] hover:border-accent/40 hover:shadow-[0_6px_28px_-4px_rgba(200,16,46,0.32)] transition-all duration-300 select-none"
      role="status"
      aria-label="Role typing animation"
    >
      <span className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#414A4C] shadow-[0_0_6px_rgba(200,16,46,0.6)] group-hover:scale-110 transition-transform duration-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F6EB61] shadow-[0_0_6px_rgba(246,235,97,0.5)] group-hover:scale-110 transition-transform duration-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] shadow-[0_0_6px_rgba(200,16,46,0.5)] group-hover:scale-110 transition-transform duration-200" />
      </span>

      <TextType
        as="span"
        text={ROLES}
        textColors={ROLE_COLORS}
        typingSpeed={55}
        deletingSpeed={30}
        pauseDuration={1800}
        variableSpeed={{ min: 40, max: 75 }}
        showCursor={true}
        cursorCharacter="▍"
        cursorClassName="text-accent font-normal align-middle"
        cursorBlinkDuration={0.45}
        className="font-semibold tracking-wide truncate"
      />
    </div>
  );
}