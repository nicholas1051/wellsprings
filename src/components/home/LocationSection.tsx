"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ShoppingBag, Store } from "lucide-react";
import { location, categoryColors, categoryLabels, type Landmark as LandmarkType } from "@/data/location";
import { cn } from "@/lib/utils";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";
import { MagneticText } from "@/components/ui/MagneticText";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  landmark: Landmark,
  "shopping-bag": ShoppingBag,
  store: Store,
};

const posClasses: Record<string, string> = {
  train1: "left-1/2 top-[40px] -translate-x-1/2",
  secretariat: "left-[77%] top-[112px]",
  palms: "left-[81%] top-[248px]",
  "dugbe-business": "left-[77%] top-[435px]",
  bodija: "left-1/2 top-[505px] -translate-x-1/2",
  airport: "left-[6%] top-[435px]",
  jericho: "left-[5%] top-[248px]",
  "dugbe-station": "left-[6%] top-[112px]",
};

const lineAngles: Record<string, string> = {
  train1: "-90deg",
  secretariat: "-35deg",
  palms: "-9deg",
  "dugbe-business": "35deg",
  bodija: "90deg",
  airport: "145deg",
  jericho: "171deg",
  "dugbe-station": "215deg",
};

const lineLengths: Record<string, string> = {
  train1: "180px",
  secretariat: "290px",
  palms: "270px",
  "dugbe-business": "290px",
  bodija: "275px",
  airport: "290px",
  jericho: "285px",
  "dugbe-station": "290px",
};

export function LocationSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortByNearest, setSortByNearest] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const sortedLandmarks = useMemo(() => {
    const list = [...location.landmarks];
    if (sortByNearest) list.sort((a, b) => a.distanceKm - b.distanceKm);
    return list;
  }, [sortByNearest]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, []);

  const handleFilter = useCallback((cat: string) => {
    setActiveFilter(cat);
    setHoveredId(null);
  }, []);

  const isVisible = (lm: LandmarkType) => activeFilter === "all" || lm.category === activeFilter;

  return (
    <section className="py-14 sm:py-20">
      <style>{`
        .loc-flow{
          background-repeat:no-repeat;
          background-position:0 0;
          animation:loc-flow-anim 1.4s linear infinite;
        }
        @keyframes loc-flow-anim{
          from{ background-position-x:0px; }
          to{ background-position-x:14px; }
        }
      `}</style>
      <div className="container-site">
        <div className="mb-6 text-center">
          <motion.span
            className="inline-block rounded-full bg-brand-blue-light px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-[0.15em] text-brand-blue-dark"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Location Advantage
          </motion.span>
          <InteractiveHeading
            as="h1"
            text="Live Where Everything Is Within Reach"
            accentWords={["Within", "Reach"]}
            className="mt-3 font-heading text-[clamp(40px,5.2vw,68px)] leading-[1.02] tracking-[-0.06em] text-navy"
          />
          <motion.div
            className="mx-auto mt-4 max-w-[670px] text-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticText text={location.intro} className="text-[15px] leading-[1.75] text-muted" />
          </motion.div>
        </div>

        {/* Explorer shell */}
        <div className="relative mx-auto mt-14 w-full max-w-[1152px] overflow-visible">
          {/* ── Mobile: card list layout ── */}
          <div className="block lg:hidden">
            {/* Mobile topbar */}
            <div className="flex items-center justify-between rounded-t-[30px] border border-b-0 border-[#DFE8F0] bg-white/72 px-4 py-3 backdrop-blur-[15px]">
              <div className="flex items-center gap-2 text-[12px] text-[#778899]">
                <span className="h-2 w-2 rounded-full bg-[#65B47D]" />
                8 destinations
              </div>
              <div className="flex gap-1 rounded-full border border-[#DFE8F0] bg-white p-1 text-[12px] font-bold">
                <button type="button" onClick={() => setSortByNearest(false)} className={cn("rounded-full px-3 py-2.5 transition-all", !sortByNearest ? "bg-brand-blue-light text-brand-blue-dark" : "text-[#8190A0]")}>
                  All
                </button>
                <button type="button" onClick={() => setSortByNearest(true)} className={cn("rounded-full px-3 py-2.5 transition-all", sortByNearest ? "bg-brand-blue-light text-brand-blue-dark" : "text-[#8190A0]")}>
                  Nearest
                </button>
              </div>
            </div>

            {/* Mobile filter pills */}
            <div className="flex gap-1.5 overflow-x-auto border border-t-0 border-[#DFE8F0] bg-white/72 px-4 py-3 backdrop-blur-[15px] [&::-webkit-scrollbar]:hidden">
              <button type="button" onClick={() => handleFilter("all")} className={cn("shrink-0 rounded-full border px-3 py-2 text-[12px] font-bold transition-all", activeFilter === "all" ? "border-brand-blue bg-brand-blue-light text-brand-blue-dark" : "border-[#DFE8F0] bg-white text-[#718090]")}>
                All
              </button>
              {(["transport", "government", "shopping", "business", "commerce", "airport"] as const).map((cat) => (
                <button key={cat} type="button" onClick={() => handleFilter(cat)} className={cn("shrink-0 rounded-full border px-3 py-2 text-[12px] font-bold transition-all", activeFilter === cat ? "border-transparent text-white" : "border-[#DFE8F0] bg-white text-[#718090]")} style={activeFilter === cat ? { background: categoryColors[cat], borderColor: categoryColors[cat] } : undefined}>
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Mobile landmark cards */}
            <div className="max-h-[520px] space-y-2.5 overflow-y-auto rounded-b-[30px] border border-t-0 border-[#DFE8F0] bg-[#f9fbfd] p-3">
              <AnimatePresence mode="popLayout">
                {sortedLandmarks.filter(isVisible).map((lm) => {
                  const color = categoryColors[lm.category];
                  return (
                    <motion.div
                      key={lm.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-[#DFE8F0] bg-white p-3.5 shadow-[0_4px_16px_rgba(27,63,94,.06)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base" style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}>
                          {lm.icon && iconMap[lm.icon] ? (() => { const Icon = iconMap[lm.icon]; return <Icon className="h-5 w-5" />; })() : lm.badge}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-heading text-[14px] font-extrabold leading-tight text-navy">{lm.name}</h3>
                            <span className="shrink-0 rounded-full bg-brand-blue-light px-2 py-0.5 text-[12px] font-bold text-brand-blue-dark">{lm.distanceKm} km</span>
                          </div>
                           <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider" style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}>
                            {categoryLabels[lm.category]}
                          </span>
                          <p className="mt-2 text-[12px] leading-[1.55] text-muted">{lm.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Desktop: original map layout ── */}
          <div className="hidden lg:block overflow-hidden rounded-[30px] border border-[#DFE8F0] bg-white/88 shadow-[0_24px_70px_rgba(27,63,94,.12)]">
            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%,rgba(105,157,214,.11),transparent 26%),linear-gradient(90deg,rgba(105,157,214,.025) 1px,transparent 1px),linear-gradient(rgba(105,157,214,.025) 1px,transparent 1px)",
                backgroundSize: "auto,48px 48px,48px 48px",
              }}
            />

            {/* Topbar */}
            <div className="relative z-20 flex items-center justify-between border-b border-[rgba(223,232,240,.8)] bg-white/72 px-5 py-[18px] backdrop-blur-[15px]">
              <div className="flex items-center gap-2.5 text-[12px] text-[#778899]">
                <span className="h-2 w-2 rounded-full bg-[#65B47D] shadow-[0_0_0_5px_rgba(101,180,125,.11)]" />
                8 key destinations around Wellsprings
              </div>
              <div className="flex gap-1 rounded-full border border-[#DFE8F0] bg-white p-1 text-[12px] font-bold">
                <button
                  type="button"
                  onClick={() => setSortByNearest(false)}
                  className={cn("rounded-full px-3 py-[7px] transition-all", !sortByNearest ? "bg-brand-blue-light text-brand-blue-dark" : "text-[#8190A0]")}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSortByNearest(true)}
                  className={cn("rounded-full px-3 py-[7px] transition-all", sortByNearest ? "bg-brand-blue-light text-brand-blue-dark" : "text-[#8190A0]")}
                >
                  Nearest first
                </button>
              </div>
            </div>

            {/* Map area */}
            <div className={cn("relative h-[670px] transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}>
              {/* Concentric rings */}
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute left-1/2 top-1/2 h-[185px] w-[185px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(111,151,184,.18)]">
                  <span className="absolute right-[3px] top-[46%] rounded-[5px] bg-white/75 px-[5px] py-[3px] text-[9px] text-[#9BA9B7]">5 km</span>
                </div>
                <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(111,151,184,.18)]">
                  <span className="absolute right-[3px] top-[46%] rounded-[5px] bg-white/75 px-[5px] py-[3px] text-[9px] text-[#9BA9B7]">10 km</span>
                </div>
                <div className="absolute left-1/2 top-1/2 h-[570px] w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(111,151,184,.18)]">
                  <span className="absolute right-[3px] top-[46%] rounded-[5px] bg-white/75 px-[5px] py-[3px] text-[9px] text-[#9BA9B7]">15 km</span>
                </div>
              </div>

              {/* Connection lines */}
              <div className="pointer-events-none absolute inset-0 z-[2]">
                {sortedLandmarks.map((lm) => (
                  <div
                    key={lm.id}
                    className={cn(
                      "absolute left-1/2 top-1/2 h-[1.5px] origin-[0_50%] transition-all duration-700 loc-flow",
                      isVisible(lm) ? "opacity-55" : "opacity-[0.08]",
                    )}
                    style={{
                      width: lineLengths[lm.id],
                      transform: `rotate(${lineAngles[lm.id]}) scaleX(${ready ? 1 : 0})`,
                      backgroundImage: `repeating-linear-gradient(90deg, ${categoryColors[lm.category]} 0px, ${categoryColors[lm.category]} 8px, transparent 8px, transparent 14px)`,
                    }}
                  />
                ))}
              </div>

              {/* Center point */}
              <div className="absolute left-1/2 top-1/2 z-[8] grid h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[8px] border-white bg-gradient-to-br from-[#6fa6df] to-[#568bc4] shadow-[0_0_0_2px_rgba(105,157,214,.28),0_15px_35px_rgba(50,96,139,.22)]">
                <Image
                  src="/wellsprings-logo.png"
                  alt="Wellsprings"
                  width={80}
                  height={80}
                  className="animate-spin object-contain brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,.18)] [animation-duration:20s]"
                />
                {/* Pulse ring */}
                <span className="pointer-events-none absolute inset-[-12px] rounded-full border border-[rgba(105,157,214,.35)]" style={{ animation: "pulse 3s infinite" }} />
              </div>

              {/* Location pins */}
              {sortedLandmarks.map((lm) => {
                const color = categoryColors[lm.category];
                const isHovered = hoveredId === lm.id;
                const visible = isVisible(lm);
                const isTopBottom = lm.id === "train1" || lm.id === "bodija";
                const isBelow = lm.id === "train1";
                const isRight = lm.id === "secretariat" || lm.id === "palms" || lm.id === "dugbe-business";
                const isLeft = lm.id === "airport" || lm.id === "jericho" || lm.id === "dugbe-station";
                const raw = posClasses[lm.id] || "";
                const topVal = raw.match(/top-\[([^\]]+)\]/)?.[1];
                const leftVal = raw.match(/left-\[([^\]]+)\]/)?.[1];

                return (
                  <div
                    key={lm.id}
                    className="absolute z-10"
                    onMouseEnter={() => visible && setHoveredId(lm.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      top: topVal,
                      left: isTopBottom ? "50%" : leftVal,
                      transform: isTopBottom ? "translateX(-50%)" : undefined,
                      opacity: visible ? 1 : 0.16,
                      pointerEvents: visible ? ("auto" as const) : ("none" as const),
                    }}
                  >
                    {/* Hover popup card */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "absolute z-40 w-[255px] rounded-[16px] border border-[#DFE8F0] bg-white/97 p-[15px] shadow-[0_14px_44px_rgba(30,68,102,.14)] backdrop-blur-sm",
                            isTopBottom ? "left-1/2 -translate-x-1/2" : isRight ? "right-full mr-3" : "left-full ml-3",
                            isTopBottom ? (isBelow ? "top-full mt-3" : "bottom-full mb-3") : "top-1/2 -translate-y-1/2",
                          )}
                        >
                          <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-brand-blue-dark">
                            {categoryLabels[lm.category]}
                          </p>
                          <h3 className="mt-[4px] font-heading text-[15px] font-extrabold leading-tight">{lm.name}</h3>
                          <div className="mt-1 text-[12px] text-muted">{lm.distanceKm} km from Wellsprings</div>
                          <p className="mt-2 text-[12px] leading-[1.5] text-[#69798A]">{lm.description}</p>
                          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                            <div className="rounded-[9px] bg-brand-blue p-[7px]">
                              <small className="block text-[8px] text-white/75">DISTANCE</small>
                              <strong className="mt-[2px] block text-[12px] text-white">{lm.distanceKm} km</strong>
                            </div>
                            <div className="rounded-[9px] bg-brand-blue p-[7px]">
                              <small className="block text-[8px] text-white/75">TYPE</small>
                              <strong className="mt-[2px] block text-[12px] text-white">{categoryLabels[lm.category]}</strong>
                            </div>
                          </div>
                          {isTopBottom && (
                            <div className={cn("absolute left-1/2 -translate-x-1/2 h-0 w-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent", isBelow ? "bottom-full border-b-[7px] border-b-white" : "top-full border-t-[7px] border-t-white")} />
                          )}
                          {isRight && (
                            <div className="absolute right-full top-1/2 -translate-y-1/2 h-0 w-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[7px] border-r-white" />
                          )}
                          {isLeft && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 h-0 w-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[7px] border-l-white" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pin content */}
                    <div
                      className={cn(
                        "flex items-start gap-[8px] transition-all duration-200",
                        isHovered && "scale-105",
                        isTopBottom ? "flex-col items-center text-center" : "",
                        isRight ? "flex-row text-left" : "",
                        isLeft ? "flex-row-reverse text-right" : "",
                      )}
                      style={{ width: "190px", justifyContent: isTopBottom ? "center" : isLeft ? "flex-end" : "flex-start" }}
                    >
                      <span
                        className={cn(
                          "grid h-[27px] w-[27px] shrink-0 place-items-center rounded-[8px] text-[12px]",
                          isLeft && "order-[-1]",
                        )}
                        style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}
                      >
                        {lm.icon && iconMap[lm.icon] ? (() => { const Icon = iconMap[lm.icon]; return <Icon className="h-3.5 w-3.5" />; })() : lm.badge}
                      </span>
                      <div className={cn("flex items-start gap-[8px]", isTopBottom && "flex-col items-center")}>
                        <span
                          className="mt-[3px] h-[13px] w-[13px] shrink-0 rounded-full transition-all duration-300"
                          style={{
                            background: color,
                            boxShadow: isHovered ? `0 0 0 8px color-mix(in srgb, ${color} 14%, transparent)` : `0 0 0 5px color-mix(in srgb, ${color} 12%, transparent)`,
                            transform: isHovered ? "scale(1.35)" : undefined,
                          }}
                        />
                        <span className="location-text">
                          <strong className="block font-heading text-[12px] leading-[1.25]">{lm.name}</strong>
                          <span className="mt-[3px] block text-[12px] text-[#9AA7B4]">{lm.distanceKm} km</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Filter buttons */}
              <div className="absolute bottom-[-52px] left-1/2 z-25 flex w-[calc(100%-40px)] -translate-x-1/2 flex-wrap justify-center gap-[6px]">
                <FilterBtn active={activeFilter === "all"} color="#699DD6" onClick={() => handleFilter("all")}>
                  All locations
                </FilterBtn>
                {(["transport", "government", "shopping", "business", "commerce", "airport"] as const).map((cat) => (
                  <FilterBtn key={cat} active={activeFilter === cat} color={categoryColors[cat]} onClick={() => handleFilter(cat)}>
                    <span className="mr-1.5 inline-block h-[6px] w-[6px] rounded-full" style={{ background: categoryColors[cat] }} />
                    {categoryLabels[cat]}
                  </FilterBtn>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insights strip */}
        <div className="mx-auto mt-[18px] grid max-w-[1152px] grid-cols-2 gap-2.5 sm:grid-cols-4">
          {location.insights.map((ins) => (
            <div key={ins.label} className="rounded-[14px] border border-[#DFE8F0] bg-white p-3.5">
              <small className="block text-[12px] uppercase tracking-[0.1em] text-[#9AA7B4]">{ins.label}</small>
              <strong className="mt-[5px] block font-heading text-[13px]">{ins.name}</strong>
              <span className="mt-[3px] block text-[12px] text-muted">{ins.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterBtn({ active, color, onClick, children }: { active: boolean; color: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-[11px] py-[7px] text-[9px] font-bold shadow-[0_6px_18px_rgba(31,65,98,.06)] transition-all",
        active
          ? "border-transparent"
          : "border-[rgba(223,232,240,.95)] bg-white/92 text-[#718090]",
      )}
      style={active ? { color, background: `color-mix(in srgb, ${color} 9%, white)`, borderColor: `color-mix(in srgb, ${color} 25%, white)` } : undefined}
    >
      {children}
    </button>
  );
}
