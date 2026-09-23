"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import MobileTabBar from "./MobileTabBar";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur-sm">
        <div className="max-w-content mx-auto px-7 h-[72px] flex items-center justify-center">
          <nav className="flex items-center gap-9" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                className={`relative py-1 text-[0.94rem] transition-colors ${
                  active === link.href ? "text-ink" : "text-muted hover:text-ink"
                } after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-accent after:origin-left after:transition-transform after:duration-200 ${
                  active === link.href ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle className="ml-2" />
          </nav>
        </div>
      </header>

      <MobileTabBar />

      <div className="md:hidden fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </>
  );
}