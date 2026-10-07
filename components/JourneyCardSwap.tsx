'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import { competitions, CompetitionItem } from '@/lib/competitions';

const categoryColorMap = {
  Chess: {
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-300'
  },
  Coding: {
    bg: 'bg-accent-tint/60',
    border: 'border-accent/30',
    text: 'text-accent-strong',
    badge: 'bg-accent/10 text-accent-strong'
  },
  Mathematics: {
    bg: 'bg-blue-950/60',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-300'
  }
};

const placeStyleMap = {
  '1st Place': 'border-gold/40 bg-gold/15 text-gold font-bold',
  '2nd Place': 'border-slate-300/40 bg-slate-200/15 text-slate-200 font-bold',
  '3rd Place': 'border-amber-600/40 bg-amber-500/15 text-amber-400 font-bold'
};

export default function JourneyCardSwap() {
  const [selectedComp, setSelectedComp] = useState<CompetitionItem | null>(null);

  const handleCardClick = (idx: number) => {
    if (competitions[idx]) {
      setSelectedComp(competitions[idx]);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-[480px] h-[460px] sm:h-[500px] flex items-center justify-center overflow-visible">
        <div
          aria-hidden="true"
          className="absolute inset-4 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C8102E 0%, #F6EB61 50%, transparent 75%)' }}
        />

        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <CardSwap
            width={380}
            height={310}
            cardDistance={48}
            verticalDistance={58}
            delay={3800}
            pauseOnHover={true}
            skewAmount={5}
            easing="elastic"
            onCardClick={handleCardClick}
            className="right-[15px] sm:right-[30px]"
          >
            {competitions.map((comp) => {
              const catColors = categoryColorMap[comp.category];
              const placeStyle = placeStyleMap[comp.place];

              return (
                <Card
                  key={comp.id}
                  customClass="cursor-pointer group shadow-2xl transition-all duration-300 hover:shadow-accent/20 overflow-hidden"
                >
                  <div className="relative w-full h-full p-3 sm:p-3.5 bg-gradient-to-br from-[#131313] via-[#090909] to-[#141414] rounded-xl flex flex-col justify-between border border-hairline hover:border-gold/40 transition-colors select-none">
                    <div className="relative w-full h-[150px] sm:h-[160px] rounded-lg overflow-hidden border border-white/10 bg-black/60">
                      <Image
                        src={comp.image}
                        alt={comp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
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
                        <span className="px-3 py-1 rounded-md bg-black/80 border border-white/30 text-xs font-mono text-white inline-flex items-center gap-1.5 shadow-lg">
                          <Maximize2 size={12} className="text-gold" /> Inspect
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 px-1 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-display font-semibold text-sm sm:text-[15px] text-ink truncate">
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
      </div>

      <AnimatePresence>
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedComp(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0c0c0c] border border-hairline/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-bg-raised/70">
                <div className="flex items-center gap-2">
                  <Trophy size={15} className="text-gold" />
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">
                    {selectedComp.category} Competition
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedComp(null)}
                  className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-hairline transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-hairline bg-black shadow-lg">
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
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-black/75 backdrop-blur-sm border border-white/20 text-white hover:text-gold flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={11} /> Open Photo
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                      {selectedComp.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-mono ${placeStyleMap[selectedComp.place]
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
                  className="px-4 py-1.5 text-xs font-medium rounded-lg bg-hairline hover:bg-hairline/80 text-ink transition-colors cursor-pointer"
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
