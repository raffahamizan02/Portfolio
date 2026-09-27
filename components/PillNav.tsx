"use client";

import React, {
    useEffect,
    useRef,
    type CSSProperties,
} from "react";
import { gsap } from "gsap";

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
    items,
    activeHref,
    className = "",
    ease = "power3.easeOut",
    baseColor = "var(--bg)",
    pillColor = "var(--ink)",
    hoveredPillTextColor = "var(--ink)",
    pillTextColor = "var(--bg)",
    initialLoadAnimation = true,
}) => {
    const circleRefs =
        useRef<Array<HTMLSpanElement | null>>([]);

    const timelineRefs =
        useRef<Array<gsap.core.Timeline | null>>([]);

    const activeTweenRefs =
        useRef<Array<gsap.core.Tween | null>>([]);

    const navItemsRef =
        useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle) => {
                if (!circle?.parentElement) return;

                const pill =
                    circle.parentElement as HTMLElement;

                const rect =
                    pill.getBoundingClientRect();

                const w = rect.width;
                const h = rect.height;

                if (!w || !h) return;

                const R =
                    ((w * w) / 4 + h * h) /
                    (2 * h);

                const D =
                    Math.ceil(2 * R) + 2;

                const delta =
                    Math.ceil(
                        R -
                        Math.sqrt(
                            Math.max(
                                0,
                                R * R -
                                (w * w) / 4
                            )
                        )
                    ) + 1;

                const originY =
                    D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin:
                        `50% ${originY}px`,
                });

                const label =
                    pill.querySelector<HTMLElement>(
                        ".pill-label"
                    );

                const hoverLabel =
                    pill.querySelector<HTMLElement>(
                        ".pill-label-hover"
                    );

                if (label) {
                    gsap.set(label, {
                        y: 0,
                    });
                }

                if (hoverLabel) {
                    gsap.set(hoverLabel, {
                        y: h + 100,
                        opacity: 0,
                    });
                }

                const index =
                    circleRefs.current.indexOf(
                        circle
                    );

                if (index === -1) return;

                timelineRefs.current[
                    index
                ]?.kill();

                const timeline =
                    gsap.timeline({
                        paused: true,
                    });

                timeline.to(
                    circle,
                    {
                        scale: 1.2,
                        xPercent: -50,
                        duration: 2,
                        ease,
                        overwrite: "auto",
                    },
                    0
                );

                if (label) {
                    timeline.to(
                        label,
                        {
                            y: -(h + 8),
                            duration: 2,
                            ease,
                            overwrite: "auto",
                        },
                        0
                    );
                }

                if (hoverLabel) {
                    timeline.to(
                        hoverLabel,
                        {
                            y: 0,
                            opacity: 1,
                            duration: 2,
                            ease,
                            overwrite: "auto",
                        },
                        0
                    );
                }

                timelineRefs.current[
                    index
                ] = timeline;
            });
        };

        layout();

        const resizeHandler = () => {
            layout();
        };

        window.addEventListener(
            "resize",
            resizeHandler
        );

        if (document.fonts) {
            document.fonts.ready
                .then(layout)
                .catch(() => { });
        }

        if (initialLoadAnimation) {
            const navItems =
                navItemsRef.current;

            if (navItems) {
                gsap.set(navItems, {
                    opacity: 0,
                    y: -10,
                });

                gsap.to(navItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease,
                });
            }
        }

        return () => {
            window.removeEventListener(
                "resize",
                resizeHandler
            );

            timelineRefs.current.forEach(
                (timeline) =>
                    timeline?.kill()
            );

            activeTweenRefs.current.forEach(
                (tween) => tween?.kill()
            );
        };
    }, [
        items,
        ease,
        initialLoadAnimation,
    ]);

    const handleEnter = (
        index: number
    ) => {
        const timeline =
            timelineRefs.current[index];

        if (!timeline) return;

        activeTweenRefs.current[
            index
        ]?.kill();

        activeTweenRefs.current[
            index
        ] = timeline.tweenTo(
            timeline.duration(),
            {
                duration: 0.3,
                ease,
                overwrite: "auto",
            }
        );
    };

    const handleLeave = (
        index: number
    ) => {
        const timeline =
            timelineRefs.current[index];

        if (!timeline) return;

        activeTweenRefs.current[
            index
        ]?.kill();

        activeTweenRefs.current[
            index
        ] = timeline.tweenTo(
            0,
            {
                duration: 0.2,
                ease,
                overwrite: "auto",
            }
        );
    };

    const cssVars = {
        "--base": baseColor,
        "--pill-bg": pillColor,
        "--hover-text":
            hoveredPillTextColor,
        "--pill-text":
            pillTextColor,
        "--nav-h": "42px",
        "--pill-pad-x": "18px",
        "--pill-gap": "3px",
    } as CSSProperties;

    return (
        <nav
            className={`relative flex items-center ${className}`.trim()}
            aria-label="Primary"
            style={cssVars}
        >
            <div
                ref={navItemsRef}
                className="relative flex items-center rounded-full"
                style={{
                    height: "var(--nav-h)",
                }}
            >
                <ul
                    role="menubar"
                    className="list-none flex items-stretch m-0 p-[3px] h-full rounded-full"
                    style={{
                        gap: "var(--pill-gap)",
                        background:
                            "var(--pill-bg)",
                    }}
                >
                    {items.map(
                        (item, index) => {
                            const isActive =
                                activeHref ===
                                item.href;

                            const pillStyle: CSSProperties =
                            {
                                color:
                                    "var(--pill-text)",
                                paddingLeft:
                                    "var(--pill-pad-x)",
                                paddingRight:
                                    "var(--pill-pad-x)",
                            };

                            const content = (
                                <>
                                    <span
                                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                        style={{
                                            background:
                                                "var(--base)",
                                            willChange:
                                                "transform",
                                        }}
                                        aria-hidden="true"
                                        ref={(element) => {
                                            circleRefs.current[
                                                index
                                            ] = element;
                                        }}
                                    />

                                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                                        <span
                                            className="pill-label relative z-[2] inline-block leading-[1]"
                                            style={{
                                                willChange:
                                                    "transform",
                                            }}
                                        >
                                            {item.label}
                                        </span>

                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{
                                                color:
                                                    "var(--hover-text)",
                                                willChange:
                                                    "transform, opacity",
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.label}
                                        </span>
                                    </span>

                                    {isActive && (
                                        <span
                                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                                            style={{
                                                background:
                                                    "var(--base)",
                                            }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </>
                            );

                            return (
                                <li
                                    key={item.href}
                                    role="none"
                                    className="flex h-full"
                                >
                                    <a
                                        href={item.href}
                                        role="menuitem"
                                        aria-label={
                                            item.ariaLabel ??
                                            item.label
                                        }
                                        className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[0.78rem] leading-none uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0"
                                        style={pillStyle}
                                        onMouseEnter={() =>
                                            handleEnter(index)
                                        }
                                        onMouseLeave={() =>
                                            handleLeave(index)
                                        }
                                    >
                                        {content}
                                    </a>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default PillNav;