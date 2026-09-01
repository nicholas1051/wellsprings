"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface InteractiveHeadingProps {
  text: string;
  className?: string;
  accentWords?: string[];
  as?: "h1" | "h2" | "h3";
}

export function InteractiveHeading({ text, className = "", accentWords = [], as = "h2" }: InteractiveHeadingProps) {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setInView(rect.top < window.innerHeight - 60 && rect.bottom > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    },
    [reduced],
  );

  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {words.map((w, i) => (
          <span
            key={i}
            className={accentWords.includes(w.replace(/[^a-zA-Z]/g, "")) ? "text-brand-blue-deep" : undefined}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative ${className}`}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--spot-x) var(--spot-y), rgba(55,106,159,.18), transparent 65%)",
        }}
      />
      {words.map((w, i) => {
        const accent = accentWords.includes(w.replace(/[^a-zA-Z]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden align-top">
            <motion.span
              className={`inline-block ${accent ? "text-brand-blue-deep" : ""}`}
              initial={{ y: "112%" }}
              animate={inView ? { y: "0%" } : { y: "112%" }}
              transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.03 * i }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}