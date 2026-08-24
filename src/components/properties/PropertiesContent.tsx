"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import { housingUnits, formatPrice, propertyTypeLabels, type PropertyType } from "@/data/properties";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";

const filters: { label: string; value: PropertyType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Villa", value: "villa" },
  { label: "Duplex", value: "duplex" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Apartment", value: "apartment" },
];

const specIcons = [
  { key: "beds", icon: Bed, label: "Beds" },
  { key: "baths", icon: Bath, label: "Baths" },
  { key: "area", icon: Maximize, label: "m²" },
];

function WordStagger({ text, reduceMotion }: { text: string; reduceMotion: boolean }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={reduceMotion ? {} : { opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function PropertyCard({ unit, index, reduceMotion }: { unit: (typeof housingUnits)[number]; index: number; reduceMotion: boolean }) {
  return (
    <Reveal key={unit.slug} delay={(index % 3) * 0.08} once={false}>
      <Link
        href={`/properties/${unit.slug}`}
        className="group block overflow-hidden rounded-2xl border border-grey-line bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={unit.heroImage}
            alt={unit.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={unit.status} unitsLeft={unit.unitsLeft} />
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {propertyTypeLabels[unit.propertyType]}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-navy group-hover:text-terracotta transition-colors">
            {unit.name}
          </h2>
          <p className="mt-1 text-sm text-text-grey line-clamp-2">{unit.tagline}</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-text-grey uppercase tracking-wide font-medium">From</p>
              <p className="text-xl font-bold text-navy">{formatPrice(unit.priceFrom)}</p>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-terracotta opacity-0 transition-opacity group-hover:opacity-100">
              View Details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-text-grey">
            <motion.span
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.1, color: "var(--color-terracotta)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Bed className="h-3.5 w-3.5" aria-hidden="true" />
              {unit.bedrooms} Beds
            </motion.span>
            <motion.span
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.1, color: "var(--color-terracotta)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Bath className="h-3.5 w-3.5" aria-hidden="true" />
              {unit.bathrooms} Baths
            </motion.span>
            <motion.span
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.1, color: "var(--color-terracotta)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Maximize className="h-3.5 w-3.5" aria-hidden="true" />
              {unit.floorAreaSqm}m²
            </motion.span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function PropertiesContent() {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;
  const [activeFilter, setActiveFilter] = useState<PropertyType | "all">("all");

  const filtered = activeFilter === "all"
    ? housingUnits
    : housingUnits.filter((u) => u.propertyType === activeFilter);

  return (
    <>
      <header className="bg-off-white pb-10 pt-28 sm:pt-36">
        <div className="container-site">
          <p className="eyebrow mb-3 text-terracotta">Properties</p>
          <h1 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">
            <WordStagger text="Six property types at Wellsprings" reduceMotion={reduced} />
          </h1>
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-text-grey sm:text-lg"
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            From the Opal apartment to the Pearl villa. Every type available at one estate.
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-text-grey"
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Wellsprings sits on a quiet stretch in Jericho. Old Bodija is just minutes away, the Dugbe business district is 10 km, and University College Hospital is 4 km. The estate is tucked off the main road, away from traffic and noise.
          </motion.p>
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <motion.div
            className="mb-10 flex flex-wrap gap-2"
            initial={reduced ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  activeFilter === f.value
                    ? "text-white"
                    : "text-text-grey hover:text-navy bg-white border border-grey-line"
                }`}
              >
                {activeFilter === f.value && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((unit, index) => (
              <PropertyCard key={unit.slug} unit={unit} index={index} reduceMotion={reduced} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-text-grey">No properties match this filter.</p>
          )}
        </div>
      </section>
    </>
  );
}
