"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, ShieldCheck, Headphones, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verified Properties",
    description: "Quality listings carefully reviewed for greater peace of mind.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Transparent processes designed to protect every transaction.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Helpful guidance whenever you need it throughout your journey.",
  },
  {
    icon: Sparkles,
    title: "Quality First",
    description: "Properties selected with comfort, value and long-term living in mind.",
  },
];

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section className="py-8 sm:py-12">
      <div ref={ref} className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => (
          <motion.article
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="flex gap-3.5 rounded-[18px] border border-grey-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#CFDFEC]"
          >
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[13px] bg-gradient-to-br from-brand-blue-light to-cream text-brand-blue-deep">
              <benefit.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold tracking-tight text-navy">{benefit.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{benefit.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
