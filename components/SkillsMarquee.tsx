"use client";

import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";
import CircularCarousel, { type CircularCarouselItem } from "./CircularCarousel";
import { rowOne } from "@/lib/skillsData";

/** Warna logo saat diam (abu netral, terbaca di tema terang maupun gelap) */
const MUTED_COLOR = "#8b8b94";

const toDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

/**
 * Mengubah ikon react-icons menjadi gambar SVG (data URI) supaya bisa dipakai
 * sebagai kartu di CircularCarousel.
 */
function buildLogo(Icon: IconType, color: string) {
  const icon = renderToStaticMarkup(<Icon size={128} color={color} />);
  return toDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">` +
    `<g transform="translate(36 36)">${icon}</g></svg>`
  );
}

export default function SkillsMarquee() {
  const items = useMemo<CircularCarouselItem[]>(
    () =>
      rowOne.map((skill) => ({
        src: buildLogo(skill.icon, MUTED_COLOR),
        hoverSrc: buildLogo(skill.icon, skill.color),
        alt: skill.label,
        title: skill.label,
      })),
    []
  );

  const openSkill = (_item: CircularCarouselItem, index: number) => {
    const url = rowOne[index]?.url;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="w-full h-[240px] md:h-[280px]"
      role="group"
      aria-label="Skills and technologies"
    >
      <CircularCarousel
        items={items}
        preset="cylinder"
        backfaces={false}
        cardWidth={120}
        gap={30}
        cornerRadius={24}
        autoplay="drift"
        speed={16}
        pauseOnHover
        focusOnClick={false}
        depthFade={0.8}
        fadeColor="var(--bg)"
        onItemClick={openSkill}
      />
    </div>
  );
}