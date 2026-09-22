"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroVisual() {
  const [imgError, setImgError] = useState(false);
  const [decoded, setDecoded] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDecoded(true);
      return;
    }
    setDecoded(false);
    const timeout = setTimeout(() => setDecoded(true), 900);
    return () => clearTimeout(timeout);
  }, [replayKey, shouldReduceMotion]);

  const replay = () => {
    if (shouldReduceMotion) return;
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="reveal relative aspect-square max-w-[420px] w-full md:justify-self-end">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--accent-tint) 0%, transparent 70%)",
        }}
      />

      <button
        type="button"
        onClick={replay}
        aria-label="Replay scan animation"
        className="absolute inset-[8%] rounded-m overflow-hidden border border-hairline bg-bg-raised shadow-[0_20px_45px_-15px_rgba(200,16,46,0.35)] p-0 cursor-pointer text-left"
      >
        {!imgError ? (
          <>
            <img
              src="/projects/profile.jpg"
              alt="Foto profil Muhammad Abhiraffa Hamizan"
              className="w-full h-full object-cover transition-[filter] duration-[900ms] ease-out"
              style={{
                filter: decoded
                  ? "blur(0px) grayscale(0) contrast(1) hue-rotate(0deg)"
                  : "blur(10px) grayscale(1) contrast(1.4) hue-rotate(180deg)",
              }}
              onError={() => setImgError(true)}
            />

            {!shouldReduceMotion && (
              <motion.div
                key={replayKey}
                className="absolute left-0 right-0 h-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--accent-tint) 45%, var(--accent) 50%, var(--accent-tint) 55%, transparent)",
                  opacity: 0.85,
                }}
                initial={{ top: "-10%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            )}

            <span
              className={`absolute top-3 left-3 font-mono text-[0.75rem] bg-bg/85 border border-hairline rounded-full px-2.5 py-1 transition-opacity duration-350 ${
                decoded ? "text-gold" : "text-muted"
              }`}
            >
              {decoded ? "◎ Tap to Scan" : "◎ Muhammad Abhiraffa Hamizan"}
            </span>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-8 border-2 border-dashed border-hairline">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="2" y="6" width="20" height="14" rx="2" />
              <circle cx="12" cy="13" r="3.5" />
              <path d="M8 6l1.5-2h5L16 6" />
            </svg>
            <div>
              <p className="font-display font-semibold text-ink text-[0.95rem]">
                Belum ada foto
              </p>
              <p className="text-muted text-[0.82rem] mt-1.5 max-w-[22ch]">
                Taruh file foto Anda di{" "}
                <code className="font-mono bg-bg px-1.5 py-0.5 rounded border border-hairline">
                  public/profile.jpg
                </code>
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}