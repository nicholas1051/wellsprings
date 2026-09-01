"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, decimals = 0, prefix = "", duration = 1600, className }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = !!reduceMotion;

    const run = () => {
      if (reduced) {
        setDisplay(value);
        return;
      }
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      const startTime = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * value));
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 60 && rect.bottom > 0;
      if (inView) {
        run();
      } else if (!reduced) {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        setDisplay(0);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, reduceMotion]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : display.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
    </span>
  );
}