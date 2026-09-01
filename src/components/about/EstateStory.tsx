"use client";

import { Reveal } from "@/components/ui/Reveal";
import { masterPlanStats } from "@/data/site";

const stats = [
  { value: "10.14", label: "hectares" },
  { value: "101,400", label: "square metres" },
  { value: String(masterPlanStats.maxUnits), label: "new units" },
  { value: String(masterPlanStats.maxResidents), label: "residents" },
];

export function EstateStory() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-3 text-brand-blue-deep">About Wellsprings Estate</p>
        <h2 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">
          {`The Wellsprings Estate`}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.05}>
          <div className="space-y-5 text-justify leading-relaxed text-text-grey">
            <p>
              {`The Wellsprings Estate was conceived out of the desire to satisfy the yearning of our customers to experience forward thinking self-sustained community living right in the heart of Ibadan, Oyo State.`}
            </p>
            <p>
              {`Dubbed the ultra-modern Jericho, Wellsprings is located in the Idi-Ishin area of Ibadan West Local Government spanning up to 10.14 hectares which is equivalent to about 101,400 square metres.`}
            </p>
            <p>
              {`With energy efficient buildings, the self-sufficient estate provides upwardly mobile, futuristic investors with a network of pedestrian and cycle routes. It also features open spaces, a central estate pool and landscape corridors to support existing aquatic habitat.`}
            </p>
            <p>
              {`The ideals of work-life balance are expertly presented and intentionally employed with homes designed with offices and relaxation spaces. The estate is also equipped with a central sewage recycling system, fitted solidly with a sustainable urban drainage system.`}
            </p>
            <p>
              {`At Wellsprings, the meaning and delivery of quality living is reinvented and artfully exhibited.`}
            </p>
            <p className="font-semibold text-navy">
              {`This is Wellsprings: work, play, and live.`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-grey-line bg-white p-8 shadow-sm">
            <p className="eyebrow mb-6 text-brand-blue-deep">At a glance</p>
            <dl className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-brand-blue-light/50 p-5">
                  <dt className="order-2 mt-1 block text-xs font-medium uppercase tracking-wide text-text-grey">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-heading text-2xl font-bold text-navy sm:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
