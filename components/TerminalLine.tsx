import Typewriter from "./Typewriter";

const ROLES = ["Backend Developer", "API Builder", "Chess Player"];

export default function TerminalLine() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-hairline bg-bg-raised pl-4 pr-5 py-2.5 font-mono text-[1.05rem]">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="w-2 h-2 rounded-full bg-gold" />
      </span>
      <Typewriter words={ROLES} className="text-accent" />
    </div>
  );
}