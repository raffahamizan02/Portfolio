"use client";

import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import TechText from "./TechText";

const socials = [
  { label: "GitHub", href: profile.github, icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  { label: "Instagram", href: profile.instagram, icon: FaInstagram },
  { label: "Discord", href: profile.discord, icon: FaDiscord },
];

export default function Footer() {
  return (
    <footer className="section-rule pt-24 pb-8 md:pt-32">
      <div className="portfolio-shell">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <div className="mono-label text-red">Let’s connect</div>
            <p className="mt-4 max-w-[26ch] leading-[1.6] text-text-secondary">
              Open to learning, building, and conversations around backend development.
            </p>
          </div>

          <div className="col-span-12 flex flex-wrap gap-x-7 gap-y-4 md:col-span-8 md:justify-end">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-underline flex items-center gap-2 pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors hover:text-red"
              >
                <Icon size={15} />
                {label} ↗
              </a>
            ))}
            <a
              href={"mailto:" + profile.email}
              className="interactive-underline flex items-center gap-2 pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors hover:text-red"
            >
              Email ↗
            </a>
          </div>
        </div>

        <a href="/#top" className="group mt-24 block">
          <div aria-hidden="true" className="overflow-hidden">
            <TechText
              text={profile.displayName}
              color="#FFFFFF"
              accentColor="#FF3030"
              reveal="letter"
              reach={180}
              selection
              labels={false}
              draggable={false}
              sweep
              speed={0.65}
            />
          </div>
        </a>

        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-5 text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <a
            href="/#top"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:text-red"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
