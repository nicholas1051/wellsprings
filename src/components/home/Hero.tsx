"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { masterPlanStats } from "@/data/site";

import { useInView } from "framer-motion";

const tagline = "Dream. Live. Repeat.";

const liveIndices = [7, 8, 9, 10];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const stats = [
  { end: masterPlanStats.acres, suffix: ".05", unit: " Acres", label: "Estate" },
  { end: masterPlanStats.maxUnits, suffix: "", unit: " Units", label: "Max Homes" },
  { end: 6, suffix: "", unit: "", label: "Property Types" },
];

function useCountUp(target: number, duration = 2000, startDelay = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let start: number | null = null;
    let raf: number;
    let cancelled = false;
    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (cancelled) return;
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, target, duration, startDelay]);

  return { count, ref };
}

const heroParagraph = "Thoughtfully designed homes set within a serene and welcoming community. Wellsprings gives you the comfort and space to live well, work productively, and build meaningful connections. Because where you live should make life better.";

function useTypewriterOnce(text: string, durationMs = 10000) {
  const [len, setLen] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const finished = len >= text.length;

  useEffect(() => {
    if (!isInView) {
      setLen(0);
      return;
    }
    const speed = durationMs / text.length;
    const id = setInterval(() => {
      setLen((l) => {
        if (l >= text.length) {
          clearInterval(id);
          return l;
        }
        return l + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [isInView, text, durationMs]);

  return { len, ref, finished };
}

function useTypewriter(text: string, { typingSpeed = 35, deletingSpeed = 20, pauseEnd = 2200, pauseStart = 400 } = {}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      if (displayedLength < text.length) {
        setDisplayedLength((l) => l + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseEnd);
      }
    } else {
      if (displayedLength > 0) {
        setDisplayedLength((l) => l - 1);
      } else {
        setIsDeleting(false);
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
        }, pauseStart);
      }
    }
  }, [displayedLength, isDeleting, isPaused, text, pauseEnd, pauseStart]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const id = setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return displayedLength;
}

function TypewriterTagline() {
  const len = useTypewriter(tagline);

  return (
    <span className="font-heading text-[2.5rem] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
      {tagline.split("").map((char, i) => (
        <span key={i} className={cn("inline-block", liveIndices.includes(i) && "text-terracotta")} style={{ whiteSpace: char === " " ? "pre" : undefined }}>
          <AnimatePresence>
            {i < len && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      ))}
      <motion.span
        className="inline-block ml-0.5 h-[0.85em] w-[3px] align-baseline bg-white"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

function ParagraphTypewriter({ reduceMotion }: { reduceMotion: boolean }) {
  const { len, ref, finished } = useTypewriterOnce(heroParagraph, 5000);

  if (reduceMotion) {
    return (
      <p ref={ref} className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl text-justify" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)" }}>
        {heroParagraph}
      </p>
    );
  }

  return (
    <div ref={ref} className="mt-6 max-w-2xl sm:text-xl" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)" }}>
      <p className="text-lg leading-relaxed text-white sm:text-xl text-justify whitespace-pre-wrap">
        {heroParagraph.slice(0, len)}
        {!finished && (
          <motion.span
            className="inline-block ml-0.5 h-[0.85em] w-[2px] align-baseline bg-white/70"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </p>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-screen items-end overflow-hidden bg-ink">
      {reduceMotion ? (
        <Image
          src="https://i.postimg.cc/vmsQhcmQ/Wellsprings-gate-house-8K.png"
          alt="Wellsprings Ibadan estate gate house"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.12, 1],
              x: ["0%", "-1.5%", "0%"],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Image
              src="https://i.postimg.cc/vmsQhcmQ/Wellsprings-gate-house-8K.png"
              alt="Wellsprings Ibadan estate gate house"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        aria-hidden="true"
      />

      <motion.div
        className="container-site relative z-10 pb-24 pt-48 sm:pb-32"
        style={reduceMotion ? {} : { y: contentY }}
      >
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            {...(reduceMotion ? {} : fadeUp(0.2))}
            className="eyebrow mb-5 text-gold"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
          >
            {site.brandName}
          </motion.p>

          <h1 className="max-w-4xl" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)" }}>
            {reduceMotion ? (
              <span className="font-heading text-[2.5rem] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {tagline.split("").map((char, i) => (
                  <span key={i} className={liveIndices.includes(i) ? "text-terracotta" : undefined}>
                    {char}
                  </span>
                ))}
              </span>
            ) : (
              <TypewriterTagline />
            )}
          </h1>

          <ParagraphTypewriter reduceMotion={!!reduceMotion} />

          <motion.div
            {...(reduceMotion ? {} : fadeUp(1.6))}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink
              href="/properties"
              className="bg-terracotta text-white hover:brightness-110 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 h-14 px-7 text-base rounded-full inline-flex items-center justify-center gap-2 font-semibold active:translate-y-px animate-[btnGlow_2.5s_ease-in-out_infinite]"
            >
              Explore Properties
            </ButtonLink>
            <BookViewingButton variant="primary" size="lg" source="hero" label="Schedule a Visit" className="hover:scale-[1.03] hover:shadow-lg transition-all duration-300 animate-[btnGlow_2.5s_ease-in-out_infinite_0.4s]" />
          </motion.div>

          <motion.div
            {...(reduceMotion ? {} : fadeUp(2.0))}
            className="mt-14 inline-flex flex-col gap-4 rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:gap-12 sm:px-8"
          >
            {stats.map((stat, i) => {
              const { count, ref } = useCountUp(stat.end, 2000, i * 300);
              return (
                <motion.p
                  key={stat.label}
                  ref={ref}
                  className="flex items-baseline gap-2 leading-tight cursor-default group"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span className="text-2xl font-bold text-gold transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(212,165,116,0.6)]">
                    {count}{stat.suffix}
                    <span className="text-lg">{stat.unit}</span>
                  </span>
                  <span className="text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">{stat.label}</span>
                </motion.p>
              );
            })}
          </motion.div>

          <motion.div
            {...(reduceMotion ? {} : fadeUp(2.4))}
            className="mt-10"
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">Scroll to discover</p>
            <motion.div
              className="h-12 w-6 rounded-full border-2 border-white/30"
              animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/60"
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
