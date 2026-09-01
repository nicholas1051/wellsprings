"use client";

import { useReducedMotion } from "framer-motion";
import { ShieldCheck, Home, MapPin } from "lucide-react";
import { trustItems } from "@/data/why";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const icons = [MapPin, Home, ShieldCheck];

const MARQUEE_CSS = `
.tstrip-marquee{ overflow:hidden; border-radius:16px; border:1px solid #E1E8F0; background:#fff; box-shadow:0 1px 3px rgba(23,38,58,.05); }
.tstrip-marquee__track{ display:flex; width:max-content; animation:tstrip-scroll 24s linear infinite; }
.tstrip-marquee:hover .tstrip-marquee__track{ animation-play-state:paused; }
@keyframes tstrip-scroll{ from{ transform:translateX(0);} to{ transform:translateX(-33.3333%);} }
`;

export function TrustStrip() {
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-warm-white py-10 sm:py-12">
      <div className="container-site">
        <Reveal>
          {reduced ? (
            <div className="grid gap-0 rounded-2xl border border-grey-line bg-white p-6 sm:grid-cols-3 sm:p-8">
              {trustItems.map((item, index) => {
                const Icon = icons[index] ?? ShieldCheck;
                const isFirst = index === 0;
                return (
                  <div
                    key={item.label}
                    className={`flex items-start gap-4 px-4 py-2 ${
                      !isFirst ? "sm:border-l sm:border-grey-line sm:pl-8" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-brand-blue-dark">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-text-grey">{item.label}</p>
                      <p className="mt-1 text-lg font-bold text-navy">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="tstrip-marquee py-2">
              <div className="tstrip-marquee__track">
                {[0, 1, 2].map((group) => (
                  <div key={group} className="flex shrink-0">
                    {trustItems.map((item, i) => {
                      const Icon = icons[i] ?? ShieldCheck;
                      return (
                        <div key={`${group}-${item.label}`} className="flex shrink-0 items-center gap-3 px-7 py-2.5">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-brand-blue-dark">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div className="whitespace-nowrap">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-grey">{item.label}</p>
                            <p className="text-base font-bold text-navy">{item.value}</p>
                          </div>
                          <span className="ml-7 h-8 w-px bg-grey-line" aria-hidden="true" />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
        <style>{MARQUEE_CSS}</style>
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