"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { whyReasons } from "@/data/why";
import { Reveal } from "@/components/ui/Reveal";

function AnimatedReason({ reason, index }: { reason: (typeof whyReasons)[number]; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal key={reason.number} delay={index * 0.05} once={false}>
      <div
        className="group relative flex gap-5 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-brand-blue/20 hover:bg-brand-blue/[0.07]"
      >
        <span
          className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-brand-blue opacity-0 transition-all duration-300 group-hover:h-8 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="relative font-heading text-4xl leading-none">
          <span className="absolute inset-0 bg-gradient-to-r from-brand-blue via-terracotta to-gold bg-[length:200%_100%] bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
            {reason.number}
          </span>
          <motion.span
            className="text-brand-blue-light transition-opacity duration-300 group-hover:opacity-0"
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          >
            {reason.number}
          </motion.span>
        </span>
        <div>
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-blue">{reason.title}</h3>
          <p className="mt-2 leading-relaxed text-white/70">{reason.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Why() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trackRef, { amount: 0.3 });

  return (
    <section className="bg-navy py-24 sm:py-32">
      <div className="container-site">
        <Reveal once={false}>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-gold">Why Wellsprings</p>
            <h2 className="font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
              What makes this estate different
            </h2>
          </div>
        </Reveal>

        <div ref={trackRef} className="mt-8 mb-6 flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: whyReasons.length }).map((_, i) => (
            <motion.span
              key={i}
              className="h-[2px] flex-1 rounded-full bg-gold/25"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>

        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {whyReasons.map((reason, index) => (
            <AnimatedReason key={reason.number} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
