"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Users, Church, Trees, Home, Route, ShieldCheck, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: Building2,
    title: "115 new units",
    text: "Up to 115 new units of varying typologies across the estate.",
  },
  {
    icon: Users,
    title: "600 permanent residents",
    text: "Up to 600 permanent residents within a self-sustained community.",
  },
  {
    icon: Church,
    title: "Mixed use local centre",
    text: "A local centre containing a chapel, day care and community centre, and a convenience shop.",
  },
  {
    icon: Trees,
    title: "Public open space",
    text: "A variety of open spaces from a central park to landscape corridors.",
  },
  {
    icon: Home,
    title: "Home Zone areas",
    text: "Residential areas with pedestrian priority and shared surfaces.",
  },
  {
    icon: Route,
    title: "Street hierarchy",
    text: "A hierarchy of street types from a formal entry boulevard to mews-style streets.",
  },
  {
    icon: ShieldCheck,
    title: "Two security pavilions",
    text: "Security pavilions at the north and south entry for safe, gated living.",
  },
];

export function GeneralFeatures() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(0);
  const [inView, setInView] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        setInView(true);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 text-brand-blue-deep">General Features</p>
            <h2 className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Built around how the estate lives
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-text-grey">
            {`Every part of Wellsprings is planned to work together for a balanced, secure, and connected community. Hover or tap a feature to explore.`}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ul ref={listRef} className="mt-12 divide-y divide-grey-line">
          {features.map((f, i) => {
            const open = active === i;
            return (
              <motion.li
                key={f.title}
                className="group relative cursor-pointer"
                onMouseEnter={reduceMotion ? undefined : () => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div
                  className={`flex items-center gap-5 py-5 transition-all duration-300 sm:gap-8 sm:py-6 ${
                    open ? "pl-3 sm:pl-6" : "pl-0 sm:pl-3"
                  }`}
                >
                  <motion.span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-grey-line text-brand-blue-deep transition-colors duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue-light sm:h-12 sm:w-12"
                    animate={reduceMotion ? undefined : open ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </motion.span>

                  <span className="text-xs font-semibold tracking-widest text-brand-blue-deep/50 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={`flex-1 font-heading text-lg font-bold transition-colors duration-300 sm:text-xl ${
                      open ? "text-brand-blue-deep" : "text-navy group-hover:text-brand-blue-deep"
                    }`}
                  >
                    {f.title}
                  </h3>

                  <motion.span
                    className="hidden sm:block"
                    animate={reduceMotion ? undefined : open ? { rotate: 45, opacity: 1 } : { rotate: 0, opacity: 0.4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Plus className="h-5 w-5 text-brand-blue-deep" aria-hidden="true" />
                  </motion.span>
                </div>

                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="max-w-2xl pb-5 pl-[88px] sm:pl-[128px]">
                    <p className="leading-relaxed text-text-grey">{f.text}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-brand-blue"
                  initial={false}
                  animate={open ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}