'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[360px] xs:h-[420px] sm:h-[460px] lg:h-[500px] xl:h-[540px] flex items-center justify-center bg-transparent">
      <div className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-hairline bg-bg-raised/80 backdrop-blur-md text-muted inline-flex items-center gap-2">
        <RotateCw size={12} className="animate-spin text-accent" />
        <span>Loading ThinkPad T14 Gen 2...</span>
      </div>
    </div>
  ),
});

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 bg-transparent border-t border-hairline overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 sm:space-y-6"
          >
            <div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-ink break-words">
                About Me<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <p className="text-base sm:text-[1.05rem] md:text-[1.125rem] text-muted leading-relaxed sm:leading-[1.8] font-normal break-words">
                I am a Software Engineering student at SMK PGRI 3 Malang with a strong focus on backend
                development. I thrive on designing robust APIs, managing complex databases, and
                architecting reliable, efficient server-side systems.
              </p>

              <p className="text-base sm:text-[1.05rem] md:text-[1.125rem] text-muted leading-relaxed sm:leading-[1.8] font-normal break-words">
                I enjoy diving deep into how systems operate behind the scenes. My approach centers on
                analytical problem-solving, writing clean code, and building scalable architectures that
                can handle real-world demands.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-full flex items-center justify-center"
          >
            <div className="relative w-full h-[360px] xs:h-[420px] sm:h-[460px] lg:h-[500px] xl:h-[540px] flex items-center justify-center bg-transparent">
              <ModelViewer
                url="thinkpad-t14"
                width="100%"
                height="100%"
                defaultRotationX={-18}
                defaultRotationY={22}
                defaultZoom={2.5}
                minZoomDistance={1.6}
                maxZoomDistance={4.2}
                enableMouseParallax={true}
                enableHoverRotation={true}
                enableManualRotation={true}
                enableManualZoom={false}
                autoRotate={true}
                autoRotateSpeed={0.32}
                environmentPreset="city"
                ambientIntensity={0.85}
                keyLightIntensity={1.5}
                fillLightIntensity={0.8}
                rimLightIntensity={1.0}
                fadeIn={true}
                showScreenshotButton={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}