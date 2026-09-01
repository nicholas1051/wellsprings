"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface TrustItem {
  readonly label: string;
  readonly value: string;
}

function useCountUp(targetText: string, start: boolean, reduced: boolean) {
  const [output, setOutput] = useState(reduced ? targetText : "");

  useEffect(() => {
    if (reduced) {
      setOutput(targetText);
      return;
    }
    if (!start) {
      setOutput("");
      return;
    }

    const nums = targetText.match(/\d+(\.\d+)?/g) ?? [];
    let current: number[] = nums.map(() => 0);
    const startTime = performance.now();
    const dur = 1400;

    function tick(now: number) {
      const p = Math.min((now - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let done = true;
      nums.forEach((raw, i) => {
        const target = parseFloat(raw);
        const next = Math.min(target, Math.round(eased * target));
        current[i] = next;
        if (next < target) done = false;
      });

      let text = targetText;
      nums.forEach((raw, i) => {
        const target = parseFloat(raw);
        const targetStr = (target % 1 === 0 ? target.toFixed(0) : target.toString());
        const displayed = target % 1 === 0 ? String(current[i]) : (current[i] / 10 ** (targetStr.split(".")[1]?.length ?? 0)).toFixed(targetStr.split(".")[1]?.length ?? 0);
        text = text.replace(raw, displayed);
      });

      setOutput(text);
      if (!done) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [start, targetText, reduced]);

  return output;
}

function VerifyStat({ item, start, reduced }: { item: TrustItem; start: boolean; reduced: boolean }) {
  const value = useCountUp(item.value, start, reduced);
  const isNum = /\d/.test(item.value);

  return (
    <div className="group relative px-4 py-6 text-center sm:py-8">
      <motion.span
        className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 bg-brand-blue-deep transition-all duration-300 group-hover:w-2/3"
        aria-hidden="true"
      />
      <motion.dd
        className={`font-heading font-bold transition-colors duration-300 group-hover:text-brand-blue-deep ${isNum ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"} text-navy`}
        initial={{ opacity: 0, y: 8 }}
        animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
      >
        {reduced ? item.value : value}
      </motion.dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-widest text-text-grey transition-colors duration-300 group-hover:text-brand-blue-deep">{item.label}</dt>
    </div>
  );
}

export function VerifySection({ trustItems }: { trustItems: readonly TrustItem[] }) {
  const reduceMotion = useReducedMotion();
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
    <div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 text-brand-blue-deep">What You Can Verify</p>
            <h2 className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Trusted, verifiable facts
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-text-grey">
            {`Every figure on this page is documented and available for review before you commit. Hover the stats to re-run them.`}
          </p>
        </div>
      </Reveal>

      <div ref={ref}>
        <dl className="mt-12 grid grid-cols-1 divide-y divide-grey-line border-t border-grey-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustItems.map((item, i) => (
            <VerifyStat key={item.label} item={item} start={start} reduced={!!reduceMotion} />
          ))}
        </dl>
      </div>
    </div>
  );
}