"use client";

import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/data";

const RADIUS = 240;
const ANGLE_STEP = 32;
const FRAME_W = 210;
const FRAME_H = 270;

function GalleryImage({ project }: { project: Project }) {
    const [error, setError] = useState(false);

    const hasImage = Boolean(project.image) && !error;

    return hasImage ? (
        <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            draggable={false}
            onError={() => setError(true)}
        />
    ) : (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{
                backgroundImage:
                    "repeating-linear-gradient(45deg, var(--hairline) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, var(--hairline) 0 1px, transparent 1px 22px)",
            }}
        >
            <span className="font-mono text-[0.72rem] text-muted bg-bg px-2.5 py-1 border border-hairline rounded-full text-center">
                {project.title}
            </span>
        </div>
    );
}

export default function CircularGallery({
    projects,
    active,
    onActiveChange,
}: {
    projects: Project[];
    active: number;
    onActiveChange: (index: number) => void;
}) {
    const [paused, setPaused] = useState(false);
    const n = projects.length;

    useEffect(() => {
        if (n <= 1 || paused) return;

        const timer = window.setInterval(() => {
            onActiveChange((active + 1) % n);
        }, 4000);

        return () => window.clearInterval(timer);
    }, [active, n, onActiveChange, paused]);

    if (n === 0) {
        return null;
    }

    const go = (dir: 1 | -1) => {
        onActiveChange((active + dir + n) % n);
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -50) {
            go(1);
        } else if (info.offset.x > 50) {
            go(-1);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative w-full flex items-center justify-center select-none"
                style={{
                    height: FRAME_H + 80,
                    perspective: "1200px",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
            >
                <motion.div
                    className="relative w-full h-full cursor-grab active:cursor-grabbing"
                    style={{ transformStyle: "preserve-3d" }}
                    drag="x"
                    dragElastic={0.2}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                >
                    {projects.map((project, i) => {
                        let offset = i - active;

                        if (offset > n / 2) offset -= n;
                        if (offset < -n / 2) offset += n;

                        const angleRad = (offset * ANGLE_STEP * Math.PI) / 180;
                        const x = Math.sin(angleRad) * RADIUS;
                        const z = Math.cos(angleRad) * RADIUS - RADIUS;
                        const rotateY = -offset * ANGLE_STEP;

                        const isActive = offset === 0;
                        const visible = Math.abs(offset) <= 2;

                        return (
                            <motion.div
                                key={project.slug}
                                className="absolute top-1/2 left-1/2 rounded-m overflow-hidden border"
                                style={{
                                    width: FRAME_W,
                                    height: FRAME_H,
                                    marginLeft: -FRAME_W / 2,
                                    marginTop: -FRAME_H / 2,
                                    transformStyle: "preserve-3d",
                                    pointerEvents: visible ? "auto" : "none",
                                    borderColor: isActive
                                        ? "var(--accent)"
                                        : "var(--hairline)",
                                    boxShadow: isActive
                                        ? "0 22px 55px -18px rgba(0,0,0,0.5), 0 0 28px -10px var(--accent)"
                                        : "0 18px 40px -16px rgba(0,0,0,0.4)",
                                    zIndex: isActive ? 10 : 5,
                                }}
                                animate={{
                                    x,
                                    z,
                                    rotateY,
                                    scale: isActive ? 1 : 0.8,
                                    opacity: visible ? (isActive ? 1 : 0.42) : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 28,
                                }}
                                onClick={() => {
                                    if (!isActive) {
                                        onActiveChange(i);
                                    }
                                }}
                            >
                                <GalleryImage project={project} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="flex items-center gap-5 mt-6">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="w-10 h-10 rounded-full border border-hairline grid place-items-center hover:border-accent hover:text-accent transition-colors"
                >
                    <ChevronLeft size={17} />
                </button>

                <span className="font-mono text-[0.85rem] text-muted tabular-nums">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(n).padStart(2, "0")}
                </span>

                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="w-10 h-10 rounded-full border border-hairline grid place-items-center hover:border-accent hover:text-accent transition-colors"
                >
                    <ChevronRight size={17} />
                </button>
            </div>

            <div className="flex items-center gap-2 mt-5">
                {projects.map((project, i) => (
                    <button
                        key={project.slug}
                        type="button"
                        onClick={() => onActiveChange(i)}
                        aria-label={`Show ${project.title}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active
                                ? "w-8 bg-accent"
                                : "w-1.5 bg-hairline hover:bg-muted"
                            }`}
                    />
                ))}
            </div>

            <p className="text-muted text-[0.82rem] mt-4 font-mono">
                drag, click a side card, or let it rotate
            </p>
        </div>
    );
}