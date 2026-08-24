"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { MessageCircle, MapPin, FileText, CreditCard, Key } from "lucide-react";
import { howToOwnSteps } from "@/data/why";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  message: MessageCircle,
  "map-pin": MapPin,
  "file-text": FileText,
  "credit-card": CreditCard,
  key: Key,
};

function StepNode({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof howToOwnSteps)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "-40px" });
  const Icon = iconMap[step.icon] ?? MessageCircle;

  return (
    <div ref={ref} className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-blue bg-white sm:h-16 sm:w-16">
      <motion.div
        initial={reduceMotion ? {} : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300, damping: 15 }}
        className="flex items-center justify-center"
      >
        <motion.div
          initial={reduceMotion ? {} : { color: "var(--color-white)" }}
          animate={
            isInView
              ? { color: "var(--color-brand-blue)" }
              : reduceMotion
                ? { color: "var(--color-brand-blue)" }
                : { color: "var(--color-white)" }
          }
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden={true} />
        </motion.div>
      </motion.div>
      <motion.span
        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-[0.65rem] font-bold text-white sm:h-7 sm:w-7 sm:text-xs"
        initial={reduceMotion ? {} : { scale: 0 }}
        animate={isInView ? { scale: 1 } : reduceMotion ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 12 }}
      >
        {step.step}
      </motion.span>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-brand-blue/30"
        animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 2, repeat: isInView ? Infinity : 0, delay: index * 0.15, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </div>
  );
}

function StepContent({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof howToOwnSteps)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "-40px" });

  return (
    <div ref={ref} className="pt-1">
      <motion.h3
        className="text-xl font-bold text-navy"
        initial={reduceMotion ? {} : { opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.15, ease: "easeOut" }}
      >
        {step.title}
      </motion.h3>
      <motion.p
        className="mt-2 leading-relaxed text-text-grey"
        initial={reduceMotion ? {} : { opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
      >
        {step.description}
      </motion.p>
    </div>
  );
}

export function HowToOwn() {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { amount: 0.2, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="bg-warm-white py-24 sm:py-32">
      <div className="container-site">
        <Reveal once={false}>
          <SectionHeading
            align="center"
            eyebrow="Buying Guide"
            title="How to own a home at Wellsprings"
            description="Five steps from your first enquiry to collecting your keys."
          />
        </Reveal>

        <div ref={lineRef} className="relative mt-16 mx-auto max-w-3xl">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-grey-line sm:left-8" aria-hidden="true" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-terracotta sm:left-8"
            style={{ height: reduced ? "100%" : lineHeight }}
            aria-hidden="true"
          />

          {howToOwnSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.08} once={false}>
              <motion.div
                className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <StepNode step={step} index={index} reduceMotion={reduced} />
                <StepContent step={step} index={index} reduceMotion={reduced} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
