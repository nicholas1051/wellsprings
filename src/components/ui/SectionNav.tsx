"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "houses", label: "Properties" },
  { id: "features", label: "Features" },
  { id: "gallery-preview", label: "Gallery" },
  { id: "why", label: "Why" },
  { id: "faq", label: "FAQ" },
];

export function SectionNav() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (reduceMotion) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <div key={section.id} className="relative flex items-center justify-end">
          <AnimatePresence>
            {active === section.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="mr-3 whitespace-nowrap rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white shadow-md"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll to ${section.label}`}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all duration-200",
              active === section.id
                ? "border-brand-blue bg-brand-blue scale-125"
                : "border-navy/30 bg-white hover:border-navy/60 hover:bg-tint",
            )}
          />
        </div>
      ))}
    </nav>
  );
}
