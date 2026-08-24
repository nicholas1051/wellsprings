"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  TrainFront,
  Building2,
  ShoppingBag,
  Plane,
  Store,
  Landmark,
  Briefcase,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { location } from "@/data/location";

const cx = 300;
const cy = 200;

const positions: Record<string, { x: number; y: number }> = {
  top: { x: 300, y: 48 },
  "upper-left": { x: 160, y: 95 },
  "upper-right": { x: 440, y: 95 },
  left: { x: 100, y: 165 },
  "left-lower": { x: 100, y: 255 },
  right: { x: 500, y: 165 },
  "right-upper": { x: 500, y: 255 },
  "lower-left": { x: 160, y: 335 },
  "lower-right": { x: 440, y: 335 },
};

const labelPositions: Record<string, { anchor: "start" | "middle" | "end"; dx: number; dy: number }> = {
  top: { anchor: "middle", dx: 0, dy: -12 },
  "upper-left": { anchor: "end", dx: -10, dy: -6 },
  "upper-right": { anchor: "start", dx: 10, dy: -6 },
  left: { anchor: "end", dx: -10, dy: -6 },
  "left-lower": { anchor: "end", dx: -10, dy: -6 },
  right: { anchor: "start", dx: 10, dy: -6 },
  "right-upper": { anchor: "start", dx: 10, dy: -6 },
  "lower-left": { anchor: "end", dx: -10, dy: 12 },
  "lower-right": { anchor: "start", dx: 10, dy: 12 },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  train: TrainFront,
  building: Building2,
  mall: ShoppingBag,
  airport: Plane,
  market: Store,
  business: Briefcase,
};

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  "#5A87A8": { bg: "bg-brand-blue/10", text: "text-brand-blue", label: "Transport & Business" },
  "#8BAF7E": { bg: "bg-sage/10", text: "text-sage", label: "Government & Shopping" },
  "#C47171": { bg: "bg-terracotta/10", text: "text-terracotta", label: "Market & Commerce" },
  "#D4856A": { bg: "bg-[#D4856A]/10", text: "text-[#D4856A]", label: "Rail Transport" },
  "#9B7DB8": { bg: "bg-[#9B7DB8]/10", text: "text-[#9B7DB8]", label: "Airport & Mall" },
};

function getLineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function SpokeDiagram() {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: false, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox="0 0 600 400"
        className="w-full"
        aria-label="Wellsprings Estate Location Map showing distances to nearby landmarks"
        suppressHydrationWarning
      >
        {/* Distance scale rings */}
        {[60, 120, 180].map((r, i) => (
          <motion.circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-grey-line)"
            strokeWidth={0.5}
            strokeDasharray="4 4"
            initial={reduced ? { r, opacity: 0.25 } : { r: 0, opacity: 0 }}
            animate={isInView ? { r, opacity: 0.25 } : reduced ? { r, opacity: 0.25 } : { r: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
        {[60, 120, 180].map((r, i) => (
          <motion.text
            key={`label-${r}`}
            x={cx + r + 4}
            y={cy - 4}
            className="text-[7px]"
            fill="var(--color-text-grey)"
            style={{ fontFamily: "var(--font-body)" }}
            initial={reduced ? { opacity: 0.4 } : { opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : reduced ? { opacity: 0.4 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 + 0.5 }}
          >
            {(i + 1) * 5}km
          </motion.text>
        ))}

        {/* Spoke lines */}
        {location.landmarks.map((lm, index) => {
          const to = positions[lm.position];
          const angle = Math.atan2(to.y - cy, to.x - cx);
          const startX = cx + 22 * Math.cos(angle);
          const startY = cy + 22 * Math.sin(angle);
          const len = getLineLength(startX, startY, to.x, to.y);
          const isActive = activeId === lm.name;
          const isDimmed = activeId !== null && !isActive;
          const delay = index * 0.08;

          return (
            <motion.line
              key={`line-${lm.name}`}
              x1={startX}
              y1={startY}
              x2={to.x}
              y2={to.y}
              stroke={lm.color}
              strokeWidth={isActive ? 2.5 : 1.5}
              className={!reduced && isInView ? "spoke-line-flow" : ""}
              initial={reduced ? { opacity: isDimmed ? 0.15 : 0.5, strokeDashoffset: 0 } : { opacity: 0, strokeDashoffset: len }}
              animate={
                isInView
                  ? { opacity: isDimmed ? 0.15 : 0.5, strokeDashoffset: 0 }
                  : reduced
                    ? { opacity: isDimmed ? 0.15 : 0.5, strokeDashoffset: 0 }
                    : { opacity: 0, strokeDashoffset: len }
              }
              transition={{ duration: 0.6, delay, ease: "easeOut" }}
              style={{ strokeDasharray: reduced ? undefined : len }}
            />
          );
        })}

        {/* Landmark dots + icons + labels */}
        {location.landmarks.map((lm, index) => {
          const to = positions[lm.position];
          const label = labelPositions[lm.position];
          const delay = index * 0.08;
          const isActive = activeId === lm.name;
          const isDimmed = activeId !== null && !isActive;
          const IconComp = iconMap[lm.icon] ?? MapPin;
          const iconOffset = -9;
          const iconY = label.dy < 0 ? label.dy - 22 : label.dy + 14;

          return (
            <g
              key={lm.name}
              onMouseEnter={() => setActiveId(lm.name)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(lm.name)}
              onBlur={() => setActiveId(null)}
              tabIndex={0}
              role="button"
              aria-label={`${lm.name}: ${lm.distance} away`}
              className="cursor-pointer outline-none"
            >
              {/* Icon badge */}
              <motion.g
                initial={reduced ? { opacity: isDimmed ? 0.2 : 1 } : { opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: isDimmed ? 0.2 : 1 }
                    : reduced
                      ? { opacity: isDimmed ? 0.2 : 1 }
                      : { opacity: 0 }
                }
                transition={{ duration: 0.4, delay: delay + 0.3 }}
              >
                <foreignObject
                  x={to.x + iconOffset}
                  y={to.y + iconY}
                  width={18}
                  height={18}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      backgroundColor: `${lm.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComp
                      className=""
                      style={{ width: 11, height: 11, color: lm.color }}
                    />
                  </div>
                </foreignObject>
              </motion.g>

              {/* Dot */}
              <motion.circle
                cx={to.x}
                cy={to.y}
                fill={lm.color}
                initial={reduced ? { r: isActive ? 7 : 5, opacity: isDimmed ? 0.3 : 1 } : { r: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { r: isActive ? 7 : 5, opacity: isDimmed ? 0.3 : 1 }
                    : reduced
                      ? { r: isActive ? 7 : 5, opacity: isDimmed ? 0.3 : 1 }
                      : { r: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, delay: delay + 0.2, type: "spring", stiffness: 300, damping: 15 }}
              />

              {/* Hover ring */}
              {isActive && (
                <motion.circle
                  cx={to.x}
                  cy={to.y}
                  r={7}
                  fill="none"
                  stroke={lm.color}
                  strokeWidth={2}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* Name */}
              <motion.text
                x={to.x + label.dx}
                y={to.y + label.dy}
                textAnchor={label.anchor}
                className="text-[8px] font-bold sm:text-[9px]"
                fill={isActive ? lm.color : "var(--color-navy)"}
                style={{ fontFamily: "var(--font-body)" }}
                initial={reduced ? { opacity: isDimmed ? 0.2 : 1 } : { opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: isDimmed ? 0.2 : 1 }
                    : reduced
                      ? { opacity: isDimmed ? 0.2 : 1 }
                      : { opacity: 0 }
                }
                transition={{ duration: 0.4, delay: delay + 0.35 }}
              >
                {lm.name}
              </motion.text>

              {/* Distance */}
              <motion.text
                x={to.x + label.dx}
                y={to.y + label.dy + 12}
                textAnchor={label.anchor}
                className="text-[8px] sm:text-[9px]"
                fill="var(--color-text-grey)"
                style={{ fontFamily: "var(--font-body)" }}
                initial={reduced ? { opacity: isDimmed ? 0.15 : 0.7 } : { opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: isDimmed ? 0.15 : 0.7 }
                    : reduced
                      ? { opacity: isDimmed ? 0.15 : 0.7 }
                      : { opacity: 0 }
                }
                transition={{ duration: 0.4, delay: delay + 0.45 }}
              >
                {lm.distance}
              </motion.text>
            </g>
          );
        })}

        {/* Center hub */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={22}
          fill="var(--color-brand-blue)"
          initial={reduced ? {} : { scale: 0 }}
          animate={isInView ? { scale: 1 } : reduced ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        />
        {/* Logo */}
        <foreignObject x={cx - 16} y={cy - 16} width={32} height={32}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Wellsprings"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
        </foreignObject>
        {/* Center pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={cx}
            cy={cy}
            r={22}
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth={1}
            initial={reduced ? {} : { r: 22, opacity: 0 }}
            animate={
              isInView
                ? { r: [22, 55], opacity: [0.4, 0] }
                : reduced
                  ? {}
                  : { r: 22, opacity: 0 }
            }
            transition={{ duration: 2.5, delay: i * 0.8, repeat: isInView ? Infinity : 0, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {activeId && (() => {
        const lm = location.landmarks.find((l) => l.name === activeId);
        if (!lm) return null;
        const to = positions[lm.position];
        const leftPct = (to.x / 600) * 100;
        const topPct = (to.y / 400) * 100;
        const IconComp = iconMap[lm.icon] ?? MapPin;
        const isRight = to.x > cx;
        const isBottom = to.y > cy;

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute z-20 w-48 rounded-xl bg-navy px-3 py-2.5 text-sm text-white shadow-xl"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: `translate(${isRight ? "12px" : "-110%"}, ${isBottom ? "12px" : "-110%"})`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: lm.color }} />
              <span className="font-bold text-xs leading-tight">{lm.name}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/70">
              <IconComp className="h-3 w-3 shrink-0" style={{ color: lm.color }} />
              <span>{lm.distance} from Wellsprings</span>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}

function Legend() {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  const uniqueColors = [...new Set(location.landmarks.map((lm) => lm.color))];

  return (
    <div ref={ref} className="mt-8 flex flex-wrap justify-center gap-4">
      {uniqueColors.map((color, i) => {
        const cat = categoryColors[color];
        const count = location.landmarks.filter((lm) => lm.color === color).length;
        if (!cat) return null;
        return (
          <motion.div
            key={color}
            className={`flex items-center gap-2 rounded-full ${cat.bg} px-3 py-1.5`}
            initial={reduced ? {} : { opacity: 0, scale: 0.8, y: 8 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : reduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 200 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className={`text-xs font-semibold ${cat.text}`}>{cat.label}</span>
            <span className={`text-[10px] ${cat.text} opacity-60`}>({count})</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function LocationSection() {
  return (
    <section className="bg-warm-white py-24 sm:py-32">
      <div className="container-site">
        <Reveal once={false}>
          <SectionHeading
            eyebrow="Location"
            title={location.heading}
            description={location.intro}
          />
        </Reveal>

        <Reveal delay={0.1} once={false}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-grey-line bg-white p-4 shadow-sm sm:p-8">
            <SpokeDiagram />
            <Legend />

            <div className="pointer-events-none absolute top-2 right-2 max-w-[200px] rounded-lg bg-off-white/80 p-3 text-[10px] leading-relaxed text-text-grey backdrop-blur-sm sm:top-4 sm:right-4 sm:max-w-[240px] sm:text-xs">
              Estimated distances from nearby points to Wellsprings.
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} once={false}>
          <div className="mt-10 rounded-2xl border border-grey-line bg-cream p-6">
            <h3 className="text-base font-bold text-navy sm:text-lg">{location.neighborhood.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-grey">{location.neighborhood.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
