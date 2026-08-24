"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

const checklist = [
  "Carefully selected property options",
  "Straightforward property search",
  "Helpful guidance from start to finish",
  "A brand built around trust and quality",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section className="pb-20 sm:pb-28">
      <div ref={ref} className="container-site grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow mb-2.5 text-brand-blue-deep">Why choose Wellsprings</p>
          <h2 className="font-heading text-[clamp(34px,4.2vw,50px)] leading-[1.04] tracking-[-0.045em] text-navy">
            More Than Just<br />a Property
          </h2>
          <p className="mb-5.5 mt-4.5 max-w-[520px] text-[15px] leading-relaxed text-muted">
            Wellsprings helps people find spaces where they can live well, feel
            comfortable and build their future with confidence.
          </p>

          <ul className="mb-7.5 grid gap-2.5">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[15px] font-semibold text-navy">
                <span className="grid h-[19px] w-[19px] place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-[11px] bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/27 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark"
          >
            Explore Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="overflow-hidden rounded-[25px] shadow-2xl"
        >
          <Image
            src="/images/stellavera-development.jpg"
            alt="Wellsprings Ibadan estate development by StellarVera"
            width={800}
            height={530}
            className="h-[360px] w-full object-cover sm:h-[530px]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
