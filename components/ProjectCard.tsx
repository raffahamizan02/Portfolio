"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import TiltedCard from "./TiltedCard";

export default function ProjectCard({ project }: { project: Project }) {
    const [imgError, setImgError] = useState(false);

    const hasImage = Boolean(project.image) && !imgError;

    return (
        <TiltedCard
            scaleOnHover={1.025}
            rotateAmplitude={10}
            showMobileWarning={false}
            showTooltip={false}
            containerHeight="100%"
            containerWidth="100%"
        >
            <article className="w-full h-full border border-hairline rounded-m overflow-hidden flex flex-col bg-bg-raised transition-colors duration-200 hover:border-accent/80 [transform-style:preserve-3d] shadow-lg">
                <div className="aspect-[16/10] overflow-hidden relative">
                    {hasImage ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover block transition-transform duration-500 ease-out hover:scale-[1.03]"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(45deg, var(--hairline) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, var(--hairline) 0 1px, transparent 1px 22px)",
                            }}
                        >
                            <span className="font-mono text-[0.78rem] text-muted bg-bg px-3 py-1.5 border border-hairline rounded-full">
                                {project.title}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-3.5 flex-1 [transform:translateZ(8px)]">
                    <span className="font-mono text-[0.82rem] sm:text-[0.84rem] text-accent">
                        {project.role}
                    </span>

                    <h3 className="font-display font-semibold text-[1.05rem] sm:text-[1.12rem] break-words">
                        {project.title}
                    </h3>

                    <p className="text-muted text-[0.88rem] sm:text-[0.95rem] leading-[1.6] break-words">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {project.technologies.map((technology) => (
                            <span
                                key={technology}
                                className="text-[0.76rem] sm:text-[0.78rem] text-muted border border-hairline px-2.5 py-0.5 rounded-full inline-flex items-center select-none"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 border-t border-hairline text-[0.86rem]">
                        {project.repoUrl ? (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold hover:text-accent min-h-[44px] inline-flex items-center py-1 touch-manipulation transition-colors"
                            >
                                View Repository ↗
                            </a>
                        ) : (
                            <span className="text-muted min-h-[44px] inline-flex items-center">
                                Repository coming soon
                            </span>
                        )}

                        {project.liveUrl ? (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold hover:text-accent min-h-[44px] inline-flex items-center py-1 touch-manipulation transition-colors"
                            >
                                View Website ↗
                            </a>
                        ) : (
                            <span className="text-muted min-h-[44px] inline-flex items-center">
                                Website coming soon
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </TiltedCard>
    );
}