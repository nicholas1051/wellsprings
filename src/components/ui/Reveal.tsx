"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [needsAnimation, setNeedsAnimation] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setNeedsAnimation(false);
    }
  }, []);

  if (reduceMotion || !needsAnimation) {
    return <div ref={reduceMotion ? undefined : ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
