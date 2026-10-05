import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { profile, projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: `All Projects — ${profile.name}`,
  description:
    "Every project by Muhammad Abhiraffa Hamizan — a Software Engineering student building backend systems, APIs, and databases.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 pt-6 sm:pt-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[0.9rem] text-muted hover:text-accent min-h-[44px] py-2 touch-manipulation"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        <section className="py-8 sm:py-16 overflow-hidden">
          <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
            <SectionHeading
              title="All Projects"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-10">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}