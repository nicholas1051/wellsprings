"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { housingUnits, formatPrice, type UnitSlug } from "@/data/properties";
import { formatArea } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface PropertyComparisonProps {
  currentSlug: string;
}

export function PropertyComparison({ currentSlug }: PropertyComparisonProps) {
  const [selected, setSelected] = useState<string[]>([currentSlug]);

  const toggleUnit = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const selectedUnits = housingUnits.filter((u) => selected.includes(u.slug));

  const comparisonRows: { label: string; render: (u: (typeof housingUnits)[number]) => string | boolean }[] = [
    { label: "Type", render: (u) => u.propertyType.charAt(0).toUpperCase() + u.propertyType.slice(1) },
    { label: "Bedrooms", render: (u) => String(u.bedrooms) },
    { label: "Bathrooms", render: (u) => String(u.bathrooms) },
    { label: "Floor Area", render: (u) => formatArea(u.floorAreaSqm) },
    { label: "Parking", render: (u) => String(u.parkingSpaces) },
    { label: "Home Office", render: (u) => u.homeOffice },
    { label: "Maid\u2019s Room", render: (u) => u.maidsRoom },
    { label: "Garden", render: (u) => u.garden },
    { label: "Price From", render: (u) => formatPrice(u.priceFrom) },
  ];

  return (
    <section className="bg-warm-white py-20 sm:py-24">
      <div className="container-site">
        <Reveal>
<SectionHeading
            interactive
            eyebrow="Compare"
            title="Compare properties side by side"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Select properties to compare">
            {housingUnits.map((unit) => (
              <button
                key={unit.slug}
                type="button"
                onClick={() => toggleUnit(unit.slug)}
                aria-pressed={selected.includes(unit.slug)}
                className={cn(
                  "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                  selected.includes(unit.slug)
                    ? "border-navy bg-navy text-white"
                    : "border-grey-line bg-white text-navy hover:border-navy/50",
                )}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </Reveal>

        {selectedUnits.length > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-grey-line bg-white">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-grey-line bg-cream">
                    <th scope="col" className="px-5 py-4 font-semibold text-navy">Feature</th>
                    {selectedUnits.map((unit) => (
                      <th key={unit.slug} scope="col" className="px-5 py-4 text-base text-navy">
                        {unit.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={cn("border-b border-grey-line last:border-0", i % 2 === 0 ? "bg-white" : "bg-off-white/50")}>
                      <th scope="row" className="px-5 py-3 font-semibold text-navy">{row.label}</th>
                      {selectedUnits.map((unit) => {
                        const val = row.render(unit);
                        return (
                          <td key={unit.slug} className="px-5 py-3 text-text-grey">
                            {typeof val === "boolean" ? (
                              val ? <Check className="h-4 w-4 text-sage" /> : <X className="h-4 w-4 text-grey-line" />
                            ) : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
