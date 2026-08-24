"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Eye, BookOpen, CreditCard, FileCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Fill the enquiry form",
    description: "Available online, on-site, or at our office. This gives us the details we need about you and the house type you want.",
  },
  {
    num: "02",
    icon: Eye,
    title: "Arrange a site inspection",
    description: "Walk the estate before you commit to anything. Seeing it in person is part of the decision.",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Receive the estate by-laws",
    description: "Know exactly what community life at Wellsprings looks like, in writing, up front.",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "Select a payment method",
    description: "Choose the plan that fits, and commence payment on your schedule.",
  },
  {
    num: "05",
    icon: FileCheck,
    title: "Receive your land documents",
    description: "The final step — full documentation, in your name.",
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
            Five steps between you and a set of keys.
          </h2>
        </div>

        <div className="relative mx-auto max-w-[1000px]">
          {/* Timeline line */}
          <div className="absolute left-[31px] top-0 hidden h-full w-px bg-[#C4D5E4] sm:block" />

          <div className="grid gap-6 sm:gap-4">
            {steps.map((step, i) => (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex items-start gap-5 sm:pl-[72px]"
              >
                {/* Step number dot */}
                <div className="absolute left-0 top-1 z-10 grid h-[62px] w-[62px] place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/25">
                  <span className="font-heading text-[15px] font-extrabold">{step.num}</span>
                </div>

                <div className="flex-1 rounded-[16px] border border-[#E1EAF2] bg-white p-5 shadow-[0_6px_20px_rgba(35,72,108,.04)] sm:p-6">
                  <div className="mb-2 flex items-center gap-3">
                    <step.icon className="h-[18px] w-[18px] text-brand-blue" />
                    <h3 className="text-[15px] font-bold text-navy">{step.title}</h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted">{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
