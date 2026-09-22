"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaDiscord,
  FaTiktok,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

const socials = [
  { icon: FaGithub, href: profile.github, label: "GitHub", pending: false },
  { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn", pending: false },
  { icon: FaInstagram, href: profile.instagram, label: "Instagram", pending: false },
  { icon: FaWhatsapp, href: profile.whatsapp, label: "WhatsApp", pending: false },
  { icon: FaDiscord, href: profile.discord, label: "Discord", pending: false },
  { icon: FaTiktok, href: profile.tiktok, label: "TikTok", pending: false },
  { icon: FaFacebook, href: profile.facebook, label: "Facebook", pending: false },
  { icon: FaXTwitter, href: profile.twitter, label: "X / Twitter", pending: false },
];

function WobbleWord({ word }: { word: string }) {
  return (
    <span className="inline-block">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -10, color: "var(--accent)" }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="pt-20 pb-8 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <a href={hrefFor("#top")} className="block no-underline w-fit">
          <h2 className="font-display font-semibold uppercase leading-[0.9] text-[clamp(2.6rem,9vw,6.5rem)] tracking-tight text-ink">
            <WobbleWord word="Abhiraffa Hamizan" />
          </h2>
        </a>

        <div className="flex flex-wrap gap-3 mt-9">
          {socials.map((s) => {
            const Icon = s.icon;
            const isExternal = s.href.startsWith("http") || s.href.startsWith("mailto:");
            return (
              <a
                key={s.label}
                href={s.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={s.pending ? `${s.label} (coming soon)` : s.label}
                title={s.pending ? `${s.label} — coming soon` : s.label}
                className={`w-11 h-11 rounded-full border grid place-items-center transition-colors ${
                  s.pending
                    ? "border-hairline text-muted/60 cursor-default"
                    : "border-hairline text-ink hover:border-accent hover:text-accent"
                }`}
                onClick={s.pending ? (e) => e.preventDefault() : undefined}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>

        <div className="flex justify-between items-center gap-5 flex-wrap mt-14 pt-6 border-t border-hairline text-[0.82rem] text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-hairline rounded-full w-[38px] h-[38px] grid place-items-center hover:border-accent hover:text-accent transition-colors"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}