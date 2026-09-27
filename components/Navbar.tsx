"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PillNav from "./PillNav";
import StaggeredMenu from "./StaggeredMenu";
import { navLinks } from "@/lib/data";

const desktopLinks = [
  { href: "/#top", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#journey", label: "Journey" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeHref, setActiveHref] = useState("/#top");

  useEffect(() => {
    if (!isHome) return;

    const sections = desktopLinks
      .map((link) => link.href.replace("/#", ""))
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveHref("/#" + visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-[1400px] items-start justify-between gap-3">
        <a
          href="/#top"
          className="hidden h-12 items-center rounded-pill border border-line bg-black px-4 font-mono text-[12px] uppercase tracking-[0.08em] md:inline-flex"
          aria-label="Abhiraffa home"
        >
          <span className="mr-2 text-red">●</span>
          AH
        </a>

        <div className="hidden md:block">
          <PillNav
            items={desktopLinks}
            activeHref={isHome ? activeHref : undefined}
            baseColor="var(--black)"
            pillColor="var(--white)"
            hoveredPillTextColor="var(--white)"
            pillTextColor="var(--black)"
            ease="power3.out"
          />
        </div>

        <a
          href="/contact"
          className="hidden h-12 items-center rounded-pill border border-line bg-black px-5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 hover:border-red hover:text-red md:inline-flex"
        >
          Contact ↗
        </a>

        <div className="md:hidden">
          <StaggeredMenu items={navLinks.concat([{ href: "/contact", label: "Contact" }])} />
        </div>
      </div>
    </header>
  );
}
