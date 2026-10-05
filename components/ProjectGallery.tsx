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
            className="py-14 sm:py-20 border-t border-hairline overflow-hidden"
        >
            <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
                <Reveal>
                    <SectionHeading title="Featured Projects" />
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="relative w-full max-w-full h-[380px] xs:h-[460px] sm:h-[540px] md:h-[600px] mt-2 sm:mt-4 overflow-hidden rounded-2xl">
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
                    className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-8 sm:mt-10"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center gap-2 text-[0.9rem] font-semibold hover:text-accent transition-colors min-h-[44px] px-5 py-2.5 rounded-full border border-hairline bg-bg-raised/40 hover:border-accent/40 touch-manipulation select-none"
                    >
                        Explore all projects
                        <ArrowUpRight size={15} />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}