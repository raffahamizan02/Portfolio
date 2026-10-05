"use client";

import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";

import CircularCarousel, {
  type CircularCarouselItem,
} from "./CircularCarousel";

import { rowOne } from "@/lib/skillsData";

const MUTED_COLOR = "#6f6f78";

const toDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

/**
 * Membuat logo + nama teknologi dalam satu SVG.
 *
 * Hasil akhirnya:
 * ┌─────────────────────┐
 * │                     │
 * │       [ LOGO ]      │
 * │                     │
 * │     JAVASCRIPT      │
 * │                     │
 * └─────────────────────┘
 */
function buildLogo(
  Icon: IconType,
  color: string,
  label: string
) {
  const icon = renderToStaticMarkup(
    <Icon size={150} color={color} />
  );

  return toDataUri(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="320"
      viewBox="0 0 260 320"
    >
      <rect
        width="260"
        height="320"
        rx="34"
        fill="#030303"
      />

      <g transform="translate(55 28)">
        ${icon}
      </g>

      <text
        x="130"
        y="235"
        text-anchor="middle"
        fill="#f5f5f5"
        font-family="Arial, Helvetica, sans-serif"
        font-size="20"
        font-weight="600"
        letter-spacing="2"
      >
        ${label.toUpperCase()}
      </text>
    </svg>
  `);
}

export default function SkillsMarquee() {
  const items = useMemo<CircularCarouselItem[]>(
    () =>
      rowOne.map((skill) => ({
        src: buildLogo(
          skill.icon,
          MUTED_COLOR,
          skill.label
        ),

        hoverSrc: buildLogo(
          skill.icon,
          skill.color,
          skill.label
        ),

        alt: skill.label,
        title: skill.label,
      })),
    []
  );

  const openSkill = (
    _item: CircularCarouselItem,
    index: number
  ) => {
    const url = rowOne[index]?.url;

    if (url) {
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div
      className="relative w-full max-w-full h-[320px] xs:h-[360px] md:h-[440px] overflow-hidden"
      role="group"
      aria-label="Skills and technologies"
    >
      <CircularCarousel
        items={items}

        /* Bentuk lingkaran 3D */
        preset="cylinder"

        /*
         * PENTING:
         * Bagian belakang tetap dirender.
         */
        backfaces={true}

        /*
         * Logo dibuat jauh lebih besar.
         */
        cardWidth={190}
        aspectRatio={0.8125}

        /*
         * Jarak antar logo.
         */
        gap={34}

        cornerRadius={30}

        /*
         * Tetap berputar otomatis.
         */
        autoplay="drift"
        speed={11}

        /*
         * Jangan berhenti ketika mouse berada
         * di atas carousel.
         */
        pauseOnHover={false}

        /*
         * Klik tidak digunakan untuk memindahkan
         * carousel ke posisi depan.
         */
        focusOnClick={false}

        /*
         * Logo belakang masih terlihat.
         * Jangan terlalu kuat fade-nya.
         */
        depthFade={0.30}

        fadeColor="#000000"

        /*
         * Jangan membuat sisi belakang menjadi
         * terlalu gelap.
         */
        innerShade={0.15}

        /*
         * Masih bisa drag manual.
         */
        draggable={true}
        momentum={0.72}

        /*
         * Efek pointer/parallax.
         */
        parallax={0.18}
        stretch={0.22}

        /*
         * Klik hanya bekerja pada logo yang
         * memang sedang berada di depan.
         */
        onItemClick={openSkill}
      />
    </div>
  );
}