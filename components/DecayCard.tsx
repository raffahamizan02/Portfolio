'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import GlareHover from './GlareHover';

export interface DecayCardProps {
  width?: number;
  height?: number;
  image?: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  borderRadius?: number;
  className?: string;
  children?: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  autoPlay?: boolean;
  continuous?: boolean;
  // Cloud drift movement parameters:
  cloudSpeed?: number; // Speed factor (1.0 = balanced cloud drift, neither too slow nor too fast)
  amplitudeX?: number; // Max horizontal drift (default: 16)
  amplitudeY?: number; // Max vertical buoyancy (default: 13)
  tiltAmplitude?: number; // Max 3D tilt degrees (default: 3.2)
  rotAmplitude?: number; // Max rotation degrees (default: 2.2)
}

const DecayCard: React.FC<DecayCardProps> = ({
  width = 270,
  height = 345,
  image = '/projects/profile.jpg',
  borderRadius = 24,
  className = '',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.35,
  glareAngle = -35,
  glareSize = 240,
  transitionDuration = 2800,
  autoPlay = true,
  continuous = true,
  cloudSpeed = 1.0,
  amplitudeX = 16,
  amplitudeY = 13,
  tiltAmplitude = 3.2,
  rotAmplitude = 2.2
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const movingCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = movingCardRef.current;
    if (!el) return;

    // Respect reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { x: 0, y: 0, rotationZ: 0, rotateX: 0, rotateY: 0, scale: 1 });
      return;
    }

    gsap.set(el, {
      transformPerspective: 1000,
      transformStyle: 'preserve-3d'
    });

    const startTime = performance.now();
    let rafId: number;

    // Continuous cloud float: smooth, perpetual, non-repetitive drift
    // Balanced speed: clearly visible floating motion without being fast or distracting
    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001 * cloudSpeed;

      // Primary horizontal glide + secondary atmospheric air current
      const x =
        Math.sin(elapsed * 1.05) * (amplitudeX * 0.72) +
        Math.sin(elapsed * 0.48 + 1.2) * (amplitudeX * 0.28);

      // Primary vertical cloud buoyancy (undulates softly up and down)
      const y =
        Math.cos(elapsed * 0.88) * (amplitudeY * 0.72) +
        Math.sin(elapsed * 0.41 + 0.9) * (amplitudeY * 0.28);

      // Subtle atmospheric 3D rotational tilt
      const rz = Math.sin(elapsed * 0.72) * rotAmplitude;
      const rx = Math.cos(elapsed * 0.6) * (tiltAmplitude * 0.85);
      const ry = Math.sin(elapsed * 0.52) * (tiltAmplitude * 1.05);

      // Gentle cloud breathing scale (subtle 1.2% pulse)
      const scale = 1 + Math.sin(elapsed * 0.55) * 0.012;

      gsap.set(el, {
        x,
        y,
        rotationZ: rz,
        rotateX: rx,
        rotateY: ry,
        scale,
        force3D: true
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(el);
    };
  }, [cloudSpeed, amplitudeX, amplitudeY, tiltAmplitude, rotAmplitude]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none ${className}`.trim()}
      style={{
        width: `${width}px`,
        aspectRatio: `${width} / ${height}`,
        maxWidth: '100%',
        maxHeight: `${height}px`
      }}
    >
      {/* Moving wrapper: smoothly drifts within safe boundaries without user hover */}
      <div
        ref={movingCardRef}
        className="relative w-full h-full [will-change:transform] pointer-events-auto"
      >
        <GlareHover
          width="100%"
          height="100%"
          background="#0a0a0a"
          borderRadius={`${borderRadius}px`}
          borderColor="rgba(255, 255, 255, 0.15)"
          glareColor={glareColor}
          glareOpacity={glareOpacity}
          glareAngle={glareAngle}
          glareSize={glareSize}
          transitionDuration={transitionDuration}
          autoPlay={autoPlay}
          continuous={continuous}
          className="w-full h-full"
        >
          <img
            src={image}
            alt="Profile Card"
            className="w-full h-full object-cover select-none pointer-events-none rounded-[inherit]"
            draggable={false}
          />
        </GlareHover>

        {children && (
          <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[2.5rem] leading-[1.5em] first-line:text-[6rem] pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecayCard;
