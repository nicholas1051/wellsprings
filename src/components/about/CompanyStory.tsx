"use client";

import { Sparkles, Eye } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CompanyStory() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue-deep">About StellarVera</p>
        <h2 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">
          {`StellarVera Development Company Limited ("SDCL")`}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-grey">
          {`A property development company with expertise in design, build and management of various developments including residential and commercial. We conceive projects, explore their feasibility and execute them with excellence.`}
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10">
          <h3 className="text-xl font-bold text-navy">Quality Assurance</h3>
          <p className="mt-3 leading-relaxed text-text-grey text-justify">
            Our service offering is built on delivering quality services, within an agreed timeframe
            and at an affordable cost. We aspire to be the leader in the property development space.
          </p>
          <p className="mt-4 leading-relaxed text-text-grey text-justify">
            SDCL brings together proven expertise to design and develop world-class homes.
          </p>
          <p className="mt-4 leading-relaxed text-text-grey text-justify">
            Over the years we have built a solid network with leading development and engineering
            companies as well as other service-providers across the world to ensure that the homes we
            build are of high standards.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-grey-line bg-white p-7">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-blue-light text-brand-blue-deep">
              <Eye className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-grey">
              {`To be the leading Property and Infrastructure Development Company of choice in the provision of desired products and services in Africa.`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="h-full rounded-2xl border border-grey-line bg-white p-7">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-blue-light text-brand-blue-deep">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">Core Value</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-grey">
              To consistently deliver world-class architectural solutions.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
