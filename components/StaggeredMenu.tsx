"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { NavLink } from "@/types/navigation";

type Props = {
  items: NavLink[];
};

export default function StaggeredMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 flex h-12 items-center rounded-pill border border-line bg-black px-4 font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors hover:border-red hover:text-red"
      >
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-black px-5 pb-8 pt-28"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          >
            <nav className="flex h-full flex-col" aria-label="Mobile">
              <div className="flex-1">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={
                      reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 font-display text-[clamp(40px,12vw,60px)] font-medium leading-none tracking-[-0.05em] transition-colors duration-200 hover:text-red"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mono-label text-text-secondary">
                <span className="mr-2 text-red">●</span>
                Backend Developer
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
