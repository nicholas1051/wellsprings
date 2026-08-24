"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { masterPlanStats } from "@/data/site";

const hotspots = [
  { id: "gatehouse", x: "12%", y: "65%", label: "Gatehouse", description: "Secure manned entrance with 24/7 CCTV and access control" },
  { id: "community", x: "50%", y: "35%", label: "Community Centre", description: "Residents\u2019 gathering space for events and celebrations" },
  { id: "park-north", x: "35%", y: "18%", label: "Northern Green Belt", description: "Landscaped walking paths and mature trees" },
  { id: "park-south", x: "65%", y: "72%", label: "Southern Park", description: "Children\u2019s playground and open recreation area" },
  { id: "drainage", x: "80%", y: "45%", label: "Drainage Corridor", description: "Engineered water management system for flood resilience" },
  { id: "villa-zone", x: "25%", y: "48%", label: "Villa Zone", description: "Pearl, Emerald, and Aquamarine detached homes" },
  { id: "duplex-zone", x: "58%", y: "50%", label: "Duplex Zone", description: "Moonstone and Coral semi-detached and terrace homes" },
  { id: "apartment-zone", x: "75%", y: "28%", label: "Apartment Zone", description: "Opal garden apartments" },
];

function useCountUp(target: number, duration = 1.6, inView: boolean, reduceMotion: boolean) {
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion || !inView) {
      if (reduceMotion) setValue(target);
      return;
    }
    setValue(0);
    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      if (current !== start) {
        start = current;
        setValue(current);
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration, reduceMotion]);

  return value;
}

function StatsRow() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "-40px" });

  const reduced = !!reduceMotion;
  const acres = useCountUp(masterPlanStats.acres, 1.4, isInView, reduced);
  const hectaresRaw = Math.round(masterPlanStats.hectares * 10);
  const hectaresCount = useCountUp(hectaresRaw, 1.4, isInView, reduced);
  const maxUnits = useCountUp(masterPlanStats.maxUnits, 1.6, isInView, reduced);
  const maxResidents = useCountUp(masterPlanStats.maxResidents, 1.8, isInView, reduced);

  const items = [
    { value: acres, label: "acres", raw: masterPlanStats.acres },
    { value: (hectaresCount / 10).toFixed(1), label: "hectares", raw: masterPlanStats.hectares },
    { value: maxUnits, label: "max units", raw: masterPlanStats.maxUnits },
    { value: maxResidents.toLocaleString(), label: "residents", raw: masterPlanStats.maxResidents },
  ];

  return (
    <div ref={ref} className="border-t border-grey-line bg-cream px-6 py-5">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-8">
            {i > 0 && <div className="h-8 w-px bg-grey-line" aria-hidden="true" />}
            <div className="text-center">
              <motion.span
                className="text-2xl font-bold text-navy"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {reduceMotion ? item.raw : item.value}
              </motion.span>
              <span className="ml-1 text-sm text-text-grey">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SonarRings({ isActive }: { isActive: boolean }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-5 w-5 rounded-full border border-brand-blue/40"
          animate={
            isActive
              ? { scale: [1, 3], opacity: [0.6, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: isActive ? Infinity : 0,
            ease: "easeOut",
          }}
        />
      ))}
    </span>
  );
}

function Hotspot({
  spot,
  index,
  isInView,
  reduceMotion,
  active,
  onActivate,
  onDeactivate,
}: {
  spot: (typeof hotspots)[number];
  index: number;
  isInView: boolean;
  reduceMotion: boolean;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <div
      className="absolute"
      style={{ left: spot.x, top: spot.y }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 300, damping: 15 }}
      >
        <SonarRings isActive={active} />
        <motion.button
          type="button"
          className="relative z-10 h-5 w-5 rounded-full border-2 border-white bg-brand-blue shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-dark"
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          aria-label={`${spot.label}: ${spot.description}`}
        />
      </motion.div>

      {active && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 w-52 rounded-xl bg-navy px-4 py-3 text-sm text-white shadow-xl"
        >
          <p className="font-bold">{spot.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">{spot.description}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
        </motion.div>
      )}
    </div>
  );
}

export function SitePlan() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { amount: 0.3, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-off-white py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Master Plan"
            title="25 acres, planned as one community"
            description="Roads, parks, drainage corridors, and residential zones were all designed together."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-grey-line bg-white shadow-sm">
            <div ref={mapRef} className="relative overflow-hidden">
              <motion.div style={{ scale: reduceMotion ? undefined : imageScale }}>
                <div className="relative aspect-[16/10] bg-gradient-to-br from-sage/10 via-brand-blue/5 to-cream">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-heading text-8xl text-navy/5 select-none">MASTERPLAN</div>
                      <p className="text-sm text-text-grey/50">Hover hotspots to explore</p>
                    </div>
                  </div>

                  {hotspots.map((spot, index) => (
                    <Hotspot
                      key={spot.id}
                      spot={spot}
                      index={index}
                      isInView={isInView}
                      reduceMotion={!!reduceMotion}
                      active={activeHotspot === spot.id}
                      onActivate={() => setActiveHotspot(spot.id)}
                      onDeactivate={() => setActiveHotspot(null)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <StatsRow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
