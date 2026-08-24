"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Homeowner, Pearl Villa",
    stars: 5,
    text: "The process was simple from start to finish. I found a beautiful home without the usual stress. Wellsprings made it real for us.",
  },
  {
    name: "Tunde Afolabi",
    role: "Homeowner, Moonstone Duplex",
    stars: 5,
    text: "I really appreciated how clear and professional the experience was. The property matched exactly what I needed for my family.",
  },
  {
    name: "Ngozi Eze",
    role: "Homeowner, Aquamarine Townhouse",
    stars: 5,
    text: "A refreshing property experience. The team made finding the right place feel straightforward and honest from day one.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section className="py-20 sm:py-28">
      <div ref={ref} className="container-site">
        <div className="mx-auto mb-9 max-w-[650px] text-center">
          <p className="eyebrow mb-2.5 text-brand-blue-deep">Real experiences</p>
          <h2 className="font-heading text-[clamp(34px,4.2vw,50px)] leading-[1.04] tracking-[-0.045em] text-navy">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="rounded-[18px] border border-grey-line bg-white p-6 shadow-sm"
            >
              <div className="mb-3.5 flex items-center gap-2.5">
                <div className="grid h-[43px] w-[43px] place-items-center rounded-full bg-brand-blue-light text-sm font-bold text-brand-blue-deep">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <strong className="block text-xs font-bold text-navy">{t.name}</strong>
                  <span className="text-[11px] text-muted">{t.role}</span>
                </div>
              </div>
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-[#E7AB43] text-[#E7AB43]" />
                ))}
              </div>
              <p className="text-xs leading-[1.7] text-[#667487]">&ldquo;{t.text}&rdquo;</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
