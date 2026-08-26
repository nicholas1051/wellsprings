"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/data/site";

export function Architecture() {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="bg-tint py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Architecture and Design"
            title="Designed for how people actually live"
            description={<>Every home is positioned to maximise natural light, cross-ventilation,<br />and access to outdoor space.</>}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 max-w-3xl">
            {reduceMotion ? (
              <>
                <p className="text-base leading-relaxed text-text-grey text-justify">
                  The architectural language at Wellsprings draws from Ibadan&rsquo;s tradition of
                  terracotta-roofed homes and adapts it for contemporary use. Clean lines, generous
                  window proportions, and durable material choices create homes that age well.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-grey text-justify">
                  Each unit type has been positioned within the masterplan for privacy, views, and
                  access to communal green spaces. The result is a neighbourhood where site planning
                  benefits every home, not just the ones on the best plots.
                </p>
              </>
            ) : (
              <>
                <motion.p
                  key={`blur-1-${cycle}`}
                  initial={{ opacity: 0.3, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-base leading-relaxed text-text-grey text-justify"
                >
                  The architectural language at Wellsprings draws from Ibadan&rsquo;s tradition of
                  terracotta-roofed homes and adapts it for contemporary use. Clean lines, generous
                  window proportions, and durable material choices create homes that age well.
                </motion.p>
                <motion.p
                  key={`blur-2-${cycle}`}
                  initial={{ opacity: 0.3, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="mt-4 text-base leading-relaxed text-text-grey text-justify"
                >
                  Each unit type has been positioned within the masterplan for privacy, views, and
                  access to communal green spaces. The result is a neighbourhood where site planning
                  benefits every home, not just the ones on the best plots.
                </motion.p>
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14">
            <p className="eyebrow mb-6 text-center text-brand-blue-deep">Design Partners</p>
            <div className="relative overflow-clip py-2">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-tint to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-tint to-transparent z-10" />
              <div className="flex w-max">
                <motion.div
                  className="flex items-center rounded-xl border border-grey-line bg-white overflow-clip"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    x: {
                      duration: 18,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }}
                >
                  {[...partners, ...partners].map((partner, i) => (
                    <div
                      key={`${partner.name}-${i}`}
                      className="flex shrink-0 items-center gap-4 border-r border-grey-line px-6 py-4 last:border-r-0"
                    >
                      <div className="flex h-[7.5rem] w-[7.5rem] shrink-0 items-center justify-center rounded-lg border border-grey-line bg-cream/60 overflow-clip p-2">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="whitespace-nowrap text-sm font-semibold text-navy">{partner.name}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  className="flex items-center rounded-xl border border-grey-line bg-white overflow-clip"
                  aria-hidden="true"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    x: {
                      duration: 18,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }}
                >
                  {[...partners, ...partners].map((partner, i) => (
                    <div
                      key={`dup-${partner.name}-${i}`}
                      className="flex shrink-0 items-center gap-4 border-r border-grey-line px-6 py-4 last:border-r-0"
                    >
                      <div className="flex h-[7.5rem] w-[7.5rem] shrink-0 items-center justify-center rounded-lg border border-grey-line bg-cream/60 overflow-clip p-2">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="whitespace-nowrap text-sm font-semibold text-navy">{partner.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-text-grey">
              Architectural design by Studio Stoone Designs. Structural engineering by KOA Consultants.
              Project management by African United Consultants. Urban planning by Place-Make.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
