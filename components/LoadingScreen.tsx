"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STATUS_LINES = [
  "npm install patience.js",
  "castling the database",
  "e4 — opening the connection",
  'git commit -m "good move"',
  "calculating best endpoint",
  "Nf3 — developing the API",
  "checking for check(mate)s",
  "compiling backend logic",
  "resigning to the build process",
];

const KNIGHT_PATH: [number, number][] = [
  [0, 0],
  [2, 1],
  [0, 2],
  [2, 3],
  [4, 4],
  [2, 3],
  [4, 2],
  [2, 1],
  [4, 0],
  [2, 1],
];

const GRID_SIZE = 5;
const CELL = 32;
const STORAGE_KEY = "loader-seen";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(STORAGE_KEY);
      if (seen || shouldReduceMotion) {
        setReady(true);
        return;
      }
      setVisible(true);
      setReady(true);
    } catch {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 4 + 2));
    }, 200);

    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i + 1) % KNIGHT_PATH.length);
    }, 260);

    const statusTimer = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 550);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearInterval(statusTimer);
    };
  }, [visible]);

  useEffect(() => {
    if (progress < 100 || !visible) return;
    const timeout = setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setVisible(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, [progress, visible]);

  if (!ready) return null;

  const [row, col] = KNIGHT_PATH[stepIndex];
  const boardPx = GRID_SIZE * CELL;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-9 bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div
            className="relative border border-hairline rounded-m overflow-hidden"
            style={{ width: boardPx, height: boardPx }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL}px)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL}px)`,
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                const r = Math.floor(i / GRID_SIZE);
                const c = i % GRID_SIZE;
                const dark = (r + c) % 2 === 1;
                return (
                  <div
                    key={i}
                    className={dark ? "bg-bg-raised" : "bg-bg"}
                    style={{ width: CELL, height: CELL }}
                  />
                );
              })}
            </div>
            <motion.div
              className="absolute top-0 left-0 flex items-center justify-center text-accent pointer-events-none"
              style={{ width: CELL, height: CELL }}
              animate={{ x: col * CELL, y: row * CELL }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <span className="text-xl leading-none">♞</span>
            </motion.div>
          </div>

          <div className="w-56 flex flex-col items-center gap-3.5">
            <div className="w-full h-[3px] bg-hairline rounded-full overflow-hidden">
              <div
                className="h-full bg-brand transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-semibold text-ink tabular-nums">
                {Math.floor(progress)}
              </span>
              <span className="text-muted text-sm">%</span>
            </div>
            <p className="font-mono text-[0.8rem] text-muted h-4 text-center">
              {STATUS_LINES[statusIndex]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}