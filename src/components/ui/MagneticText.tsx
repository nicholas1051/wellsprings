"use client";

import { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticTextProps {
  text: string;
  className?: string;
  strength?: number;
}

export function MagneticText({ text, className = "", strength = 6 }: MagneticTextProps) {
  const reduced = !!useReducedMotion();
  const containerRef = useRef<HTMLParagraphElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLParagraphElement>) => {
      if (reduced) return;
      const words = containerRef.current?.querySelectorAll<HTMLElement>("[data-mag]");
      if (!words) return;
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / 110) * (strength / 6);
        w.style.transform = `translate(${dx * pull * 0.45}px, ${dy * pull * 0.45}px)`;
      });
    },
    [reduced, strength],
  );

  const reset = useCallback(() => {
    if (reduced) return;
    containerRef.current?.querySelectorAll<HTMLElement>("[data-mag]").forEach((w) => {
      w.style.transform = "translate(0px, 0px)";
    });
  }, [reduced]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} onPointerMove={onPointerMove} onPointerLeave={reset} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          data-mag
          className="inline-block transition-transform duration-200 ease-out will-change-transform"
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}