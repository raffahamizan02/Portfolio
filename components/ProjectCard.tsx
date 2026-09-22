"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(project.image) && !imageError;

  return (
    <article className="border border-hairline rounded-m overflow-hidden flex flex-col bg-bg-raised transition-all duration-200 hover:border-accent hover:-translate-y-1">
      <div
        className="aspect-[16/10] flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--hairline) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, var(--hairline) 0 1px, transparent 1px 22px)",
        }}
      >
        {hasImage ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-mono text-[0.78rem] text-muted bg-bg px-3 py-1.5 border border-hairline rounded-full">
            {project.title}
          </span>
        )}
      </div>

      <div className="p-6.5 flex flex-col gap-3.5 flex-1">
        <span className="font-mono text-[0.84rem] text-accent">
          {project.role}
        </span>

        <h3 className="font-display font-semibold text-[1.12rem]">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-muted text-[0.95rem] leading-[1.6]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-[0.78rem] text-muted border border-hairline px-2.5 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2 border-t border-hairline text-[0.86rem]">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-accent"
            >
              View Repository
            </a>
          ) : (
            <span className="text-muted">Repository in Coming Soon</span>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-accent"
            >
              View Website
            </a>
          ) : (
            <span className="text-muted">Website in Coming Soon</span>
          )}
        </div>
      </div>
    </article>
  );
}