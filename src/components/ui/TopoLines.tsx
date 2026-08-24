"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TopoLinesProps {
  className?: string;
  variant?: "hero" | "siteplan" | "location" | "default";
}

const variantPaths: Record<string, string[]> = {
  hero: [
    "M0,200 Q200,100 400,180 T800,160 T1200,200 T1600,140",
    "M0,280 Q250,200 500,260 T900,240 T1300,280 T1600,220",
    "M0,360 Q180,300 380,340 T780,320 T1180,360 T1600,300",
    "M0,440 Q220,380 440,420 T840,400 T1240,440 T1600,380",
  ],
  siteplan: [
    "M0,150 Q300,80 600,130 T1200,110 T1600,150",
    "M0,250 Q250,190 500,230 T1000,210 T1600,250",
    "M0,350 Q200,300 400,330 T800,310 T1200,350 T1600,300",
  ],
  location: [
    "M0,120 Q400,60 800,100 T1600,80",
    "M0,220 Q350,160 700,200 T1400,180 T1600,200",
    "M0,320 Q300,270 600,300 T1200,280 T1600,310",
  ],
  default: [
    "M0,180 Q200,120 400,160 T800,140 T1200,180 T1600,130",
    "M0,300 Q250,240 500,280 T1000,260 T1600,290",
  ],
};

export function TopoLines({ className = "", variant = "default" }: TopoLinesProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const paths = variantPaths[variant] ?? variantPaths.default;

  return (
    <svg
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1600 500"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={1}
          className="text-brand-blue/[0.04]"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 2.5, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
