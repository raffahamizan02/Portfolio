"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/data";

import MobileTabBar from "./MobileTabBar";
import GooeyJellyNav from "./GooeyJellyNav";

export default function Navbar() {
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  const items = navLinks.map((link) => ({
    ...link,
    href: isHome ? link.href : `/${link.href}`,
  }));

  const homeActiveIndex = navLinks.findIndex(
    (link) => link.href === active
  );

  const projectsIndex = navLinks.findIndex(
    (link) => link.href === "#projects"
  );

  const activeIndex = isHome
    ? Math.max(0, homeActiveIndex)
    : Math.max(0, projectsIndex);

  return (
    <>
      <header className="hidden md:block fixed top-4 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-content mx-auto px-7">
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-auto overflow-hidden rounded-full shadow-lg">
              <GooeyJellyNav
                items={items}
                activeIndex={activeIndex}
                initialActiveIndex={activeIndex}
              />
            </div>
          </div>
        </div>
      </header>

      <MobileTabBar />
    </>
  );
}