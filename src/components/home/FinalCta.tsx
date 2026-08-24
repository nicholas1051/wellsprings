"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="pb-8 sm:pb-9">
      <div className="container-site">
        <div className="relative min-h-[215px] overflow-hidden rounded-[25px] bg-gradient-to-r from-brand-blue-deep to-brand-blue shadow-2xl">
          <div className="relative z-10 flex flex-col items-start justify-between gap-7 px-8 py-11 sm:flex-row sm:items-center sm:px-[62px]">
            <div>
              <h2 className="mb-1.5 font-heading text-[clamp(27px,4vw,40px)] leading-[1.04] tracking-[-0.045em] text-white">
                Ready to Find Your Next Home?
              </h2>
              <p className="text-xs text-white/90">Explore thoughtfully selected spaces with Wellsprings.</p>
            </div>
            <Link
              href="/properties"
              className="inline-flex min-w-[145px] items-center justify-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-sm font-bold text-brand-blue-deep shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Find a Property
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
