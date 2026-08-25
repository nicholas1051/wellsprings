"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  /* Reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = itemRefs.current.indexOf(e.target as HTMLLIElement);
            if (idx !== -1) setVisibleItems((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 },
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggle = useCallback(
    (idx: number) => {
      setActiveIdx((prev) => (prev === idx ? null : idx));
    },
    [],
  );

  return (
    <section className="relative overflow-hidden bg-[#17263A] py-[14vh] px-6">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(105,157,214,.07), transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(105,157,214,.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1180px] gap-20 lg:grid-cols-[340px_1fr]">
        {/* Left: sticky intro */}
        <div className="sticky top-[12vh] self-start">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-blue">
            Support
          </p>
          <h2 className="mb-4 font-heading text-[clamp(32px,3.6vw,46px)] leading-[1.1] tracking-[-0.01em] text-white">
            Answers, <span className="italic text-brand-blue">before</span> you ask.
          </h2>
          <p className="mb-10 max-w-[32ch] text-[15px] leading-[1.65] text-[#94A3B8]">
            Everything prospective owners usually want to know about buying, financing, and settling into a property with us.
          </p>

          <div className="border-t border-white/10 pt-7">
            <p className="mb-4 max-w-[22ch] text-[14px] leading-[1.5] text-white">
              Still have a question we haven&apos;t covered?
            </p>
            <a
              href="tel:"
              className="group inline-flex items-center gap-3.5 rounded-full border border-brand-blue px-[22px] py-[13px] text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-blue transition-colors hover:bg-brand-blue/10"
            >
              Call an advisor
              <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-brand-blue text-[#17263A] transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Right: accordion */}
        <ol className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isActive = activeIdx === i;
            const isVisible = visibleItems.has(i);

            return (
              <li
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="overflow-hidden rounded-full transition-all duration-500"
                style={{
                  background: isActive ? "#1a2a3f" : "#fff",
                  boxShadow: isActive
                    ? "0 18px 40px rgba(0,0,0,.4)"
                    : "0 10px 24px rgba(0,0,0,.12)",
                  borderRadius: isActive ? 24 : 999,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(14px)",
                }}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 py-3.5 pl-5 pr-3.5 text-left transition-colors"
                  aria-expanded={isActive}
                >
                  <span
                    className="text-[14.5px] font-semibold transition-colors duration-400"
                    style={{ color: isActive ? "#f4efe4" : "#221d15" }}
                  >
                    {faq.question}
                  </span>

                  {/* Plus/minus icon */}
                  <span
                    className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border transition-all duration-400"
                    style={{
                      borderColor: isActive ? "#699DD6" : "rgba(105,157,214,.5)",
                      background: isActive ? "#699DD6" : "transparent",
                    }}
                  >
                    {/* Horizontal bar — always visible, rotates to X when active */}
                    <span
                      className="absolute block h-[1.2px] w-[10px] transition-all duration-400"
                      style={{
                        background: isActive ? "#1a2a3f" : "#699DD6",
                        transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    />
                    {/* Vertical bar — rotates to complete the X */}
                    <span
                      className="absolute block h-[10px] w-[1.2px] transition-all duration-400"
                      style={{
                        background: isActive ? "#1a2a3f" : "#699DD6",
                        transform: isActive ? "rotate(45deg)" : "rotate(90deg)",
                      }}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  ref={(el) => { answerRefs.current[i] = el; }}
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isActive ? (answerRefs.current[i]?.scrollHeight ?? 200) : 0,
                    opacity: isActive ? 1 : 0,
                    padding: isActive ? "0 20px 16px" : "0 20px",
                  }}
                >
                  <p
                    className="max-w-[62ch] text-[12.5px] leading-[1.6] transition-colors duration-400"
                    style={{ color: isActive ? "#c9bfab" : "#837a68" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
