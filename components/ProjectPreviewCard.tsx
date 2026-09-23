"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectPreviewCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/projects"
      className="group relative block rounded-m overflow-hidden border border-hairline bg-bg-raised"
    >
      {!imgError ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="aspect-[16/10] flex items-center justify-center"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--hairline) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, var(--hairline) 0 1px, transparent 1px 22px)",
          }}
        >
          <span className="font-mono text-[0.78rem] text-muted bg-bg px-3 py-1.5 border border-hairline rounded-full">
            {project.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
        <h3 className="font-display font-semibold text-white text-[1.05rem] drop-shadow">
          {project.title}
        </h3>
        <span className="font-mono text-[0.72rem] text-white/85 whitespace-nowrap translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          View details →
        </span>
      </div>
    </Link>
  );
}