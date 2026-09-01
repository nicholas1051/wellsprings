"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { MapPin, Home, Wallet, Search, ArrowRight, Star, ShieldCheck, Headphones, Sparkles, BadgeCheck, Phone } from "lucide-react";
import { useState, useCallback } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { useOpenCallback } from "@/components/modals/CallbackProvider";

const tagline = "Dream. Live. Repeat.";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

function SearchBar() {
  const [type, setType] = useState("Any Type");
  const [price, setPrice] = useState("₦45M+");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/properties`;
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      className="absolute bottom-4 left-1/2 z-30 grid w-[calc(100%-32px)] max-w-[1040px] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-white/70 bg-white/95 shadow-2xl backdrop-blur-sm sm:bottom-5 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:rounded-full sm:border-7"
    >
      <div className="flex items-center gap-3 border-b border-grey-line px-4 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:py-0">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep">
          <MapPin className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-text-grey">Location</label>
          <span className="text-sm font-bold text-navy">Ibadan, Nigeria</span>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-grey-line px-4 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:py-0">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep">
          <Home className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-text-grey">Property Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-0 bg-transparent text-sm font-bold text-navy outline-none"
          >
            <option>Any Type</option>
            <option>Villa</option>
            <option>Duplex</option>
            <option>Townhouse</option>
            <option>Apartment</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 sm:border-r sm:px-5 sm:py-0">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-blue-light text-brand-blue-deep">
          <Wallet className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-text-grey">Price Range</label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-0 bg-transparent text-sm font-bold text-navy outline-none"
          >
            <option>₦45M+</option>
            <option>₦75M+</option>
            <option>₦90M+</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="m-1 flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-brand-blue/28 transition-all hover:bg-brand-blue-dark hover:-translate-y-0.5 sm:px-8"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </motion.form>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const { openCallback } = useOpenCallback();

  return (
    <section ref={ref} className="pt-4 sm:pt-6">
      <div className="relative min-h-[625px] overflow-hidden rounded-[28px] bg-cover bg-center shadow-2xl sm:min-h-[680px]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 75% at 50% 42%, rgba(23,38,58,.62) 0%, rgba(23,38,58,.35) 55%, rgba(23,38,58,.12) 100%), url(https://i.postimg.cc/vmsQhcmQ/Wellsprings-gate-house-8K.png)`,
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1040px] px-6 pt-20 text-center sm:px-8 sm:pt-24">
          <h1 className="font-heading text-[clamp(42px,5.5vw,78px)] leading-[0.99] tracking-[-0.045em] text-white font-extrabold" style={{ textShadow: "0 3px 18px rgba(0,0,0,.45), 0 1px 4px rgba(0,0,0,.3)" }}>
            {reduceMotion ? (
              tagline.split("").map((char, i) => {
                const isLive = i >= 7 && i <= 11;
                return (
                  <span key={i} className={isLive ? "relative text-brand-blue" : undefined}>
                    {char}
                    {i === 11 && (
                      <span className="absolute bottom-[-5px] left-0.5 right-0 h-[3px] rounded-full bg-brand-blue" />
                    )}
                  </span>
                );
              })
            ) : (
              <TypewriterTagline />
            )}
          </h1>

          <motion.p
            {...(reduceMotion ? {} : fadeUp(0.8))}
            className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.7] font-medium text-white"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,.5), 0 1px 4px rgba(0,0,0,.3)" }}
          >
            Thoughtfully designed homes set within a serene and welcoming community.
            Wellsprings gives you the comfort and space to live well, work productively,
            and build meaningful connections. Because where you live should make life better.
          </motion.p>

          <motion.div
            {...(reduceMotion ? {} : fadeUp(1.4))}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-[11px] bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/27 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-xl"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => openCallback("hero-cta")}
              className="inline-flex items-center justify-center gap-2 rounded-[11px] border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              <Phone className="h-4 w-4" />
              Get a call from us
            </button>
          </motion.div>
        </div>

        <div className="hidden sm:block">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

function TypewriterTagline() {
  const [len, setLen] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const finished = len >= tagline.length;

  useState(() => {
    const speed = 80;
    const id = setInterval(() => {
      setLen((l) => {
        if (l >= tagline.length) { clearInterval(id); return l; }
        return l + 1;
      });
    }, speed);
    return () => clearInterval(id);
  });

  const liveStart = 7;
  const liveEnd = 11;

  return (
    <span ref={ref}>
      {tagline.split("").map((char, i) => {
        const isLive = i >= liveStart && i <= liveEnd;
        return (
          <span key={i} className={isLive ? "relative inline-block text-brand-blue" : undefined}>
            {isLive ? (
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {char}
              </motion.span>
            ) : (
              char
            )}
            {i === liveEnd && (
              <span className="absolute bottom-[-5px] left-0.5 right-0 h-[3px] rounded-full bg-brand-blue" />
            )}
          </span>
        );
      })}
      {!finished && (
        <motion.span
          className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[2px] bg-brand-blue"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
}
