"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur-sm">
      <div className="max-w-content mx-auto px-7 h-[72px] flex items-center justify-center relative">
        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
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

        <div className="md:hidden flex items-center gap-2 absolute right-7">
          <ThemeToggle />
          <button
            className="flex flex-col gap-[5px] p-2"
            aria-expanded={open}
            aria-controls="mobile-panel"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="w-[22px] h-[1.5px] bg-ink block" />
            <span className="w-[22px] h-[1.5px] bg-ink block" />
            <span className="w-[22px] h-[1.5px] bg-ink block" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-hairline"
          >
            <div className="flex flex-col px-7 pb-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={hrefFor(link.href)}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-[1.02rem] border-b border-hairline last:border-none no-underline text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}