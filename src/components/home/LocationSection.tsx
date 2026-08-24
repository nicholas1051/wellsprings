"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { location, categoryColors, categoryLabels, type Landmark } from "@/data/location";
import { cn } from "@/lib/utils";

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
  const [selected, setSelected] = useState<Landmark | null>(null);
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
    setSelected(null);
  }, []);

  const isVisible = (lm: Landmark) => activeFilter === "all" || lm.category === activeFilter;
  const isLineVisible = (lm: Landmark) => activeFilter === "all" || lm.category === activeFilter;

  return (
    <section className="py-14 sm:py-20">
      <div className="container-site">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-brand-blue-light px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-blue-dark">
            Location Advantage
          </span>
          <h1 className="mt-3 font-heading text-[clamp(40px,5.2vw,68px)] leading-[1.02] tracking-[-0.06em] text-navy">
            Live Where Everything Is <span className="text-brand-blue-dark">Within Reach</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[670px] text-center text-[15px] leading-[1.75] text-muted">
            {location.intro}
          </p>
        </div>

        {/* Explorer shell */}
        <div className="relative mx-auto mt-14 min-h-[700px] w-full max-w-[1160px] overflow-hidden rounded-[30px] border border-[#DFE8F0] bg-white/88 shadow-[0_24px_70px_rgba(27,63,94,.12)]">
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
            <div className="flex items-center gap-2.5 text-[11px] text-[#778899]">
              <span className="h-2 w-2 rounded-full bg-[#65B47D] shadow-[0_0_0_5px_rgba(101,180,125,.11)]" />
              8 key destinations around Wellsprings
            </div>
            <div className="flex gap-1 rounded-full border border-[#DFE8F0] bg-white p-1 text-[10px] font-bold">
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
                    "absolute left-1/2 top-1/2 h-[1.5px] origin-[0_50%] transition-all duration-700",
                    isLineVisible(lm) ? "opacity-55" : "opacity-[0.08]",
                  )}
                  style={{
                    width: lineLengths[lm.id],
                    transform: `rotate(${lineAngles[lm.id]}) scaleX(${ready ? 1 : 0})`,
                    background: categoryColors[lm.category],
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
                className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,.18)]"
              />
              {/* Pulse ring */}
              <span className="pointer-events-none absolute inset-[-12px] rounded-full border border-[rgba(105,157,214,.35)]" style={{ animation: "pulse 3s infinite" }} />
            </div>

            {/* Location pins */}
            {location.landmarks.map((lm) => {
              const color = categoryColors[lm.category];
              const isActive = selected?.id === lm.id;
              const visible = isVisible(lm);
              return (
                <button
                  key={lm.id}
                  type="button"
                  onClick={() => setSelected(isActive ? null : lm)}
                  className={cn(
                    "absolute z-10 flex items-start gap-[9px] transition-all duration-300",
                    isActive ? "scale-105" : "hover:scale-105",
                    lm.id === "train1" || lm.id === "bodija" ? "left-1/2 -translate-x-1/2 flex-col items-center text-center" : "",
                    lm.id === "secretariat" || lm.id === "palms" || lm.id === "dugbe-business" ? "right-0 flex-row text-left" : "",
                    lm.id === "airport" || lm.id === "jericho" || lm.id === "dugbe-station" ? "left-0 flex-row-reverse text-right" : "",
                  )}
                  style={(() => {
                    const isTopBottom = lm.id === "train1" || lm.id === "bodija";
                    const raw = posClasses[lm.id] || "";
                    const topVal = raw.match(/top-\[([^\]]+)\]/)?.[1];
                    const leftVal = raw.match(/left-\[([^\]]+)\]/)?.[1];
                    return {
                      top: topVal,
                      left: isTopBottom ? "50%" : leftVal,
                      opacity: visible ? 1 : 0.16,
                      pointerEvents: visible ? ("auto" as const) : ("none" as const),
                      width: "190px",
                      justifyContent: isTopBottom ? "center" : lm.id === "airport" || lm.id === "jericho" || lm.id === "dugbe-station" ? "flex-end" : "flex-start",
                    } as React.CSSProperties;
                  })()}
                >
                  {/* Badge */}
                  {(lm.id === "train1" || lm.id === "bodija") && (
                    <span
                      className="grid h-[27px] w-[27px] place-items-center rounded-[8px] text-[12px]"
                      style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}
                    >
                      {lm.badge}
                    </span>
                  )}
                  {(lm.id === "airport" || lm.id === "jericho" || lm.id === "dugbe-station") && (
                    <span
                      className="order-[-1] grid h-[27px] w-[27px] place-items-center rounded-[8px] text-[12px]"
                      style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}
                    >
                      {lm.badge}
                    </span>
                  )}
                  {/* Pin + text */}
                  <div className={cn("flex items-start gap-[9px]", (lm.id === "train1" || lm.id === "bodija") && "flex-col items-center")}>
                    <span
                      className="mt-[3px] h-[13px] w-[13px] shrink-0 rounded-full transition-all duration-300"
                      style={{
                        background: color,
                        boxShadow: isActive ? `0 0 0 8px color-mix(in srgb, ${color} 14%, transparent)` : `0 0 0 5px color-mix(in srgb, ${color} 12%, transparent)`,
                        transform: isActive ? "scale(1.35)" : undefined,
                      }}
                    />
                    <span className="location-text">
                      <strong className="block font-heading text-[11px] leading-[1.25]">{lm.name}</strong>
                      <span className="mt-[3px] block text-[10px] text-[#9AA7B4]">{lm.distanceKm} km</span>
                    </span>
                  </div>
                  {/* Badge for side items */}
                  {(lm.id !== "train1" && lm.id !== "bodija") && (
                    <span
                      className="grid h-[27px] w-[27px] place-items-center rounded-[8px] text-[12px]"
                      style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color }}
                    >
                      {lm.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Detail card */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-5 top-[18px] z-30 w-[285px] rounded-[18px] border border-[#DFE8F0] bg-white/96 p-[17px] shadow-[0_18px_50px_rgba(30,68,102,.13)]"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="absolute right-[11px] top-[10px] grid h-6 w-6 place-items-center rounded-full bg-[#f1f5f8] text-[#7d8c9a]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-brand-blue-dark">
                    {categoryLabels[selected.category]}
                  </p>
                  <h3 className="mt-[5px] pr-7 font-heading text-[17px] font-extrabold">{selected.name}</h3>
                  <div className="mt-1 text-[11px] text-muted">{selected.distanceKm} km from Wellsprings</div>
                  <p className="mt-3 text-[11px] leading-[1.55] text-[#69798A]">{selected.description}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-[11px] bg-[#F7FAFD] p-[9px]">
                      <small className="block text-[8px] text-[#96A3AF]">DISTANCE</small>
                      <strong className="mt-[3px] block text-[10px]">{selected.distanceKm} km</strong>
                    </div>
                    <div className="rounded-[11px] bg-[#F7FAFD] p-[9px]">
                      <small className="block text-[8px] text-[#96A3AF]">TYPE</small>
                      <strong className="mt-[3px] block text-[10px]">{categoryLabels[selected.category]}</strong>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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

        {/* Insights strip */}
        <div className="mx-auto mt-[18px] grid max-w-[1160px] grid-cols-2 gap-2.5 sm:grid-cols-4">
          {location.insights.map((ins) => (
            <div key={ins.label} className="rounded-[14px] border border-[#DFE8F0] bg-white p-3.5">
              <small className="block text-[8px] uppercase tracking-[0.1em] text-[#9AA7B4]">{ins.label}</small>
              <strong className="mt-[5px] block font-heading text-[12px]">{ins.name}</strong>
              <span className="mt-[3px] block text-[9px] text-muted">{ins.detail}</span>
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
