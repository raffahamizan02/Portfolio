"use client";

import React, {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import {
    animate,
    frame,
    motion,
    motionValue,
    useReducedMotion,
    useTransform,
    type MotionValue,
} from "framer-motion";

/**
 * GooeyJellyNav
 * Gabungan GooeyNav (pill putih + partikel "gooey") dan JellyRadio
 * (item membesar seperti jeli dan mendorong tetangganya dengan pegas).
 *
 * - Item aktif membengkak (swell), item lain menyusut sedikit dan terdorong menjauh.
 * - Pill gooey + teks hitam MENGIKUTI bentuk item yang sedang bergetar,
 *   jadi pill ikut "kenyal" tanpa perlu animasi terpisah.
 * - Klik menu  -> jelly + semburan partikel.
 * - Scroll-spy -> jelly + pill muncul lagi, tanpa partikel (supaya tidak ramai).
 * - Memakai `framer-motion` yang sudah ada di project (tidak perlu paket `motion`).
 */

export interface GooeyJellyNavItem {
    label: ReactNode;
    href: string;
}

export interface GooeyJellyNavProps {
    items: GooeyJellyNavItem[];
    /** Kontrol dari luar (scroll-spy). Jika kosong, komponen mengurus sendiri. */
    activeIndex?: number;
    initialActiveIndex?: number;
    onChange?: (index: number) => void;
    ariaLabel?: string;

    /* --- Gooey --- */
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];

    /* --- Jelly --- */
    swell?: number; // seberapa besar item aktif membengkak (0.14 = +14%)
    barge?: number; // dorongan ekstra (px) ke item tetangga
    shrink?: number; // seberapa kecil item non-aktif
    jelly?: number; // intensitas "kenyal" (0 = pegas biasa)
    bounce?: number; // 0..1, makin besar makin memantul
    stagger?: number; // jeda (ms) antar item saat merambat
    stiffness?: number;
    className?: string;
}

interface ChipValues {
    x: MotionValue<number>;
    sx: MotionValue<number>;
    sy: MotionValue<number>;
}

interface Config {
    swell: number;
    barge: number;
    shrink: number;
    jelly: number;
    bounce: number;
    stagger: number;
    stiffness: number;
    reduce: boolean | null;
    count: number;
}

const spring = (k: number, m: number, bounce: number) => ({
    type: "spring" as const,
    stiffness: k,
    damping: 2 * Math.sqrt(k * m) * (1 - bounce),
    mass: m,
});

/** <li> yang transform-nya digerakkan motion value (translateX + scale jelly) */
const JellyLi = forwardRef<
    HTMLLIElement,
    { mv: ChipValues; className?: string; children: ReactNode }
>(function JellyLi({ mv, className, children }, ref) {
    const transform = useTransform(
        () => `translateX(${mv.x.get()}px) scale(${mv.sx.get()}, ${mv.sy.get()})`
    );
    return (
        <motion.li ref={ref} style={{ transform }} className={className}>
            {children}
        </motion.li>
    );
});

const GooeyJellyNav: React.FC<GooeyJellyNavProps> = ({
    items,
    activeIndex: controlledIndex,
    initialActiveIndex = 0,
    onChange,
    ariaLabel = "Primary",
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    swell = 0.14,
    barge = 4,
    shrink = 0.03,
    jelly = 1,
    bounce = 0.25,
    stagger = 22,
    stiffness = 580,
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const liRefs = useRef<(HTMLLIElement | null)[]>([]);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const widths = useRef<number[]>([]);
    const mvs = useRef<ChipValues[]>([]);
    const burst = useRef(false); // true hanya saat perpindahan berasal dari klik
    const reduce = useReducedMotion();

    const [activeIndex, setActiveIndex] = useState<number>(
        controlledIndex ?? initialActiveIndex
    );

    const applied = useRef(activeIndex);
    const cfg = useRef<Config>({} as Config);
    cfg.current = {
        swell,
        barge,
        shrink,
        jelly,
        bounce,
        stagger,
        stiffness,
        reduce,
        count: items.length,
    };

    /* ---------------- util gooey ---------------- */

    const noise = (n = 1) => n / 2 - Math.random() * n;

    const getXY = (
        distance: number,
        pointIndex: number,
        totalPoints: number
    ): [number, number] => {
        const angle =
            ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (
        i: number,
        t: number,
        d: [number, number],
        r: number
    ) => {
        const rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
        };
    };

    const makeParticles = (element: HTMLElement) => {
        const d: [number, number] = particleDistances;
        const r = particleR;
        element.style.setProperty("--time", `${animationTime * 2 + timeVariance}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d, r);

            setTimeout(() => {
                const particle = document.createElement("span");
                const point = document.createElement("span");
                particle.classList.add("particle");
                particle.style.setProperty("--start-x", `${p.start[0]}px`);
                particle.style.setProperty("--start-y", `${p.start[1]}px`);
                particle.style.setProperty("--end-x", `${p.end[0]}px`);
                particle.style.setProperty("--end-y", `${p.end[1]}px`);
                particle.style.setProperty("--time", `${p.time}ms`);
                particle.style.setProperty("--scale", `${p.scale}`);
                particle.style.setProperty("--color", `var(--gjn-color-${p.color}, white)`);
                particle.style.setProperty("--rotate", `${p.rotate}deg`);
                point.classList.add("point");
                particle.appendChild(point);
                element.appendChild(particle);
                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch {
                        // sudah terhapus
                    }
                }, t);
            }, 30);
        }
    };

    /** Pindahkan lapisan efek ke posisi <li> (rect SUDAH termasuk transform jelly) */
    const updateEffectPosition = (element: HTMLElement) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = element.getBoundingClientRect();
        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
        const label = element.innerText;
        if (textRef.current.innerText !== label) textRef.current.innerText = label;
    };

    /** Munculkan ulang pill putih (animasi "pop") */
    const popPill = () => {
        const f = filterRef.current;
        const t = textRef.current;
        if (f) {
            f.classList.remove("active");
            void f.offsetWidth;
            f.classList.add("active");
        }
        if (t) {
            t.classList.remove("active");
            void t.offsetWidth;
            t.classList.add("active");
        }
    };

    /* ---------------- util jelly ---------------- */

    const mvFor = (i: number) => {
        let mv = mvs.current[i];
        if (!mv) {
            mv = { x: motionValue(0), sx: motionValue(1), sy: motionValue(1) };
            mvs.current[i] = mv;
        }
        return mv;
    };

    const apply = (sel: number, instant: boolean) => {
        const C = cfg.current;
        const push = ((widths.current[sel] ?? 0) * C.swell) / 2 + C.barge;

        for (let i = 0; i < C.count; i++) {
            const mv = mvFor(i);
            const on = i === sel;
            const far = Math.abs(i - sel);
            const x = Math.sign(i - sel) * push;
            const s = on ? 1 + C.swell : 1 - C.shrink;

            if (instant || C.reduce) {
                mv.x.jump(x);
                mv.sx.jump(s);
                mv.sy.jump(s);
                continue;
            }

            const k = C.stiffness * (1 - 0.12 * Math.min(far, 3));
            const inFlight =
                mv.x.isAnimating() || mv.sx.isAnimating() || mv.sy.isAnimating();
            const delay = inFlight ? 0 : (far * C.stagger) / 1000;
            const j = C.jelly;

            animate(mv.x, x, { ...spring(k, 0.9, C.bounce), delay });
            animate(mv.sx, s, {
                ...spring(
                    k * (1 + 0.24 * j),
                    0.9 - 0.1 * j,
                    Math.min(0.85, C.bounce + 0.3 * j)
                ),
                delay,
            });
            animate(mv.sy, s, {
                ...spring(k * (1 - 0.14 * j), 0.9 + 0.05 * j, C.bounce),
                delay: delay + 0.05 * j,
            });
        }
    };

    const measure = () => {
        widths.current = liRefs.current.map((el) => el?.offsetWidth ?? 0);
    };

    /* ---------------- efek ---------------- */

    // Ukur + posisi awal, dan rapikan ulang saat resize / font selesai dimuat
    useLayoutEffect(() => {
        const settle = () => {
            measure();
            apply(applied.current, true);
            const li = liRefs.current[applied.current];
            if (li) {
                updateEffectPosition(li);
                textRef.current?.classList.add("active");
                filterRef.current?.classList.add("active");
            }
        };
        settle();
        const observer = new ResizeObserver(settle);
        if (containerRef.current) observer.observe(containerRef.current);
        document.fonts?.ready.then(settle);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length, swell, barge, shrink]);

    // Sinkron dengan scroll-spy dari luar
    useEffect(() => {
        if (controlledIndex === undefined) return;
        setActiveIndex(controlledIndex);
    }, [controlledIndex]);

    // Saat item aktif berubah: jelly + pill pop (+ partikel jika dari klik)
    useEffect(() => {
        if (applied.current === activeIndex) return;
        applied.current = activeIndex;
        apply(activeIndex, false);

        const li = liRefs.current[activeIndex];
        if (li) updateEffectPosition(li);
        popPill();

        if (burst.current && !cfg.current.reduce && filterRef.current) {
            filterRef.current
                .querySelectorAll(".particle")
                .forEach((p) => p.parentElement?.removeChild(p));
            makeParticles(filterRef.current);
        }
        burst.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    // Selama item aktif bergetar, lapisan efek ikut menyesuaikan bentuknya
    useEffect(() => {
        const li = liRefs.current[activeIndex];
        if (!li) return;
        const mv = mvFor(activeIndex);
        const follow = () => frame.postRender(() => updateEffectPosition(li));
        const stops = [
            mv.sx.on("change", follow),
            mv.sy.on("change", follow),
            mv.x.on("change", follow),
        ];
        return () => stops.forEach((stop) => stop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    // Bersihkan motion value saat unmount
    useEffect(
        () => () =>
            mvs.current.forEach((mv) => {
                mv.x.destroy();
                mv.sx.destroy();
                mv.sy.destroy();
            }),
        []
    );

    /* ---------------- interaksi ---------------- */

    const handleClick = (index: number) => {
        if (index === activeIndex) return;
        burst.current = true;
        setActiveIndex(index);
        onChange?.(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, i: number) => {
        const n = items.length;
        let next: number | null = null;
        if (e.key === "ArrowRight") next = (i + 1) % n;
        else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = n - 1;
        else if (e.key === " ") {
            e.preventDefault();
            e.currentTarget.click();
            return;
        }
        if (next === null) return;
        e.preventDefault();
        linkRefs.current[next]?.focus(); // fokus saja; Enter/klik yang berpindah halaman
    };

    return (
        <>
            {/* Semua selector di-scope ke `.gjn` supaya tidak bocor ke bagian situs lain */}
            <style dangerouslySetInnerHTML={{
                __html: `
          .gjn {
            --gjn-color-1: #c8102e;
            --gjn-color-2: #d4b463;
            --gjn-color-3: #ffffff;
            --gjn-color-4: #c9525f;
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 0.2px;
            text-transform: uppercase;
          }
          .gjn .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .gjn .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .gjn .effect.text.active {
            color: black;
          }
          .gjn .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .gjn .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: black;
          }
          .gjn .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .gjn .effect.filter.active::after {
            animation: gjn-pill 0.3s ease both;
          }
          @keyframes gjn-pill {
            to { transform: scale(1); opacity: 1; }
          }
          .gjn .particle,
          .gjn .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .gjn .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: gjn-particle calc(var(--time)) ease 1 -350ms;
          }
          .gjn .point {
            background: var(--color);
            opacity: 1;
            animation: gjn-point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes gjn-particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes gjn-point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% { transform: scale(calc(var(--scale) * 0.25)); }
            38% { opacity: 1; }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% { transform: scale(var(--scale)); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
          }
          .gjn li.active {
            color: black;
            text-shadow: none;
          }
          .gjn li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gjn li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          @media (prefers-reduced-motion: reduce) {
            .gjn .effect.filter.active::after { animation-duration: 0.001ms; }
          }
        ` }} />

            <div
                className={`gjn relative ${className}`.trim()}
                ref={containerRef}
            >
                <nav
                    aria-label={ariaLabel}
                    className="flex relative"
                    style={{ transform: "translate3d(0,0,0.01px)" }}
                >
                    <ul
                        ref={navRef}
                        className="flex gap-2 list-none p-0 px-2 m-0 relative z-[3]"
                        style={{
                            color: "white",
                            textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
                        }}
                    >
                        {items.map((item, index) => (
                            <JellyLi
                                key={item.href}
                                mv={mvFor(index)}
                                ref={(el) => {
                                    liRefs.current[index] = el;
                                }}
                                className={`rounded-full relative cursor-pointer text-white will-change-transform ${activeIndex === index ? "active" : ""
                                    }`}
                            >
                                <a
                                    ref={(el) => {
                                        linkRefs.current[index] = el;
                                    }}
                                    href={item.href}
                                    aria-current={activeIndex === index ? "location" : undefined}
                                    onClick={() => handleClick(index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="outline-none rounded-full focus-visible:ring-2 focus-visible:ring-focus py-[0.7em] px-[1.1em] inline-block whitespace-nowrap"
                                >
                                    {item.label}
                                </a>
                            </JellyLi>
                        ))}
                    </ul>
                </nav>
                <span className="effect filter" ref={filterRef} aria-hidden="true" />
                <span className="effect text" ref={textRef} aria-hidden="true" />
            </div>
        </>
    );
};

export default GooeyJellyNav;