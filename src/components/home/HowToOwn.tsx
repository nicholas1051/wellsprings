"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Eye, FileText, CreditCard, KeyRound } from "lucide-react";

const steps = [
  {
    num: "01",
    kicker: "Enquire",
    title: "Make an enquiry.",
    body: "Fill out an enquiry form — online, on-site, or at our office. It's how we learn who you are and the kind of home you're looking for.",
    footer: "Start your journey",
    icon: MessageSquare,
  },
  {
    num: "02",
    kicker: "Experience",
    title: "Walk the grounds.",
    body: "We arrange a private site inspection, so you can experience the property and its surroundings for yourself, at your own pace.",
    footer: "See it firsthand",
    icon: Eye,
  },
  {
    num: "03",
    kicker: "Disclosure",
    title: "Know the estate.",
    body: "You'll receive full copies of the estate's by-laws and governing documents — nothing left unread before you commit.",
    footer: "Read every clause",
    icon: FileText,
  },
  {
    num: "04",
    kicker: "Commit",
    title: "Choose your terms.",
    body: "Select the payment method that suits you and commence payment, guided at every step by our team.",
    footer: "Seal the agreement",
    icon: CreditCard,
  },
  {
    num: "05",
    kicker: "Possess",
    title: "Take ownership.",
    body: "Receive your land documents and the keys to a home that is, at last, entirely yours.",
    footer: "It's yours",
    icon: KeyRound,
  },
];

const navLabels = ["Enquire", "Experience", "Disclosure", "Commit", "Possess"];

export function HowToOwn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  /* Reveal observer — adds in-view class */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target as HTMLLIElement);
            if (idx !== -1) setVisibleSteps((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.12 },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Active observer — tracks which step is centered */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target as HTMLLIElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: null, rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Nav visibility observer */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => setNavVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* Timeline fill on scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const raw = (window.innerHeight * 0.5 - rect.top) / rect.height;
      setTimelineProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((idx: number) => {
    stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const navFillFrac = activeIdx / (steps.length - 1);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#17263A] py-0 pb-20">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 82% 8%, rgba(105,157,214,.07), transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(105,157,214,.05), transparent 60%)",
        }}
      />

      {/* Intro header */}
      <header className="relative mx-auto max-w-[640px] px-6 pt-[12vh] pb-[9vh] text-center">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-blue">The Acquisition Process</p>
        <h2 className="mb-5 font-heading text-[clamp(34px,5.4vw,58px)] leading-[1.08] tracking-[-0.01em] text-white">
          How to own <span className="italic text-brand-blue">a property</span>
        </h2>
        <p className="mb-8 text-[16px] leading-[1.6] text-[#94A3B8]">
          Five considered steps carry you from a first enquiry to the keys in your hand — each one guided, nothing left to chance.
        </p>
        <div className="flex justify-center">
          <span className="block h-[64px] w-px bg-gradient-to-b from-brand-blue to-transparent" />
        </div>
      </header>

      {/* Fixed progress nav — desktop only */}
      <div
        className="fixed left-10 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 transition-opacity duration-500 lg:flex"
        style={{ opacity: navVisible ? 1 : 0, pointerEvents: navVisible ? "auto" : "none" }}
      >
        {/* Line */}
        <div className="relative h-[210px] w-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-brand-blue to-brand-blue-dark"
            style={{ transform: `scaleY(${navFillFrac})`, transition: "transform .25s linear" }}
          />
        </div>
        {/* Dots */}
        <ol className="flex flex-col justify-between" style={{ height: 210 }}>
          {navLabels.map((label, i) => (
            <li key={i} className="flex">
              <button
                type="button"
                onClick={() => scrollTo(i)}
                className="flex items-center gap-2.5 bg-transparent p-1.5 text-left"
              >
                <span
                  className="tabular-nums transition-all duration-300"
                  style={{
                    fontSize: activeIdx === i ? 13 : 11,
                    color: activeIdx === i ? "#699DD6" : "#94A3B8",
                  }}
                >
                  {steps[i].num}
                </span>
                <span
                  className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] transition-all duration-300"
                  style={{
                    opacity: activeIdx === i ? 1 : 0,
                    maxWidth: activeIdx === i ? 120 : 0,
                    overflow: "hidden",
                    color: activeIdx === i ? "#fff" : "#94A3B8",
                  }}
                >
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-[900px] px-6">
        {/* Central rail */}
        <div className="absolute left-1/2 top-1.5 bottom-1.5 -translate-x-1/2">
          <div className="absolute inset-0 bg-white/10" />
          <div
            className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-brand-blue to-brand-blue-dark"
            style={{ transform: `scaleY(${timelineProgress})`, transition: "transform .2s linear" }}
          />
        </div>

        {/* Steps */}
        <ol className="relative flex flex-col gap-[6vh]">
          {steps.map((step, i) => {
            const isOdd = i % 2 === 0;
            const isActive = activeIdx === i;
            const isVisible = visibleSteps.has(i);
            const Icon = step.icon;

            return (
              <li
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="relative grid items-center transition-opacity duration-700"
                style={{
                  gridTemplateColumns: "1fr 40px 1fr",
                  columnGap: 0,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {/* Card — odd steps: left (col 1), even steps: right (col 3) */}
                <div
                  className="relative w-full max-w-[270px] rounded bg-white p-5 transition-all duration-500"
                  style={{
                    gridColumn: isOdd ? 1 : 3,
                    justifySelf: isOdd ? "end" : "start",
                    textAlign: isOdd ? "right" : "left",
                    borderRadius: isOdd ? "4px 30px 4px 4px" : "4px 4px 4px 30px",
                    opacity: isActive ? 1 : 0.55,
                    transform: `scale(${isActive ? 0.96 : 1})`,
                    boxShadow: isActive
                      ? "0 20px 44px rgba(27,38,58,.25)"
                      : "0 14px 30px rgba(0,0,0,.1)",
                  }}
                >
                  <div
                    className="mb-3 flex items-baseline gap-2.5"
                    style={{ flexDirection: isOdd ? "row-reverse" : "row" }}
                  >
                    <span className="text-[11px] tabular-nums text-[#837a68]">{step.num}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                      {step.kicker}
                    </span>
                  </div>

                  <h3 className="mb-2.5 font-heading text-[19px] font-medium leading-[1.16] text-[#221d15]">
                    {step.title}
                  </h3>

                  <p
                    className="mb-3.5 text-[12.5px] leading-[1.55] text-[#837a68]"
                    style={{
                      maxWidth: "28ch",
                      marginLeft: isOdd ? "auto" : 0,
                      marginRight: isOdd ? 0 : "auto",
                    }}
                  >
                    {step.body}
                  </p>

                  <div
                    className="flex items-center justify-between border-t border-[rgba(34,29,21,.12)] pt-3"
                    style={{ flexDirection: isOdd ? "row-reverse" : "row" }}
                  >
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#837a68]">{step.footer}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-blue text-[9.5px] tabular-nums text-brand-blue">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Connector line from card to spine */}
                <div
                  className="absolute top-1/2 z-[1] h-px transition-colors duration-500"
                  style={{
                    width: "calc(50% - 20px - 26px)",
                    [isOdd ? "right" : "left"]: "calc(50% + 20px)",
                    top: "50%",
                    background: isActive
                      ? "rgba(105,157,214,.6)"
                      : "rgba(255,255,255,.12)",
                  }}
                />

                {/* Node — always center (col 2) */}
                <div
                  className="z-10 grid h-10 w-10 place-items-center rounded-full border transition-all duration-500"
                  style={{
                    gridColumn: 2,
                    justifySelf: "center",
                    background: isActive ? "#1a2a3f" : "#17263A",
                    borderColor: isActive ? "#699DD6" : "rgba(255,255,255,.16)",
                    color: isActive ? "#699DD6" : "#94A3B8",
                    boxShadow: isActive ? "0 0 0 5px rgba(105,157,214,.15)" : "none",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Empty opposite side */}
                <div style={{ gridColumn: isOdd ? 3 : 1 }} />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 760px) {
          .timeline-mobile-fix { grid-template-columns: 34px 22px 1fr !important; }
        }
      `}</style>
    </section>
  );
}
