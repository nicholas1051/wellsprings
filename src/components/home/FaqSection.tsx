"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/faqs";

const tints = [
  "rgba(255,255,255,0)",
  "rgba(105,157,214,0.02)",
  "rgba(67,167,106,0.02)",
  "rgba(79,131,189,0.02)",
  "rgba(105,157,214,0.02)",
  "rgba(67,167,106,0.02)",
  "rgba(79,131,189,0.02)",
  "rgba(105,157,214,0.02)",
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <motion.section
      className="py-24 sm:py-32"
      animate={{
        backgroundColor: tints[activeIndex ?? 0] || tints[0],
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal once={false}>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions we hear often"
              description="If your question isn't here, ask us directly. We reply within one business day."
            />
          </Reveal>
          <Reveal delay={0.1} once={false}>
            <Accordion items={faqs} onOpenChange={setActiveIndex} />
          </Reveal>
        </div>
      </div>
    </motion.section>
  );
}
