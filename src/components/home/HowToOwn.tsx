"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Home, KeyRound } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Search & Explore",
    description: "Tell us what you are looking for and explore suitable properties at Wellsprings.",
  },
  {
    num: "02",
    icon: Home,
    title: "Choose Your Property",
    description: "Compare your options and select the home that feels right for you and your family.",
  },
  {
    num: "03",
    icon: KeyRound,
    title: "Move In & Enjoy",
    description: "Complete the process with confidence and settle into your new home at Wellsprings.",
  },
];

export function HowToOwn() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section className="border-y border-[#EDF3F8] bg-brand-blue-pale py-20 sm:py-28">
      <div ref={ref} className="container-site">
        <div className="mx-auto mb-9 max-w-[650px] text-center">
          <p className="eyebrow mb-2.5 text-brand-blue-deep">How it works</p>
          <h2 className="font-heading text-[clamp(34px,4.2vw,50px)] leading-[1.04] tracking-[-0.045em] text-navy">
            Finding Your Next Home Made Simple
          </h2>
        </div>

        <div className="grid gap-5.5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="relative flex items-center gap-5.5 rounded-[18px] border border-[#E1EAF2] bg-white p-7 shadow-[0_8px_25px_rgba(35,72,108,.05)]"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-[-27px] top-1/2 hidden w-[35px] border-t border-dashed border-[#AFC7DC] sm:block" />
              )}

              <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/25">
                <step.icon className="h-6 w-6" />
              </div>

              <div>
                <p className="mb-0.5 text-xs font-extrabold text-brand-blue-deep">{step.num}</p>
                <h3 className="mb-1 text-[15px] font-bold text-navy">{step.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
