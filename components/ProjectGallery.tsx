"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CircularGallery from "./CircularGallery";
import { projects } from "@/lib/data";

export default function ProjectGallery() {
    const galleryItems = projects
        .filter((project) => project.image)
        .map((project) => ({
            image: project.image as string,
            text: project.title,
        }));

    return (
        <section
            id="projects"
            className="py-20 border-t border-hairline"
        >
            <div className="max-w-content mx-auto px-7">
                <Reveal>
                    <SectionHeading title="Selected Work" />
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="relative w-full h-[600px] mt-4">
                        <CircularGallery
                            items={galleryItems}
                            bend={1}
                            textColor="#ffffff"
                            borderRadius={0.05}
                            scrollEase={0.05}
                            font="bold 30px Figtree"
                            scrollSpeed={2}
                        />
                    </div>
                </Reveal>

                <Reveal
                    delay={0.16}
                    className="flex flex-wrap justify-center gap-5 mt-10"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[0.9rem] font-semibold hover:text-accent transition-colors"
                    >
                        Explore all projects
                        <ArrowUpRight size={15} />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}