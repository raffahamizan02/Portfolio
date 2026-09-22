"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
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
  const base =
    "group inline-flex items-center gap-2 rounded-s px-5 py-[11px] text-sm font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-strong"
      : "bg-transparent text-ink border border-hairline hover:border-ink";

  const content = (
    <>
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </>
  );

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${styles} ${className}`}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={`${base} ${styles} ${className}`}>
          {content}
        </Link>
      )}
    </motion.span>
  );
}