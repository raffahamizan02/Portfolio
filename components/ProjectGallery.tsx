"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import CircularGallery from "./CircularGallery";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";

export default function ProjectGallery() {
    const [active, setActive] = useState(0);
    const project = projects[active];

    if (!project) {
        return null;
    }

    return (
        <section id="projects" className="py-20">
            <div className="max-w-content mx-auto px-7">
                <Reveal>
                    <SectionHeading
                        title="Selected Work"
                    />
                </Reveal>

                <Reveal delay={0.08}>
                    <CircularGallery
                        projects={projects}
                        active={active}
                        onActiveChange={setActive}
                    />
                </Reveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto mt-14 text-center"
                    >
                        <span className="font-mono text-[0.8rem] text-accent">
                            {project.role}
                        </span>

                        <h3 className="font-display font-semibold text-[clamp(1.6rem,4vw,2.3rem)] mt-2">
                            {project.title}
                        </h3>

                        <p className="text-muted text-[1rem] leading-[1.7] mt-4">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mt-5">
                            {project.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="text-[0.78rem] text-muted border border-hairline px-2.5 py-1 rounded-full"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-5 mt-7 text-[0.9rem]">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold hover:text-accent"
                                >
                                    View repository ↗
                                </a>
                            )}

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold hover:text-accent"
                                >
                                    Visit website ↗
                                </a>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <Reveal
                    delay={0.18}
                    className="flex justify-center mt-12"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 border border-hairline rounded-full px-5 py-2.5 text-[0.9rem] font-semibold hover:border-accent hover:text-accent transition-colors"
                    >
                        Explore all projects →
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}