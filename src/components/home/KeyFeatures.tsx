"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  Home as HomeIcon,
  Building,
} from "lucide-react";
import { features } from "@/data/features";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
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

const categories = [
  {
    id: "estate" as const,
    label: "Estate",
    subtitle: "Security, infrastructure & lasting value",
    color: "#699DD6",
    bg: "#EAF3FC",
    Icon: Building,
  },
  {
    id: "home" as const,
    label: "Home",
    subtitle: "Thoughtful design, comfort & convenience",
    color: "#55B878",
    bg: "#EAF8EF",
    Icon: HomeIcon,
  },
  {
    id: "community" as const,
    label: "Community",
    subtitle: "Green spaces, connection & shared experiences",
    color: "#8562D8",
    bg: "#F1ECFC",
    Icon: Users,
  },
];

export function KeyFeatures() {
  const [active, setActive] = useState<"estate" | "home" | "community">("estate");
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const nextCategory = useCallback(() => {
    if (hovered) return;
    setActive((prev) => {
      const order: Array<"estate" | "home" | "community"> = ["estate", "home", "community"];
      const idx = order.indexOf(prev);
      return order[(idx + 1) % 3];
    });
  }, [hovered]);

  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(nextCategory, 7000);
    return () => clearInterval(timer);
  }, [nextCategory, hovered]);

  const activeFeatures = features.filter((f) => f.category === active);
  const activeCat = categories.find((c) => c.id === active)!;

  return (
    <section className="py-14 sm:py-20">
      <div className="container-site">
        <div className="mb-6 text-center">
          <motion.span
            className="inline-block rounded-full bg-brand-blue-light px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-blue-dark"
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            The Wellsprings Experience
          </motion.span>
          <motion.h2
            className="mt-3 font-heading text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.055em] text-navy"
            initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            More Than Just a Place to <span className="text-brand-blue-dark">Live</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-[680px] text-center text-[15px] leading-[1.75] text-muted"
            initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We bring Estate, Home, and Community together to create a complete living experience — thoughtfully designed around the way you live.
          </motion.p>
        </div>

        {/* Hub — Desktop */}
        <div className="relative mx-auto mt-8 hidden h-[520px] max-w-[900px] lg:block">
          {/* Central image */}
          <div className="absolute left-1/2 top-1/2 z-10 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_25px_28px_rgba(35,72,108,.2)] transition-all duration-500">
            <img
              src="/images/wellsprings-circle.png"
              alt="Wellsprings estate"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          </div>

          {/* Orbit ring — above image, rotating around it */}
          <div
            className="absolute left-1/2 top-1/2 z-[11] h-[480px] w-[480px] rounded-full border-2 border-dashed border-[#AFCBE4]"
            style={{ animation: "orbitSpin 30s linear infinite", transform: "translate(-50%, -50%)" }}
          />

          {/* Category buttons — stacked on the right */}
          {categories.map((cat) => {
            const pos: Record<string, string> = {
              estate: "right-[30px] top-[140px]",
              home: "right-[30px] top-[220px]",
              community: "right-[30px] top-[300px]",
            };
            const widths: Record<string, string> = {
              estate: "w-[200px]",
              home: "w-[240px]",
              community: "w-[270px]",
            };
            return (
              <button
                key={cat.id}
                type="button"
                onMouseEnter={() => { setActive(cat.id); setHovered(true); }}
                onMouseLeave={() => setHovered(false)}
                className={cn(
                  "absolute z-20 flex items-center gap-2.5 rounded-full border border-white bg-white/94 px-3.5 py-2 shadow-[0_12px_36px_rgba(31,65,98,.13)] backdrop-blur-[14px] transition-all duration-300 hover:scale-105",
                  pos[cat.id],
                  widths[cat.id],
                )}
              >
                <span
                  className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full text-white"
                  style={{ background: cat.color }}
                >
                  <cat.Icon className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <strong className="block font-heading text-[14px] text-navy">{cat.label}</strong>
                  <small className="block text-[9px] text-muted">{cat.subtitle}</small>
                </span>
              </button>
            );
          })}

          {/* Feature panel — always on the left */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="absolute left-0 top-1/2 z-20 w-[280px] -translate-y-1/2 rounded-[18px] border border-[#DDE8F2] bg-white/95 p-4 shadow-[0_22px_65px_rgba(31,65,98,.13)] backdrop-blur-[18px] transition-all duration-300"
          >
            <div className="mb-1 flex items-center gap-2 border-b border-[#EDF2F7] pb-2.5">
              <span className="h-2 w-2 rounded-full" style={{ background: activeCat.color }} />
              <h3 className="font-heading text-[14px]">{activeCat.label} Features</h3>
              <span className="ml-auto text-[9px] font-bold text-[#98A5B3]">
                {String(activeFeatures.length).padStart(2, "0")} FEATURES
              </span>
            </div>
            <div className="grid gap-0">
              {activeFeatures.map((f) => {
                const IconComp = iconMap[f.id] ?? LayoutGrid;
                return (
                  <div key={f.id} className="grid grid-cols-[32px_1fr] gap-2 rounded-lg p-2 transition-colors hover:bg-[#F7FAFD]">
                    <span
                      className="grid h-[30px] w-[30px] place-items-center rounded-[9px]"
                      style={{ background: activeCat.bg, color: activeCat.color }}
                    >
                      <IconComp className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h4 className="mb-0.5 font-heading text-[11px]">{f.title}</h4>
                      <p className="text-[9px] leading-[1.4] text-muted">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="mx-auto mt-10 max-w-[390px] space-y-3.5 lg:hidden">
          <div className="space-y-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-full border border-white bg-white/94 px-[17px] py-[9px] shadow-[0_12px_36px_rgba(31,65,98,.13)] backdrop-blur-[14px] transition-all duration-300",
                  active === cat.id ? "scale-[1.01]" : "",
                )}
              >
                <span
                  className="grid h-[52px] w-[52px] place-items-center rounded-full text-white"
                  style={{ background: cat.color }}
                >
                  <cat.Icon className="h-6 w-6" />
                </span>
                <span className="text-left">
                  <strong className="block font-heading text-[16px] text-navy">{cat.label}</strong>
                  <small className="block text-[10px] text-muted">{cat.subtitle}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-[22px] border border-[#DDE8F2] bg-white/95 p-[19px] shadow-[0_22px_65px_rgba(31,65,98,.13)]">
            <div className="mb-1 flex items-center gap-2.5 border-b border-[#EDF2F7] pb-3">
              <span className="h-[9px] w-[9px] rounded-full" style={{ background: activeCat.color }} />
              <h3 className="font-heading text-[16px]">{activeCat.label} Features</h3>
              <span className="ml-auto text-[10px] font-bold text-[#98A5B3]">
                {String(activeFeatures.length).padStart(2, "0")} FEATURES
              </span>
            </div>
            <div className="grid gap-0.5">
              {activeFeatures.map((f) => {
                const IconComp = iconMap[f.id] ?? LayoutGrid;
                return (
                  <div key={f.id} className="grid grid-cols-[38px_1fr] gap-2.5 rounded-xl p-[11px_6px] transition-colors hover:bg-[#F7FAFD]">
                    <span
                      className="grid h-[36px] w-[36px] place-items-center rounded-[11px]"
                      style={{ background: activeCat.bg, color: activeCat.color }}
                    >
                      <IconComp className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="mb-0.5 font-heading text-[12px]">{f.title}</h4>
                      <p className="text-[10px] leading-[1.45] text-muted">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
