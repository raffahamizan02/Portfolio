"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STATUS_LINES = [
  "Selamat Datang",
  "Welcome",
  "Youkoso",
  "Willkommen",
  "Ahlan wa sahlan",
];

const KNIGHT_PATH: [number, number][] = [
  [0, 0],
  [1, 2],
  [2, 0],
  [0, 1],
  [2, 2],
  [1, 0],
  [0, 2],
  [2, 1],
];

const GRID_SIZE = 3;
const CELL = 46;
const TOTAL_DURATION = 2000;
const STEP_INTERVAL = 240;
const STORAGE_KEY = "loader-seen";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [facingRight, setFacingRight] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const isDev = process.env.NODE_ENV === "development";
      const hasPreview =
        typeof window !== "undefined" &&
        window.location.search.includes("loading");
      const seen = window.sessionStorage.getItem(STORAGE_KEY);

      if ((seen && !isDev && !hasPreview) || shouldReduceMotion) {
        setReady(true);
        return;
      }
      setVisible(true);
      setReady(true);
    } catch {
      setReady(true);
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!visible) return;

    const startTime = performance.now();

    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const targetTime = TOTAL_DURATION - 150;
      const currentProgress = Math.min(100, (elapsed / targetTime) * 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressTimer);
      }
    }, 20);

    const stepTimer = setInterval(() => {
      setStepIndex((curr) => {
        const next = (curr + 1) % KNIGHT_PATH.length;
        setPrevIndex(curr);

        const fromCol = KNIGHT_PATH[curr][1];
        const toCol = KNIGHT_PATH[next][1];
        if (toCol > fromCol) {
          setFacingRight(true);
        } else if (toCol < fromCol) {
          setFacingRight(false);
        }

        return next;
      });
    }, STEP_INTERVAL);

    const statusTimer = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 480);
    const completeTimer = setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
      }
      setVisible(false);
    }, TOTAL_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearInterval(statusTimer);
      clearTimeout(completeTimer);
    };
  }, [visible]);

  if (!ready) return null;

  const [currentRow, currentCol] = KNIGHT_PATH[stepIndex];
  const prevRow = prevIndex !== null ? KNIGHT_PATH[prevIndex][0] : null;
  const prevCol = prevIndex !== null ? KNIGHT_PATH[prevIndex][1] : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 bg-bg select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div
            className="relative rounded-xl p-1.5 shadow-2xl border border-[#3b3834]"
            style={{
              backgroundColor: "#262421",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="grid rounded-lg overflow-hidden"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL}px)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL}px)`,
                width: GRID_SIZE * CELL,
                height: GRID_SIZE * CELL,
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                const r = Math.floor(i / GRID_SIZE);
                const c = i % GRID_SIZE;
                const isDark = (r + c) % 2 === 1;

                const isCurrent = r === currentRow && c === currentCol;
                const isPrev = r === prevRow && c === prevCol;

                let squareBg = isDark ? "#739552" : "#ebecd0";
                if (isCurrent) {
                  squareBg = isDark ? "#baca27" : "#f7f769";
                } else if (isPrev) {
                  squareBg = isDark ? "#9bb128" : "#e6e872";
                }

                return (
                  <div
                    key={i}
                    className="relative transition-colors duration-200"
                    style={{
                      backgroundColor: squareBg,
                      width: CELL,
                      height: CELL,
                    }}
                  />
                );
              })}
            </div>

            <motion.div
              className="absolute top-1.5 left-1.5 flex items-center justify-center pointer-events-none"
              style={{ width: CELL, height: CELL }}
              animate={{ x: currentCol * CELL, y: currentRow * CELL }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 26,
              }}
            >
              <motion.div
                key={stepIndex}
                initial={{ y: -6, scale: 1.15 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="w-[34px] h-[34px] flex items-center justify-center"
                style={{
                  transform: facingRight ? "scaleX(-1)" : "scaleX(1)",
                  filter: "drop-shadow(0 3px 4px rgba(0, 0, 0, 0.45))",
                }}
              >
                <svg
                  viewBox="0 0 45 45"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="#ffffff"
                    fillRule="evenodd"
                    stroke="#262421"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
                      style={{ fill: "#ffffff", stroke: "#262421" }}
                    />
                    <path
                      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,7.4 17.06,5.34 18.5,4 C 18.5,6.5 21.5,7 21.5,7 C 21.5,7 23.5,6.5 23,4 C 25.5,5.5 28,7 28,9 C 28,11 25.5,12 25.5,12 C 25.5,12 25,14 26,15 C 27,16 28.5,15.5 28.5,15.5 C 28.5,15.5 29,17.5 28,18 C 27,18.5 25,18 24,18 z"
                      style={{ fill: "#ffffff", stroke: "#262421" }}
                    />
                    <path
                      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
                      style={{ fill: "#262421", stroke: "#262421" }}
                    />
                    <path
                      d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z"
                      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
                      style={{ fill: "#262421", stroke: "#262421" }}
                    />
                  </g>
                </svg>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-52 flex flex-col items-center gap-3">
            <div className="w-full h-1 bg-hairline rounded-full overflow-hidden">
              <div
                className="h-full bg-[#739552] transition-[width] duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(115,149,82,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-semibold text-ink tabular-nums">
                {Math.floor(progress)}
              </span>
              <span className="text-muted text-xs">%</span>
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
