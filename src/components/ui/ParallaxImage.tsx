"use client";

import type { ComponentProps } from "react";
import { EstateImage } from "@/components/ui/EstateImage";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = Omit<ComponentProps<typeof EstateImage>, "className"> & {
  className?: string;
  parallaxY?: number;
};

export function ParallaxImage({ className, parallaxY = 40, ...props }: ParallaxImageProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxY, -parallaxY]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        <EstateImage {...props} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        <EstateImage {...props} className="h-[120%] w-full object-cover -mt-[10%]" />
      </motion.div>
    </div>
  );
}
