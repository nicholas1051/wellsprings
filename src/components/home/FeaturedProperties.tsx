"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import { housingUnits } from "@/data/properties";
import { formatPrice } from "@/data/properties";
import { EstateImage } from "@/components/ui/EstateImage";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";
import { cn } from "@/lib/utils";

const tagLabels: Record<string, { label: string; color: string }> = {
  pearl: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
  moonstone: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
  aquamarine: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
  coral: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
  emerald: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
  opal: { label: "Available", color: "bg-brand-blue-light text-brand-blue-deep" },
};

export function FeaturedProperties() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section className="pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div ref={ref} className="container-site">
        <div className="mb-7.5 flex items-end justify-between gap-5">
          <div>
            <motion.p
              className="eyebrow mb-2.5 text-brand-blue-deep"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              Explore our selection
            </motion.p>
            <InteractiveHeading text="Featured Properties" className="font-heading text-[clamp(34px,4.2vw,50px)] leading-[1.04] tracking-[-0.045em] text-navy" />
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1.5 text-xs font-extrabold text-brand-blue-deep transition-colors hover:text-brand-blue-dark"
          >
            View All Properties
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {housingUnits.map((unit, i) => (
            <PropertyCard key={unit.slug} unit={unit} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ unit, index, isInView }: {
  unit: typeof housingUnits[number];
  index: number;
  isInView: boolean;
}) {
  const tag = tagLabels[unit.slug];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group overflow-hidden rounded-[19px] border border-grey-line bg-white shadow-sm transition-all hover:-translate-y-[5px] hover:shadow-xl hover:border-[#CFDFEC]"
    >
      <div className="relative h-[250px] overflow-hidden">
        <EstateImage
          src={unit.heroImage}
          alt={unit.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {tag && (
          <span className={cn("absolute left-3 top-3 rounded-lg px-2.5 py-1.5 text-xs font-extrabold", tag.color)}>
            {tag.label}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-[19px] font-bold text-navy">{unit.name}</h3>
        <div className="mb-3 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3 w-3" />
          Jericho, Ibadan
        </div>

        <div className="mb-3.5 flex flex-wrap gap-4 border-b border-[#EDF1F5] pb-3.5 text-xs text-[#697687]">
          <span className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5" />{unit.bedrooms} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" />{unit.bathrooms} Baths</span>
          <span className="flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5" />{unit.floorAreaSqm} sqm</span>
        </div>

        <div className="flex items-center justify-between gap-2.5">
          <div>
            <p className="text-[17px] font-extrabold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {formatPrice(unit.priceFrom)}
            </p>
          </div>
          <Link
            href={`/properties/${unit.slug}`}
            className="rounded-lg bg-brand-blue px-3.5 py-2.5 text-xs font-extrabold text-white transition-all hover:bg-brand-blue-dark"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
