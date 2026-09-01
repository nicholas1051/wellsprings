"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CompanyStory() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue-deep">About StellarVera</p>
        <h2 className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl">
          {`StellarVera Development Company Limited ("SDCL")`}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="font-heading text-lg leading-relaxed text-navy">
              <span className="float-left mr-3 mt-1 font-heading text-7xl font-bold leading-[0.7] text-brand-blue-deep">
                A
              </span>
              {` property development company with expertise in design, build and management of various developments including residential and commercial. We conceive projects, explore their feasibility and execute them with excellence.`}
            </p>

            <div className="relative mt-10 border-l-4 border-brand-blue pl-6 sm:pl-8">
              <p className="eyebrow mb-2 text-brand-blue-deep">Quality Assurance</p>
              <p className="leading-relaxed text-text-grey">
                {`Our service offering is built on delivering quality services, within an agreed timeframe and at an affordable cost. We aspire to be the leader in the property development space.`}
              </p>
              <p className="mt-4 leading-relaxed text-text-grey">
                {`SDCL brings together proven expertise to design and develop world-class homes. Over the years we have built a solid network with leading development and engineering companies as well as other service-providers across the world to ensure that the homes we build are of high standards.`}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <motion.div
              className="group"
              whileHover={reduceMotion ? undefined : { x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4 border-t border-grey-line pt-6">
                <motion.span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep"
                  whileHover={reduceMotion ? undefined : { rotate: 12, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="text-lg font-bold text-navy">Vision</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-grey group-hover:text-navy-soft transition-colors">
                    {`To be the leading Property and Infrastructure Development Company of choice in the provision of desired products and services in Africa.`}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              whileHover={reduceMotion ? undefined : { x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4 border-t border-grey-line pt-6">
                <motion.span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep"
                  whileHover={reduceMotion ? undefined : { rotate: -12, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="text-lg font-bold text-navy">Core Value</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-grey group-hover:text-navy-soft transition-colors">
                    To consistently deliver world-class architectural solutions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}