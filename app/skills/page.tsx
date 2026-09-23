import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsDirectory from "@/components/SkillsDirectory";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Skills & Technologies — ${profile.name}`,
  description:
    "Comprehensive directory of programming languages, frameworks, databases, and developer tools used by Muhammad Abhiraffa Hamizan.",
};

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="max-w-content mx-auto px-7 pt-10">
          <Link
            href="/#skills"
            className="inline-flex items-center gap-2 text-[0.9rem] text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
        <SkillsDirectory />
      </main>
      <Footer />
    </>
  );
}
