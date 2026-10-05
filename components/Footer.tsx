"use client";

import { usePathname } from "next/navigation";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa6";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import TechText from "./TechText";
import Dock, { type DockItemData } from "./Dock";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  const dockSocialItems: DockItemData[] = [
    {
      label: "GitHub",
      href: profile.github,
      target: "_blank",
      icon: <FaGithub className="text-[1.3rem] text-[#F0F6FC] transition-transform duration-200" />,
      className:
        "bg-transparent border-white/20 hover:border-white hover:bg-white/[0.08] hover:shadow-[0_0_22px_rgba(255,255,255,0.4)]",
    },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      target: "_blank",
      icon: <FaLinkedin className="text-[1.3rem] text-[#0A66C2] transition-transform duration-200" />,
      className:
        "bg-transparent border-[#0A66C2]/40 hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 hover:shadow-[0_0_22px_rgba(10,102,194,0.55)]",
    },
    {
      label: "Instagram",
      href: profile.instagram,
      target: "_blank",
      icon: <FaInstagram className="text-[1.3rem] text-[#E4405F] transition-transform duration-200" />,
      className:
        "bg-transparent border-[#E4405F]/40 hover:border-[#E4405F] hover:bg-[#E4405F]/15 hover:shadow-[0_0_22px_rgba(228,64,95,0.55)]",
    },
    {
      label: "Discord",
      href: profile.discord,
      target: "_blank",
      icon: <FaDiscord className="text-[1.3rem] text-[#5865F2] transition-transform duration-200" />,
      className:
        "bg-transparent border-[#5865F2]/40 hover:border-[#5865F2] hover:bg-[#5865F2]/15 hover:shadow-[0_0_22px_rgba(88,101,242,0.55)]",
    },
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      target: "_self",
      icon: <FaEnvelope className="text-[1.2rem] text-[#EA4335] transition-transform duration-200" />,
      className:
        "bg-transparent border-[#EA4335]/40 hover:border-[#EA4335] hover:bg-[#EA4335]/15 hover:shadow-[0_0_22px_rgba(234,67,53,0.55)]",
    },
  ];

  return (
    <footer className="pt-16 sm:pt-20 pb-20 sm:pb-8 border-t border-hairline overflow-x-hidden overflow-y-visible">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full overflow-x-hidden overflow-y-visible">
        <a href={hrefFor("#top")} className="flex mx-auto no-underline w-fit max-w-full">
          <h1 className="scale-x-100 sm:scale-x-[1.15] origin-center font-display font-semibold uppercase leading-[0.95] sm:leading-[0.9] text-[clamp(1.5rem,7.2vw,6.5rem)] tracking-tight text-ink text-center max-w-full break-words [text-wrap:balance]">
            <TechText text="ABHIRAFFA HAMIZAN" />
          </h1>
        </a>

        {/* Interactive Social Media Dock */}
        <div className="mt-6 sm:mt-8 mb-2 flex justify-center overflow-x-auto no-scrollbar max-w-full py-1">
          <Dock
            items={dockSocialItems}
            panelHeight={60}
            baseItemSize={44}
            magnification={60}
            distance={140}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left mt-10 sm:mt-14 pt-6 border-t border-hairline text-[0.82rem] text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-hairline rounded-full w-[44px] h-[44px] min-w-[44px] min-h-[44px] grid place-items-center hover:border-accent hover:text-accent transition-colors touch-manipulation cursor-pointer"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}