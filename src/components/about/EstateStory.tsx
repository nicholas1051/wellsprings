"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";
import { MagneticText } from "@/components/ui/MagneticText";
import { PhraseReveal } from "@/components/ui/PhraseReveal";

const paragraphs = [
  `The Wellsprings Estate was conceived out of the desire to satisfy the yearning of our customers to experience forward thinking self-sustained community living right in the heart of Ibadan, Oyo State.`,
  `Dubbed the ultra-modern Jericho, Wellsprings is located in the Idi-Ishin area of Ibadan West Local Government spanning up to 10.14 hectares which is equivalent to about 101,400 square metres.`,
  `With energy efficient buildings, the self-sufficient estate provides upwardly mobile, futuristic investors with a network of pedestrian and cycle routes. It also features open spaces, a central estate pool and landscape corridors to support existing aquatic habitat.`,
  `The ideals of work-life balance are expertly presented and intentionally employed with homes designed with offices and relaxation spaces. The estate is also equipped with a central sewage recycling system, fitted solidly with a sustainable urban drainage system.`,
];

const stats = [
  { value: 10.14, label: "hectares", decimals: 2, prefix: "" },
  { value: 101400, label: "square metres", decimals: 0, prefix: "" },
  { value: 115, label: "new units", decimals: 0, prefix: "" },
  { value: 600, label: "residents", decimals: 0, prefix: "" },
];

function Stat({ value, label, decimals, prefix }: { value: number; label: string; decimals: number; prefix: string }) {
  return (
    <div className="group relative px-4 py-6 text-center sm:py-8">
      <motion.span
        className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 bg-brand-blue-deep transition-all duration-300 group-hover:w-2/3"
        aria-hidden="true"
      />
      <dd className="font-heading text-3xl font-bold text-navy transition-colors duration-300 group-hover:text-brand-blue-deep sm:text-4xl">
        <CountUp value={value} decimals={decimals} prefix={prefix} />
      </dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-widest text-text-grey transition-colors duration-300 group-hover:text-brand-blue-deep">{label}</dt>
    </div>
  );
}

function StatsBand() {
  return (
    <div className="mt-14 border-y border-grey-line bg-brand-blue-light/30">
      <dl className="mx-auto grid max-w-[1152px] grid-cols-2 divide-x divide-grey-line sm:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} decimals={s.decimals} prefix={s.prefix} />
        ))}
      </dl>
    </div>
  );
}

export function EstateStory() {
  const reduceMotion = useReducedMotion();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue-deep">About Wellsprings Estate</p>
        <InteractiveHeading
          text="The Wellsprings Estate"
          accentWords={["Wellsprings", "Estate"]}
          className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 pr-0 lg:pr-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="leading-relaxed text-text-grey text-justify"
                whileHover={reduceMotion ? undefined : { x: i % 2 === 0 ? 3 : -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {i === 1 ? (
                  <PhraseReveal
                    text={p}
                    phrases={[
                      { words: "ultra-modern Jericho", hint: "A nod to Jericho's leafy prestige, scaled for Ibadan's West." },
                    ]}
                  />
                ) : i === 3 ? (
                  <PhraseReveal
                    text={p}
                    phrases={[
                      { words: "work-life balance", hint: "Every home pairs living space with a built-in office nook." },
                      { words: "central sewage recycling system", hint: "Treated on-site, so the estate drains sustainably." },
                    ]}
                  />
                ) : (
                  p
                )}
              </motion.p>
            ))}
            <MagneticText
              text="This is Wellsprings: work, play, and live."
              className="pt-2 font-heading text-2xl font-bold text-navy"
            />
          </div>

          <div ref={imgWrapRef} className="relative">
            <motion.div
              className="group relative mt-2 overflow-clip rounded-2xl"
              style={reduceMotion ? undefined : { y: imgY }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/coral-hero.png"
                  alt="Coral 3-bedroom semi-detached bungalow at Wellsprings Ibadan"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Ultra-modern living in the heart of Ibadan
              </figcaption>
            </motion.div>
          </div>
        </div>
      </Reveal>

      <StatsBand />
    </div>
  );
}