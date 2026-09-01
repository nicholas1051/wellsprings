"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

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

function Stat({ value, label, decimals, prefix, start, reduceMotion }: { value: number; label: string; decimals: number; prefix: string; start: boolean; reduceMotion: boolean }) {
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!start) return;
    setDisplay(0);
    let current = 0;
    const startTime = performance.now();
    const duration = 1600;

    function tick(now: number) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      current = Math.round(eased * value);
      setDisplay(current);
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [start, value, reduceMotion]);

  const formatted =
    decimals > 0
      ? (display / 10 ** decimals).toFixed(decimals)
      : display.toLocaleString();

  return (
    <div className="relative px-4 py-6 text-center sm:py-8">
      <dd className="font-heading text-3xl font-bold text-navy sm:text-4xl">
        {prefix}
        {formatted}
      </dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-widest text-text-grey">{label}</dt>
    </div>
  );
}

function StatsBand({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setStart(true);
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
    <div ref={ref} className="mt-14 border-y border-grey-line bg-brand-blue-light/30">
      <dl className="mx-auto grid max-w-[1152px] grid-cols-2 divide-x divide-grey-line sm:grid-cols-4">
        {stats.map((s, i) => (
          <Stat key={s.label} {...s} start={start} reduceMotion={reduceMotion} />
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
        <h2 className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl">
          The Wellsprings Estate
        </h2>
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
                {p}
              </motion.p>
            ))}
            <p className="pt-2 font-heading text-2xl font-bold text-navy">
              This is Wellsprings: work, play, and live.
            </p>
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
                className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Ultra-modern living in the heart of Ibadan
              </figcaption>
            </motion.div>
          </div>
        </div>
      </Reveal>

      <StatsBand reduceMotion={!!reduceMotion} />
    </div>
  );
}