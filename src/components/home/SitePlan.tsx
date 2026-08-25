"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { masterPlanStats } from "@/data/site";

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

export function SitePlan() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);

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
                <div className="relative aspect-[16/10]">
                  <img
                    src="/images/masterplan.jpg"
                    alt="Wellsprings master plan layout"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
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
