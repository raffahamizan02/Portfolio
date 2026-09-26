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
        <div className="max-w-content mx-auto px-7 pt-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[0.9rem] text-muted hover:text-accent"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>

        <section className="py-16">
          <div className="max-w-content mx-auto px-7">
            <SectionHeading
              title="All Projects"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
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