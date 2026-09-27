"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "border border-white bg-white text-black hover:border-red hover:bg-red hover:text-white"
      : "border border-line bg-transparent text-white hover:border-red hover:text-red";

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-200 ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  );

  const shared =
    "group inline-flex min-h-12 items-center gap-3 rounded-pill px-[22px] font-mono text-[12px] uppercase tracking-[0.08em] transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4";

  return (
    <motion.span whileTap={{ scale: 0.98 }} className="inline-flex">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={shared + " " + classes + " " + className}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={shared + " " + classes + " " + className}>
          {content}
        </Link>
      )}
    </motion.span>
  );
}
