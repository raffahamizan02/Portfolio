"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import { profile } from "@/lib/data";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="min-h-[100svh] scroll-mt-20"
      aria-labelledby="hero-title"
    >
      <div className="portfolio-shell flex min-h-[100svh] flex-col justify-center pb-14 pt-28 lg:pt-24">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12,
              }}
            >
              <div className="mono-label mb-6 text-text-secondary">
                <span className="mr-2 text-red">●</span>
                Available to learn, build & collaborate
              </div>

              <h1
                id="hero-title"
                className="display-title max-w-[8ch] text-[clamp(56px,8vw,112px)]"
              >
                {profile.displayName}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-display text-[18px] font-medium text-white md:text-[20px]">
                  {profile.title}
                </span>
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="mono-label text-text-secondary">
                  {profile.tagline}
                </span>
              </div>

              <p className="mt-8 max-w-[42ch] text-[clamp(20px,2.2vw,28px)] leading-[1.15] tracking-[-0.025em] text-white">
                I build backend systems that turn ideas into reliable, usable software.
              </p>

              <p className="mt-6 max-w-[36ch] text-[16px] italic leading-[1.6] text-text-secondary">
                “{profile.quote}”
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/#projects">View projects</Button>
                <Button href="/contact" variant="secondary">
                  Let’s connect
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.22,
            }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="hero-image-wrap relative ml-auto w-full max-w-[520px] lg:pl-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line">
                <Image
                  src="/projects/profile.jpg"
                  alt="Portrait of Muhammad Abhiraffa Hamizan"
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 40vw"
                  className="hero-image object-cover grayscale-[0.15]"
                />
              </div>

              <div className="absolute -bottom-5 left-5 flex items-center gap-3 bg-black pr-3">
                <span className="mono-label text-text-secondary">
                  Profile / 01
                </span>
                <span className="h-px w-8 bg-red" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-6 pt-16">
          <div className="mono-label text-text-tertiary">
            Scroll to explore <span className="text-white">↓</span>
          </div>
          <div className="hidden text-right sm:block">
            <div className="mono-label text-text-tertiary">Malang / ID</div>
            <div className="mono-label mt-1 text-text-tertiary">2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
