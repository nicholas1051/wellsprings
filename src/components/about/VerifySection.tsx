"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

interface TrustItem {
  readonly label: string;
  readonly value: string;
}

function useCountUp(targetText: string, reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState(reduced ? targetText : "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nums = targetText.match(/\d+(\.\d+)?/g) ?? [];
    let current: number[] = nums.map(() => 0);
    let raf = 0;
    let running = false;
    let startTime = 0;
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
      if (!done) raf = requestAnimationFrame(tick);
      else running = false;
    }

    function run() {
      if (running || reduced) return;
      running = true;
      current = nums.map(() => 0);
      startTime = performance.now();
      raf = requestAnimationFrame(tick);
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 60 && rect.bottom > 0;
      if (inView) {
        if (reduced) {
          setOutput(targetText);
        } else {
          run();
        }
      } else {
        cancelAnimationFrame(raf);
        running = false;
        setOutput(reduced ? targetText : "");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetText, reduced]);

  return { ref, output };
}

function VerifyStat({ item, reduced }: { item: TrustItem; reduced: boolean }) {
  const { ref, output } = useCountUp(item.value, reduced);
  const isNum = /\d/.test(item.value);

  return (
    <div className="group relative px-4 py-6 text-center sm:py-8">
      <motion.span
        className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 bg-brand-blue-deep transition-all duration-300 group-hover:w-2/3"
        aria-hidden="true"
      />
      <dd
        ref={ref}
        className={`font-heading font-bold transition-colors duration-300 group-hover:text-brand-blue-deep ${isNum ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"} text-navy`}
      >
        {reduced ? item.value : output}
      </dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-widest text-text-grey transition-colors duration-300 group-hover:text-brand-blue-deep">{item.label}</dt>
    </div>
  );
}

export function VerifySection({ trustItems }: { trustItems: readonly TrustItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 text-brand-blue-deep">What You Can Verify</p>
            <InteractiveHeading
              text="Trusted, verifiable facts"
              accentWords={["Trusted", "facts"]}
              className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-text-grey">
            {`Every figure on this page is documented and available for review before you commit. Hover the stats to re-run them.`}
          </p>
        </div>
      </Reveal>

      <dl className="mt-12 grid grid-cols-1 divide-y divide-grey-line border-t border-grey-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {trustItems.map((item) => (
          <VerifyStat key={item.label} item={item} reduced={!!reduceMotion} />
        ))}
      </dl>
    </div>
  );
}