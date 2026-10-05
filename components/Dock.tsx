'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
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
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  label?: React.ReactNode;
};

function DockItem({
  children,
  className = '',
  onClick,
  href,
  target = '_blank',
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize
    };
    return val - rect.left - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
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

  const itemContent = Children.map(children, (child) =>
    React.isValidElement(child)
      ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
      : child
  );

  const commonProps = {
    ref,
    style: {
      width: size,
      height: size
    },
    onHoverStart: () => isHovered.set(1),
    onHoverEnd: () => isHovered.set(0),
    onFocus: () => isHovered.set(1),
    onBlur: () => isHovered.set(0),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: `relative inline-flex items-center justify-center rounded-full border bg-transparent shadow-sm cursor-pointer transition-colors duration-200 select-none ${className}`,
    'aria-label': typeof label === 'string' ? label : undefined
  };

  if (href) {
    return (
      <motion.a
        {...commonProps}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {itemContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...commonProps}
      type="button"
      tabIndex={0}
    >
      {itemContent}
    </motion.button>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className={`${className} absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-hairline bg-bg-raised/95 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.72rem] text-ink shadow-lg pointer-events-none select-none z-30`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 68,
  distance = 180,
  panelHeight = 64,
  baseItemSize = 48
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="relative mx-auto flex w-fit max-w-full items-end justify-center overflow-visible"
      style={{ height: magnification + 14 }}
    >
      <div
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`${className} relative flex items-end w-fit gap-3 sm:gap-3.5 rounded-2xl border border-white/10 bg-transparent backdrop-blur-sm pb-2 px-3 sm:px-4 shadow-lg`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            href={item.href}
            target={item.target}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
