'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'framer-motion';
import React, { useRef } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  labelClassName?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  labelClassName?: string;
};

function DockItem({
  className = '',
  icon,
  label,
  onClick,
  href,
  target = '_blank',
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  labelClassName = ''
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize
    };
    return val - rect.left - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }
  };

  const content = (
    <div className="group flex flex-col items-center justify-start gap-1 sm:gap-1.5 focus:outline-none select-none text-center cursor-pointer no-underline">
      {/* Social icon button */}
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size
        }}
        className={`relative inline-flex items-center justify-center rounded-full border bg-transparent shadow-sm transition-colors duration-200 ${className}`}
      >
        {icon}
      </motion.div>

      {/* Social media name directly beneath the corresponding logo */}
      <span
        className={`font-mono text-[10px] sm:text-[11px] font-medium text-muted/80 group-hover:text-ink transition-colors leading-tight tracking-tight text-center whitespace-nowrap select-none ${labelClassName}`}
      >
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        title={typeof label === 'string' ? label : undefined}
        aria-label={typeof label === 'string' ? label : undefined}
        className="focus:outline-none no-underline touch-manipulation"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={typeof label === 'string' ? label : undefined}
      aria-label={typeof label === 'string' ? label : undefined}
      className="focus:outline-none bg-transparent border-0 p-0 cursor-pointer touch-manipulation"
    >
      {content}
    </button>
  );
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 58,
  distance = 140,
  panelHeight = 84,
  baseItemSize = 44
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="relative mx-auto flex w-fit max-w-full items-end justify-center overflow-visible px-2">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`${className} relative flex items-end justify-center w-fit max-w-full gap-2.5 xs:gap-3.5 sm:gap-4 md:gap-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-3 sm:px-5 pt-3 pb-2.5 shadow-lg overflow-visible`}
        role="toolbar"
        aria-label="Social media dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            href={item.href}
            target={item.target}
            className={item.className}
            labelClassName={item.labelClassName}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </div>
  );
}
