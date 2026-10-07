'use client';

import React, { useEffect, useRef, useId, type ReactNode } from 'react';
import { gsap } from 'gsap';

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
}

const DecayCard: React.FC<DecayCardProps> = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  borderRadius = 24,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const isHovered = useRef<boolean>(false);
  const rawId = useId();
  const filterId = `decay-filter-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const cursor = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current });
  const winsize = useRef<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number): number =>
      ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number): number =>
      Math.hypot(x1 - x2, y1 - y2);

    const handleResize = (): void => {
      winsize.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    const startTime = performance.now();
    let rafId: number;

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      const autoX =
        Math.sin(elapsed * 1.3) * (movementBound * 0.42) +
        Math.cos(elapsed * 0.75) * (movementBound * 0.22);
      const autoY =
        Math.cos(elapsed * 1.1) * (movementBound * 0.38) +
        Math.sin(elapsed * 0.6) * (movementBound * 0.18);
      const autoRz = Math.sin(elapsed * 0.9) * 3.2;

      const autoDisplacement =
        (Math.sin(elapsed * 2.2) * 0.5 + 0.5) * 28 +
        Math.sin(elapsed * 4.2) * 8 +
        14;

      const mouseTargetX = map(cursor.current.x, 0, winsize.current.width || 1, -120, 120);
      const mouseTargetY = map(cursor.current.y, 0, winsize.current.height || 1, -120, 120);
      const mouseTargetRz = map(cursor.current.x, 0, winsize.current.width || 1, -10, 10);

      let localHoverX = 0;
      let localHoverY = 0;
      if (isHovered.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        localHoverX = ((cursor.current.x - centerX) / (rect.width / 2 || 1)) * (movementBound * 0.4);
        localHoverY = ((cursor.current.y - centerY) / (rect.height / 2 || 1)) * (movementBound * 0.4);
      }

      let combinedTargetX = autoX + mouseTargetX * 0.5 + localHoverX;
      let combinedTargetY = autoY + mouseTargetY * 0.5 + localHoverY;
      let combinedTargetRz = autoRz + mouseTargetRz * 0.5;

      if (combinedTargetX > movementBound)
        combinedTargetX = movementBound + (combinedTargetX - movementBound) * 0.2;
      if (combinedTargetX < -movementBound)
        combinedTargetX = -movementBound + (combinedTargetX + movementBound) * 0.2;
      if (combinedTargetY > movementBound)
        combinedTargetY = movementBound + (combinedTargetY - movementBound) * 0.2;
      if (combinedTargetY < -movementBound)
        combinedTargetY = -movementBound + (combinedTargetY + movementBound) * 0.2;

      imgValues.imgTransforms.x = lerp(imgValues.imgTransforms.x, combinedTargetX, 0.08);
      imgValues.imgTransforms.y = lerp(imgValues.imgTransforms.y, combinedTargetY, 0.08);
      imgValues.imgTransforms.rz = lerp(imgValues.imgTransforms.rz, combinedTargetRz, 0.08);

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );

      const mouseDisplacement = map(cursorTravelledDistance, 0, 180, 0, maxDisplacement);
      const targetDisplacement = Math.max(autoDisplacement, mouseDisplacement);

      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        targetDisplacement,
        0.08
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale }
        });
      }

      cachedCursor.current = { ...cursor.current };
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      className={`relative select-none ${className}`.trim()}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%'
      }}
    >
      <div
        ref={svgRef}
        className="relative w-full h-full [will-change:transform]"
      >
        <svg
          viewBox="-60 -75 720 900"
          preserveAspectRatio="xMidYMid slice"
          className="relative w-full h-full block overflow-visible"
        >
          <defs>
            <filter id={filterId}>
              <feTurbulence
                type="turbulence"
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                seed={seed}
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence1"
              />
              <feDisplacementMap
                ref={displacementMapRef}
                in="SourceGraphic"
                in2="turbulence1"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="B"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="displacementMap3"
              />
            </filter>

            {borderRadius > 0 && (
              <clipPath id={`${filterId}-clip`}>
                <rect
                  x="0"
                  y="0"
                  width="600"
                  height="750"
                  rx={borderRadius}
                  ry={borderRadius}
                />
              </clipPath>
            )}
          </defs>

          <g clipPath={borderRadius > 0 ? `url(#${filterId}-clip)` : undefined}>
            <image
              href={image}
              x="0"
              y="0"
              width="600"
              height="750"
              filter={`url(#${filterId})`}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          {borderRadius > 0 && (
            <rect
              x="0"
              y="0"
              width="600"
              height="750"
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2.5"
              className="pointer-events-none"
            />
          )}
        </svg>

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
