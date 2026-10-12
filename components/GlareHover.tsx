'use client';

import React, { useRef } from 'react';

export interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  autoPlay?: boolean;
  continuous?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  autoPlay = true,
  continuous = true,
  className = '',
  style = {}
}) => {
  const isContinuous = autoPlay || continuous;
  // If continuous, default to a smooth 2800ms unless explicitly overridden
  const effectiveDuration =
    isContinuous && transitionDuration === 650 ? 2800 : transitionDuration;

  let rgba = glareColor;
  if (glareColor.startsWith('#')) {
    const hex = glareColor.replace('#', '');
    if (/^[\dA-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }
  }

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const animateIn = () => {
    if (isContinuous) return;
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    void el.offsetWidth;
    el.style.transition = `${effectiveDuration}ms ease`;
    el.style.backgroundPosition = '100% 100%, 0 0';
  };

  const animateOut = () => {
    if (isContinuous) return;
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = `${effectiveDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isContinuous ? undefined : '-100% -100%, 0 0',
    pointerEvents: 'none',
    zIndex: 20,
    borderRadius: 'inherit'
  };

  const hasBorder = borderColor && borderColor !== 'transparent' && borderColor !== 'none';

  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`.trim()}
      style={{
        width,
        height,
        background,
        borderRadius,
        border: hasBorder ? `2px solid ${borderColor}` : undefined,
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={!isContinuous ? animateIn : undefined}
      onMouseLeave={!isContinuous ? animateOut : undefined}
    >
      <style>{`
        @keyframes glareContinuousSweep {
          0% {
            background-position: -120% -120%, 0 0;
          }
          100% {
            background-position: 140% 140%, 0 0;
          }
        }
      `}</style>
      {children}
      <div
        ref={overlayRef}
        style={{
          ...overlayStyle,
          animation: isContinuous
            ? `glareContinuousSweep ${effectiveDuration}ms linear infinite`
            : undefined
        }}
      />
    </div>
  );
};

export default GlareHover;
