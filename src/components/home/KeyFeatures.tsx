"use client";

import { useState, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Droplets,
  Waves,
  Route,
  Trees,
  Users,
  Baby,
  CookingPot,
  Car,
  BedDouble,
  Sun,
  LayoutGrid,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { features } from "@/data/features";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  "gated-security": ShieldCheck,
  "borehole-water": Droplets,
  "underground-drainage": Waves,
  "paved-roads": Route,
  landscaping: Trees,
  "community-centre": Users,
  "children-playground": Baby,
  "modern-kitchen": CookingPot,
  parking: Car,
  "ensuite-bedrooms": BedDouble,
  "solar-readiness": Sun,
  "tiled-compound": LayoutGrid,
};

const categoryColors: Record<string, { bg: string; text: string; dot: string; glow: string; border: string }> = {
  estate: { bg: "bg-brand-blue/10", text: "text-brand-blue", dot: "bg-brand-blue", glow: "rgba(90,135,168,0.3)", border: "border-brand-blue/40" },
  home: { bg: "bg-terracotta/10", text: "text-terracotta", dot: "bg-terracotta", glow: "rgba(196,113,74,0.3)", border: "border-terracotta/40" },
  community: { bg: "bg-sage/10", text: "text-sage", dot: "bg-sage", glow: "rgba(139,175,126,0.3)", border: "border-sage/40" },
};

const bentoLayout: { id: string; colSpan: string; rowSpan: string }[] = [
  { id: "gated-security", colSpan: "col-span-2", rowSpan: "row-span-1" },
  { id: "underground-drainage", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { id: "borehole-water", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "paved-roads", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "modern-kitchen", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "ensuite-bedrooms", colSpan: "col-span-2", rowSpan: "row-span-1" },
  { id: "parking", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "solar-readiness", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "tiled-compound", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "landscaping", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { id: "community-centre", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: "children-playground", colSpan: "col-span-1", rowSpan: "row-span-1" },
];

function BentoCard({
  feature,
  layout,
  index,
}: {
  feature: (typeof features)[number];
  layout: (typeof bentoLayout)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const Icon = iconMap[feature.id] ?? LayoutGrid;
  const colors = categoryColors[feature.category];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <Reveal key={feature.id} delay={(index % 6) * 0.05}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full rounded-2xl border bg-white p-6 transition-shadow duration-300 ${layout.colSpan} ${layout.rowSpan} ${
          hovered ? `${colors.border} shadow-lg` : "border-grey-line hover:shadow-md"
        }`}
        style={{
          perspective: "800px",
          boxShadow: hovered ? `0 8px 30px ${colors.glow}` : undefined,
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
          <span className={`text-[11px] font-semibold uppercase tracking-wide ${colors.text}`}>
            {feature.category}
          </span>
        </div>

        <span
          className={`grid h-12 w-12 place-items-center rounded-xl transition-all duration-300 ${
            hovered ? "scale-110" : ""
          }`}
          style={{ backgroundColor: hovered ? colors.glow.replace("0.3", "1") : undefined }}
        >
          <Icon
            className={`h-6 w-6 transition-colors duration-300 ${hovered ? "text-white" : colors.text}`}
            aria-hidden="true"
          />
        </span>

        <h3 className="mt-4 text-lg font-bold text-navy transition-colors duration-300 group-hover:text-terracotta">
          {feature.title}
        </h3>

        <div className="mt-2 relative">
          <motion.p
            className="text-sm leading-relaxed text-text-grey"
            animate={{ height: hovered ? "auto" : "2.5rem" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {feature.description}
          </motion.p>
          {!hovered && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

export function KeyFeatures() {
  const featureMap = new Map(features.map((f) => [f.id, f]));

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Estate Features"
            title="What comes with every home"
            description="Every unit at Wellsprings includes access to the estate\u2019s shared infrastructure and amenities."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,auto)]">
          {bentoLayout.map((item, index) => {
            const feature = featureMap.get(item.id);
            if (!feature) return null;
            return <BentoCard key={feature.id} feature={feature} layout={item} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
}
