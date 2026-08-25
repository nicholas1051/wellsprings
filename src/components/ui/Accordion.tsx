"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: Faq[];
  onOpenChange?: (index: number | null) => void;
}

function BorderTrace({ open }: { open: boolean }) {
  return (
    <span className="pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-left transition-transform duration-200 ease-out",
          open ? "scale-x-100 bg-brand-blue-deep" : "scale-x-0 bg-brand-blue-deep",
        )}
        style={{ transitionProperty: "transform" }}
      />
      <span
        className={cn(
          "absolute right-0 inset-y-0 w-px origin-top transition-transform duration-200 ease-out",
          open ? "scale-y-100 bg-brand-blue-deep" : "scale-y-0 bg-brand-blue-deep",
        )}
        style={{ transitionProperty: "transform", transitionDelay: open ? "100ms" : "0ms" }}
      />
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-right transition-transform duration-200 ease-out",
          open ? "scale-x-100 bg-brand-blue-deep" : "scale-x-0 bg-brand-blue-deep",
        )}
        style={{ transitionProperty: "transform", transitionDelay: open ? "200ms" : "0ms" }}
      />
      <span
        className={cn(
          "absolute left-0 inset-y-0 w-px origin-bottom transition-transform duration-200 ease-out",
          open ? "scale-y-100 bg-brand-blue-deep" : "scale-y-0 bg-brand-blue-deep",
        )}
        style={{ transitionProperty: "transform", transitionDelay: open ? "300ms" : "0ms" }}
      />
    </span>
  );
}

function AccordionItem({
  item,
  index,
  open,
  onToggle,
  total,
}: {
  item: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
  total: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      className={cn(
        "relative border-l-3 transition-all duration-300",
        open ? "border-l-brand-blue-deep bg-brand-blue-deep/[0.03]" : "border-l-transparent",
      )}
    >
      <BorderTrace open={open} />
      <h3>
        <button
          type="button"
          id={`faq-button-${index}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition-colors duration-200 sm:px-6",
            open ? "text-brand-blue-deep" : "text-navy hover:text-brand-blue-dark",
          )}
        >
          <span className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                open
                  ? "bg-brand-blue-deep text-white"
                  : "bg-brand-blue/10 text-brand-blue",
              )}
            >
              Q{index + 1}
            </span>
            {item.question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 shrink-0 transition-all duration-300",
              open ? "rotate-180 text-brand-blue-deep" : "text-brand-blue-dark",
            )}
          />
        </button>
      </h3>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-5 pb-5 text-text-grey sm:px-6">
          <p
            className={cn(
              "leading-relaxed transition-all duration-300",
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3",
            )}
            style={{ transitionDelay: open ? "150ms" : "0ms" }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, onOpenChange }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => {
      const next = current === index ? null : index;
      onOpenChange?.(next);
      return next;
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-grey-line bg-white">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          index={index}
          open={openIndex === index}
          onToggle={() => toggle(index)}
          total={items.length}
        />
      ))}
    </div>
  );
}
