"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface SectionColorShiftProps {
  children: ReactNode;
  className?: string;
}

export function SectionColorShift({ children, className }: SectionColorShiftProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0.85 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 40%",
          scrub: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
