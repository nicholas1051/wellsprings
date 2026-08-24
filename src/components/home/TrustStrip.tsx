"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Home, MapPin } from "lucide-react";
import { trustItems } from "@/data/why";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const icons = [MapPin, Home, ShieldCheck];

export function TrustStrip() {
  return (
    <section className="bg-warm-white py-10 sm:py-12">
      <div className="container-site">
        <Reveal>
          <div className="group/card grid gap-0 rounded-2xl border border-grey-line bg-white p-6 transition-shadow duration-300 hover:shadow-lg sm:grid-cols-3 sm:p-8">
            {trustItems.map((item, index) => {
              const Icon = icons[index] ?? ShieldCheck;
              const isFirst = index === 0;
              const isLast = index === trustItems.length - 1;
              return (
                <div
                  key={item.label}
                  className={`flex items-start gap-4 px-4 py-2 ${
                    !isFirst ? "sm:border-l sm:border-grey-line sm:pl-8" : ""
                  } ${!isLast ? "mb-4 last:mb-0 sm:mb-0" : ""}`}
                >
                  <motion.span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-terracotta transition-colors duration-300 group-hover/card:bg-terracotta group-hover/card:text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-text-grey">{item.label}</p>
                    <p className="mt-1 text-lg font-bold text-navy">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-center text-sm text-text-grey">
            Registered and verifiable. Company: {site.legalName}.{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-blue-dark underline-offset-2 hover:underline">
              Read our Privacy Policy
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
