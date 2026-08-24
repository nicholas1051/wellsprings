"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Share2, Check, X, ChevronLeft, ChevronRight, BedDouble, Bath, Ruler, Car, Briefcase, User } from "lucide-react";
import type { HousingUnit } from "@/data/properties";
import { formatPrice, propertyTypeLabels } from "@/data/properties";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { EstateImage } from "@/components/ui/EstateImage";
import { formatArea, formatFullPrice } from "@/lib/format";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BedDouble, Bath, Ruler, Car, Briefcase, User,
};

function useCountPrice(target: number, inView: boolean, reduceMotion: boolean) {
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion || !inView) {
      if (reduceMotion) setValue(target);
      return;
    }
    setValue(0);
    let start = 0;
    const startTime = performance.now();
    const durationMs = 1600;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      if (current !== start) {
        start = current;
        setValue(current);
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, reduceMotion]);

  return value;
}

function SpecCard({ spec, index }: { spec: { iconName: string; label: string; value: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const Icon = iconMap[spec.iconName] ?? BedDouble;

  return (
    <motion.div
      ref={ref}
      className="group flex items-center gap-3 rounded-xl border border-grey-line bg-cream px-4 py-3 transition-all duration-300 hover:border-terracotta/30 hover:shadow-md"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.06, type: "spring", stiffness: 200 }}
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-terracotta/10 text-terracotta transition-all duration-300 group-hover:bg-terracotta group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs text-text-grey">{spec.label}</p>
        <p className="text-base font-bold text-navy">{spec.value}</p>
      </div>
    </motion.div>
  );
}

function GalleryLightbox({ images, unitName }: { images: { src: string; alt: string }[]; unitName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-grey-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <EstateImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-navy shadow-lg backdrop-blur-sm">
                View
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" role="dialog" aria-label={`${unitName} gallery`}>
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1))}
            className="absolute left-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1))}
            className="absolute right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[80vh] max-w-[90vw]"
          >
            <EstateImage
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] rounded-lg object-contain"
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {images[activeIndex].alt}
          </p>

          <div className="absolute bottom-6 right-6 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SidebarPrice({ unit }: { unit: HousingUnit }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const price = useCountPrice(unit.priceFrom, isInView, !!reduceMotion);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div ref={ref} className="rounded-2xl border border-grey-line bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">Starting from</p>
      <p className="mt-1 font-heading text-3xl text-navy">
        {reduceMotion ? formatPrice(unit.priceFrom) : `₦${price.toLocaleString()}`}
      </p>
      <p className="mt-1 text-xs text-text-grey">{formatFullPrice(unit.priceFrom)}</p>

      <div className="mt-6 space-y-3">
        <BookViewingButton unit={unit.slug} source="property-page" className="w-full" label="Schedule a Visit" />
        <ButtonLink href="/contact" variant="outline" size="lg" className="w-full">
          Enquire About This Unit
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>

      <motion.button
        type="button"
        onClick={handleShare}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-grey-line bg-cream px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-terracotta hover:bg-terracotta/5 hover:text-terracotta"
      >
        {copied ? <Check className="h-4 w-4 text-sage" /> : <Share2 className="h-4 w-4" />}
        {copied ? "Link Copied!" : "Share This Property"}
      </motion.button>

      <div className="mt-6 rounded-xl bg-cream p-4">
        <h3 className="text-sm font-bold text-navy">Included</h3>
        <ul className="mt-2 space-y-1.5">
          {unit.features.map((f, i) => (
            <motion.li
              key={f}
              className="flex items-center gap-2 text-xs text-text-grey"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            >
              <span className="h-1 w-1 rounded-full bg-terracotta" aria-hidden="true" />
              {f}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PropertyDetailClient({ unit }: { unit: HousingUnit }) {
  return { specs: true, gallery: true, sidebar: true };
}

export function PropertySpecs({ specs }: { specs: { iconName: string; label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {specs.map((spec, index) => (
        <SpecCard key={spec.label} spec={spec} index={index} />
      ))}
    </div>
  );
}

export function PropertyGallery({ images, unitName }: { images: { src: string; alt: string }[]; unitName: string }) {
  return <GalleryLightbox images={images} unitName={unitName} />;
}

export function PropertySidebar({ unit }: { unit: HousingUnit }) {
  return <SidebarPrice unit={unit} />;
}
