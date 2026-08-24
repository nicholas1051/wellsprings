"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const quoteText =
  "Home is where children find safety and security, where we find our identities, where citizenship starts. It usually starts with believing you\u2019re part of a community, and that is essential to having a stable home.";

function QuoteReveal({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const words = quoteText.split(" ");

  if (reduceMotion) {
    return (
      <blockquote className="text-2xl font-medium italic leading-relaxed text-navy sm:text-3xl lg:text-4xl">
        &ldquo;{quoteText}&rdquo;
      </blockquote>
    );
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-[3px] bg-brand-blue origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <blockquote className="text-2xl font-medium italic leading-relaxed sm:text-3xl lg:text-4xl">
        <span className="text-navy/20">&ldquo;</span>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0.25, filter: "blur(6px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : undefined
            }
            transition={{
              duration: 0.3,
              delay: 0.6 + i * 0.06,
              ease: "easeOut",
            }}
          >
            <span className="text-navy">{word}</span>
          </motion.span>
        ))}
        <span className="text-navy/20">&rdquo;</span>
      </blockquote>
    </div>
  );
}

export function Development() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 text-brand-blue-deep">The Vision</p>
            <QuoteReveal reduceMotion={!!reduceMotion} />
            <p className="mt-6 text-sm font-medium text-text-grey">&mdash; Matthew Desmond</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="StellarVera Development"
                title="Building a community, not just houses"
                description={`${site.legalName} (SDCL) builds residential estates focused on quality construction, good planning, and long-term value.`}
              />
              <p className="mt-6 text-base leading-relaxed text-text-grey text-justify">
                Wellsprings Ibadan is our flagship estate: 25 acres of masterplanned residential living
                in Jericho, Ibadan. The underground drainage, paved roads, landscaped parks, and community
                spaces were all designed as part of the same plan.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-grey text-justify">
                We focus on practical quality. A gatehouse that works. Streets wide enough for two cars.
                Homes where every room has a purpose. That is what we mean by good residential design.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-grey-line bg-off-white">
              <Image
                src="/images/stellavera-development.jpg"
                alt="Wellsprings Ibadan estate layout by StellarVera Development"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
