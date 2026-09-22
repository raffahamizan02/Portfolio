"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
    words: string[];
    className?: string;
};

export default function Typewriter({ words, className = ""}: TypewriterProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    useEffect(() => {
        if (reduced || words.length === 0) return;

        const current = words[index % words.length];

        if (!deleting && subIndex === current.length) {
            const pause = setTimeout(() => setDeleting(true), 1300);
            return () => clearTimeout(pause);
        }

        if (deleting && subIndex === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % words.length);
            return;
        }

        const speed = deleting ? 35 : 70;
        const timeout = setTimeout(() => {
            setSubIndex((v) => v + (deleting ? -1 : 1));
        }, speed);
        return () => clearTimeout(timeout);
    }, [subIndex, deleting, index, words, reduced]);

    useEffect(() => {
        const blinkTimer = setInterval(() => setBlink((v) => !v), 500);
        return () => clearInterval(blinkTimer);
    }, []);

    const display = reduced ? words[0] ?? "" : (words[index % words.length] ?? "").slice(0, subIndex);

    return (
        <span className={className}>
            {display}
            <span 
                aria-hidden="true"
                className={`inline-block w-[2px] h-[0.95em] bg-current ml-0.5 align-middle ${
                    blink || reduced ? "opacity-100" : "opacity-0"
                }`}
            />
        </span>
    );
}