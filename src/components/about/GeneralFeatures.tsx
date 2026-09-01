"use client";

import { Building2, Users, Church, Trees, Home, Route, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: Building2,
    title: "115 new units",
    text: "Up to 115 new units of varying typologies across the estate.",
  },
  {
    icon: Users,
    title: "600 permanent residents",
    text: "Up to 600 permanent residents within a self-sustained community.",
  },
  {
    icon: Church,
    title: "Mixed use local centre",
    text: "A local centre containing a chapel, day care and community centre, and a convenience shop.",
  },
  {
    icon: Trees,
    title: "Public open space",
    text: "A variety of open spaces from a central park to landscape corridors.",
  },
  {
    icon: Home,
    title: "Home Zone areas",
    text: "Residential areas with pedestrian priority and shared surfaces.",
  },
  {
    icon: Route,
    title: "Street hierarchy",
    text: "A hierarchy of street types from a formal entry boulevard to mews-style streets.",
  },
  {
    icon: ShieldCheck,
    title: "Two security pavilions",
    text: "Security pavilions at the north and south entry for safe, gated living.",
  },
];

export function GeneralFeatures() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue-deep">General Features</p>
        <h2 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">
          Built around how the estate lives
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-grey">
          {`Every part of Wellsprings is planned to work together for a balanced, secure, and connected community.`}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-grey-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-blue-light text-brand-blue-deep">
                <f.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-grey">{f.text}</p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-center rounded-2xl bg-navy p-6 text-white">
            <p className="text-sm text-white/70">This is Wellsprings</p>
            <p className="mt-2 font-heading text-2xl font-bold">Work, play, and live.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
