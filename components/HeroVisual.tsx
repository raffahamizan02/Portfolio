"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const LENS_RADIUS = 65;

export default function HeroVisual() {
  const [imgError, setImgError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [reduced, setReduced] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const clipPath = hovering
    ? `circle(${LENS_RADIUS}px at ${pos.x}px ${pos.y}px)`
    : `circle(0px at ${pos.x}px ${pos.y}px)`;

  return (
    <div
      className="reveal relative aspect-square max-w-[420px] w-full md:justify-self-end"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--accent-tint) 0%, transparent 70%)",
        }}
      />

      {!reduced && (
        <span
          className={`absolute top-3 left-3 z-20 font-mono text-[0.68rem] text-accent bg-bg/80 border border-hairline rounded-full px-2.5 py-1 transition-opacity duration-200 pointer-events-none ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
        >
          ◎ scanning: identity.exe
        </span>
      )}

      <div
        ref={frameRef}
        onMouseMove={reduced ? undefined : handleMouseMove}
        onMouseEnter={reduced ? undefined : () => setHovering(true)}
        onMouseLeave={reduced ? undefined : () => setHovering(false)}
        className="absolute inset-[8%] rounded-m overflow-hidden border border-hairline bg-bg-raised shadow-[0_20px_45px_-15px_rgba(200,16,46,0.35)]"
      >
        {!imgError ? (
          <>
            <img
              src="/projects/profile.jpg"
              alt="Foto profil Muhammad Abhiraffa Hamizan"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />

            {!reduced && (
              <div
                className="absolute inset-0 pointer-events-none glitch-jitter"
                style={{ clipPath, transition: "clip-path 0.1s ease-out" }}
              >
                <img
                  src="/projects/profile.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  style={{
                    filter: "invert(1) hue-rotate(220deg) saturate(2.4) contrast(1.15)",
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-60"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
                  }}
                />
              </div>
            )}
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
      </div>
    </div>
  );
}