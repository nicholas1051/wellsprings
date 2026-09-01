"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

export function PartnersSection({ partners }: { partners: string[] }) {
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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
        <p className="eyebrow mb-3 text-brand-blue-deep">Design & Build Partners</p>
        <InteractiveHeading
          text="People behind the build"
          accentWords={["People", "build"]}
          className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl"
        />
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-grey">
          {`Structure of the project team. Architecture by Studio Stoone Designs. Structural engineering by KOA Consultants. Project management by African United Consultants. Urban planning by Place-Make.`}
        </p>
      </Reveal>

      <div ref={ref} className="mt-12">
        {partners.map((name, i) => {
          const roles = [
            "Architecture",
            "Structural Engineering",
            "Project Management",
            "Urban Planning",
          ];
          return (
            <motion.div
              key={name}
              className="group relative flex items-center justify-between gap-6 border-b border-grey-line py-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <motion.span
                className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-brand-blue-deep transition-all duration-300 group-hover:h-3/5"
                aria-hidden="true"
              />
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold tracking-widest text-brand-blue-deep/40 transition-colors duration-300 group-hover:text-brand-blue-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy transition-colors duration-300 group-hover:text-brand-blue-deep">
                    {name}
                  </h3>
                  <p className="mt-0.5 text-sm text-text-grey">{roles[i] ?? "Partner"}</p>
                </div>
              </div>
              <motion.span
                className="text-brand-blue-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                whileHover={reduceMotion ? undefined : { x: 6 }}
              >
                →
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}