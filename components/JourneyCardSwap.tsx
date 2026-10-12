'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Maximize2,
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import { competitions, CompetitionItem } from '@/lib/competitions';

const categoryColorMap = {
  Chess: {
    bg: 'bg-emerald-950/70',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-300'
  },
  Coding: {
    bg: 'bg-accent-tint/70',
    border: 'border-accent/40',
    text: 'text-accent-strong',
    badge: 'bg-accent/10 text-accent-strong'
  },
  Mathematics: {
    bg: 'bg-blue-950/70',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-300'
  }
};

const placeStyleMap = {
  '1st Place': 'border-accent/50 bg-accent/15 text-accent font-bold',
  '2nd Place': 'border-slate-300/50 bg-slate-200/15 text-slate-200 font-bold',
  '3rd Place': 'border-accent-strong/50 bg-accent-strong/15 text-accent-strong font-bold'
};

export default function JourneyCardSwap() {
  const [selectedComp, setSelectedComp] = useState<CompetitionItem | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Auto-advance mobile carousel gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % competitions.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (idx: number) => {
    if (competitions[idx]) {
      setSelectedComp(competitions[idx]);
    }
  };

  const currentMobileComp = competitions[activeMobileIndex] ?? competitions[0];
  const currentCatColors = categoryColorMap[currentMobileComp.category];
  const currentPlaceStyle = placeStyleMap[currentMobileComp.place];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-2 sm:inset-4 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, #E21B3C 50%, transparent 75%)' }}
      />

      {/* MOBILE & TABLET: Dedicated responsive certificate showcase */}
      <div className="w-full lg:hidden flex flex-col items-center">
        {/* Category switcher pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3.5 w-full flex-wrap">
          {competitions.map((comp, idx) => {
            const isSelected = activeMobileIndex === idx;
            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => setActiveMobileIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer touch-manipulation select-none ${
                  isSelected
                    ? 'bg-accent text-white font-semibold shadow-md border border-accent-strong'
                    : 'bg-bg-raised text-muted border border-hairline hover:text-ink hover:border-white/20'
                }`}
              >
                {comp.category} • {comp.place}
              </button>
            );
          })}
        </div>

        {/* Certificate Card */}
        <div className="relative w-full max-w-[420px] mx-auto bg-gradient-to-br from-[#141414] via-[#090909] to-[#131313] rounded-2xl border border-hairline p-3.5 sm:p-4 shadow-2xl">
          <div
            onClick={() => setSelectedComp(currentMobileComp)}
            className="relative w-full h-[190px] xs:h-[210px] sm:h-[240px] rounded-xl overflow-hidden border border-white/10 bg-black/80 cursor-pointer group select-none"
          >
            <Image
              src={currentMobileComp.image}
              alt={currentMobileComp.title}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-2.5 left-2.5">
              <span
                className={`px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-mono font-medium backdrop-blur-md ${currentCatColors.bg} ${currentCatColors.border} ${currentCatColors.text}`}
              >
                {currentMobileComp.category}
              </span>
            </div>

            <div className="absolute top-2.5 right-2.5">
              <span
                className={`px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-mono backdrop-blur-md ${currentPlaceStyle}`}
              >
                {currentMobileComp.placeBadge}
              </span>
            </div>

            <div className="absolute bottom-2.5 right-2.5">
              <span className="px-3 py-1 rounded-md bg-black/85 border border-white/25 text-[11px] font-mono text-white inline-flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                <Maximize2 size={12} className="text-accent" /> Inspect Certificate
              </span>
            </div>
          </div>

          <div className="pt-3 px-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-semibold text-[15px] sm:text-base text-ink truncate">
                {currentMobileComp.title}
              </h3>
              <span className="text-[11px] font-mono text-muted shrink-0">
                {currentMobileComp.year}
              </span>
            </div>

            <p className="text-[12px] sm:text-[13px] text-muted leading-relaxed line-clamp-2">
              {currentMobileComp.description}
            </p>

            <div className="flex items-center justify-between pt-2.5 border-t border-hairline/80 text-[11px] font-mono text-muted/90">
              <span className="truncate max-w-[210px]">
                {currentMobileComp.organizer}
              </span>
              <button
                type="button"
                onClick={() => setSelectedComp(currentMobileComp)}
                className="text-accent-strong hover:text-accent font-medium flex items-center gap-1 cursor-pointer touch-manipulation"
              >
                Inspect <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-hairline/60">
            <button
              type="button"
              onClick={() =>
                setActiveMobileIndex(
                  (prev) => (prev - 1 + competitions.length) % competitions.length
                )
              }
              className="p-2 rounded-lg border border-hairline text-muted hover:text-ink hover:bg-white/5 transition-colors touch-manipulation cursor-pointer"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {competitions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeMobileIndex === i ? 'w-6 bg-accent' : 'w-2 bg-muted/30'
                  }`}
                  aria-label={`Go to certificate ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveMobileIndex((prev) => (prev + 1) % competitions.length)
              }
              className="p-2 rounded-lg border border-hairline text-muted hover:text-ink hover:bg-white/5 transition-colors touch-manipulation cursor-pointer"
              aria-label="Next certificate"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP: 3D interactive CardSwap */}
      <div className="hidden lg:flex relative w-full max-w-[480px] h-[480px] items-center justify-center overflow-visible">
        <CardSwap
          width={380}
          height={315}
          cardDistance={46}
          verticalDistance={56}
          delay={3800}
          pauseOnHover={true}
          skewAmount={5}
          easing="elastic"
          onCardClick={handleCardClick}
          className="origin-center"
        >
          {competitions.map((comp) => {
            const catColors = categoryColorMap[comp.category];
            const placeStyle = placeStyleMap[comp.place];

            return (
              <Card
                key={comp.id}
                customClass="cursor-pointer group shadow-2xl transition-all duration-300 hover:shadow-accent/25 overflow-hidden"
              >
                <div className="relative w-full h-full p-3.5 bg-gradient-to-br from-[#131313] via-[#090909] to-[#141414] rounded-xl flex flex-col justify-between border border-hairline hover:border-accent/40 transition-colors select-none">
                  <div className="relative w-full h-[160px] rounded-lg overflow-hidden border border-white/10 bg-black/60">
                    <Image
                      src={comp.image}
                      alt={comp.title}
                      fill
                      sizes="380px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-medium backdrop-blur-md ${catColors.bg} ${catColors.border} ${catColors.text}`}
                      >
                        {comp.category}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[11px] font-mono backdrop-blur-md ${placeStyle}`}
                      >
                        {comp.placeBadge}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <span className="px-3 py-1 rounded-md bg-black/85 border border-white/30 text-xs font-mono text-white inline-flex items-center gap-1.5 shadow-lg">
                        <Maximize2 size={12} className="text-accent" /> Inspect
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 px-1 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-semibold text-[15px] text-ink truncate">
                          {comp.title}
                        </h4>
                        <span className="text-[10px] font-mono text-muted shrink-0">
                          {comp.year}
                        </span>
                      </div>

                      <p className="text-[12px] text-muted leading-relaxed line-clamp-2 mt-1">
                        {comp.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-hairline/60 text-[11px] font-mono text-muted/80">
                      <span className="truncate max-w-[220px]">
                        {comp.organizer}
                      </span>
                      <span className="text-accent-strong shrink-0 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Details <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </CardSwap>
      </div>

      {/* FULL-SCREEN CERTIFICATE INSPECTION MODAL */}
      <AnimatePresence>
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedComp(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0c0c0c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-hairline bg-bg-raised/70">
                <div className="flex items-center gap-2">
                  <Trophy size={15} className="text-accent" />
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">
                    {selectedComp.category} Award • {selectedComp.year}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedComp(null)}
                  className="w-8 h-8 rounded-lg text-muted hover:text-ink hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Full Certificate Image container with object-contain */}
                <div className="relative w-full aspect-[4/3] max-h-[48vh] rounded-xl overflow-hidden border border-white/10 bg-black/95 shadow-lg">
                  <Image
                    src={selectedComp.image}
                    alt={selectedComp.title}
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute bottom-2.5 right-2.5">
                    <a
                      href={selectedComp.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-[11px] font-mono rounded-md bg-black/85 backdrop-blur-sm border border-white/20 text-white hover:text-accent flex items-center gap-1.5 transition-colors shadow-lg"
                    >
                      <ExternalLink size={12} /> Open Full Size
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                      {selectedComp.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-mono ${
                        placeStyleMap[selectedComp.place]
                      }`}
                    >
                      {selectedComp.placeBadge}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-accent-strong mt-1">
                    {selectedComp.organizer} • {selectedComp.year}
                  </p>
                </div>

                <p className="text-sm text-muted leading-relaxed bg-bg p-3.5 rounded-xl border border-hairline/80">
                  {selectedComp.description}
                </p>
              </div>

              <div className="px-5 py-3 border-t border-hairline bg-bg-raised/60 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedComp(null)}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-hairline hover:bg-white/10 text-ink transition-colors cursor-pointer touch-manipulation min-h-[40px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
