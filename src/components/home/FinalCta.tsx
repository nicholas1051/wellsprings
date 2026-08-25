"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useOpenCallback } from "@/components/modals/CallbackProvider";

export function FinalCta() {
  const { openCallback } = useOpenCallback();

  return (
    <section className="pb-8 sm:pb-9">
      <div className="container-site">
        <div className="relative min-h-[215px] overflow-hidden rounded-[25px] bg-gradient-to-r from-brand-blue-deep to-brand-blue shadow-2xl">
          <img
            src="/images/cta-bg.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-overlay"
          />
          <div className="relative z-10 flex flex-col items-start justify-between gap-7 px-8 py-11 sm:flex-row sm:items-center sm:px-[62px]">
            <div>
              <motion.h2
                className="mb-1.5 font-heading text-[clamp(27px,4vw,40px)] leading-[1.04] tracking-[-0.045em] text-white"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6 }}
              >
                Ready to Find Your Next Home?
              </motion.h2>
              <motion.p
                className="text-xs text-white/90"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Explore thoughtfully selected spaces with Wellsprings.
              </motion.p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/properties"
                className="inline-flex min-w-[145px] items-center justify-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-sm font-bold text-brand-blue-deep shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,255,255,.3)]"
              >
                Find a Property
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => openCallback("final-cta")}
                className="inline-flex min-w-[145px] items-center justify-center gap-2 rounded-[11px] border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white/70 hover:bg-white/25 hover:shadow-[0_12px_40px_rgba(255,255,255,.15)]"
              >
                Get a Call From Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
