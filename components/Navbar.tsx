"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import MobileTabBar from "./MobileTabBar";
import PillNav from "./PillNav";

export default function Navbar() {
  const [active, setActive] =
    useState("");

  const pathname =
    usePathname();

  const isHome =
    pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) =>
        document.querySelector(
          link.href
        )
      )
      .filter(Boolean) as Element[];

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setActive(
                  `#${entry.target.id}`
                );
              }
            }
          );
        },
        {
          rootMargin:
            "-40% 0px -55% 0px",
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(section)
    );

    return () =>
      observer.disconnect();
  }, [isHome]);

  return (
    <>
      {/* Desktop */}
      <header className="hidden md:block fixed top-4 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-content mx-auto px-7">
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-auto">
              <PillNav
                items={navLinks}
                activeHref={
                  isHome
                    ? active
                    : undefined
                }
              />
            </div>

            <div className="absolute right-7 pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile */}
      <MobileTabBar />

      <div className="md:hidden fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </>
  );
}