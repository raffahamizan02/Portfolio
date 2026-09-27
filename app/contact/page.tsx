import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — " + profile.name,
  description: "Contact Muhammad Abhiraffa Hamizan.",
};

const links = [
  { label: "Email", href: "mailto:" + profile.email },
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Instagram", href: profile.instagram },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="min-h-[75svh] pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="portfolio-shell">
            <div className="mono-label text-red">04 / Contact</div>
            <h1 className="display-title mt-6 max-w-[8ch] text-[clamp(56px,8vw,112px)]">
              LET’S TALK.
            </h1>
            <p className="mt-8 max-w-[48ch] text-[clamp(20px,2.2vw,28px)] leading-[1.15] text-white">
              Have a project, idea, or opportunity? Send a message and let’s start from there.
            </p>

            <div className="mt-12 grid border-y border-line md:grid-cols-2">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={
                    "group flex items-center justify-between px-1 py-6 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors hover:text-red md:px-5 md:py-8 " +
                    (index < links.length - 1 ? "border-b border-line" : "") +
                    (index % 2 === 0 ? " md:border-r md:border-line" : "") +
                    (index < 2 ? " md:border-b md:border-line" : "")
                  }
                >
                  {link.label}
                  <ArrowUpRight size={16} className="text-text-tertiary transition-colors group-hover:text-red" />
                </a>
              ))}
            </div>

            <Link
              href="/"
              className="interactive-underline mt-8 inline-flex items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary"
            >
              ← Back home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
