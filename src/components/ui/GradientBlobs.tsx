"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type BlobColor = "blue" | "terracotta" | "sage" | "gold";

const colorMap: Record<BlobColor, string> = {
  blue: "bg-brand-blue",
  terracotta: "bg-terracotta",
  sage: "bg-sage",
  gold: "bg-gold",
};

interface GradientBlobProps {
  color: BlobColor;
  size?: number;
  className?: string;
  delay?: number;
}

function GradientBlob({ color, size = 600, className = "", delay = 0 }: GradientBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-[0.06] ${colorMap[color]} ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.06 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}

interface GradientBlobsProps {
  blobs: Array<{
    color: BlobColor;
    size?: number;
    className?: string;
    delay?: number;
  }>;
}

export function GradientBlobs({ blobs }: GradientBlobsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {isInView &&
        blobs.map((blob, i) => (
          <GradientBlob key={i} {...blob} />
        ))}
    </div>
  );
}
