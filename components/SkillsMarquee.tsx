"use client";

import { useMemo } from "react";
import LogoLoop from "./LogoLoop";
import { rowOne } from "@/lib/skillsData";

export default function SkillsMarquee() {
  const rowOneLogos = useMemo(
    () =>
      rowOne.map((skill) => {
        const Icon = skill.icon;

        return {
          node: (
            <span
              className="text-muted transition-colors duration-300 group-hover/item:text-[var(--brand-color)]"
              style={
                {
                  "--brand-color": skill.color,
                } as React.CSSProperties
              }
            >
              <Icon size={34} />
            </span>
          ),
          title: skill.label,
          href: skill.url,
          ariaLabel: `Buka website resmi ${skill.label}`,
        };
      }),
    []
  );

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full h-[80px] overflow-hidden">
        <LogoLoop
          logos={rowOneLogos}
          speed={90}
          direction="left"
          logoHeight={36}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Skills and technologies"
        />
      </div>
    </div>
  );
}