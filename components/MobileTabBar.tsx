"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Wrench, FolderGit2, Milestone, Mail } from "lucide-react";

const tabs = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#journey", label: "Journey", icon: Milestone },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function MobileTabBar() {
  const [active, setActive] = useState("#top");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    if (!isHome) return;
    const sections = tabs
      .map((t) => document.querySelector(t.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav
      aria-label="Primary (mobile)"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-hairline bg-bg/95 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isHome && active === tab.href;
          return (
            <a
              key={tab.href}
              href={hrefFor(tab.href)}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-tab-indicator"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-m bg-bg-raised"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={19}
                className={`relative transition-colors ${isActive ? "text-accent" : "text-muted"}`}
              />
              <span
                className={`relative text-[0.62rem] font-medium transition-colors ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}