"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { EstateImage } from "@/components/ui/EstateImage";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Bath, BedDouble, Car, Ruler, Home, Briefcase, User } from "lucide-react";
import { housingUnits, statusLabels, formatPrice, type UnitSlug } from "@/data/properties";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { ButtonLink } from "@/components/ui/Button";
import { formatArea } from "@/lib/format";
import { cn } from "@/lib/utils";

const unitStats = (unit: (typeof housingUnits)[number]) => [
  { icon: BedDouble, label: "Bedrooms", value: String(unit.bedrooms) },
  { icon: Bath, label: "Bathrooms", value: String(unit.bathrooms) },
  { icon: Ruler, label: "Floor Area", value: formatArea(unit.floorAreaSqm) },
  { icon: Car, label: "Parking", value: String(unit.parkingSpaces) },
  ...(unit.homeOffice ? [{ icon: Briefcase, label: "Home Office", value: "Yes" }] : []),
  ...(unit.maidsRoom ? [{ icon: User, label: "Maid\u2019s Room", value: "Yes" }] : []),
];

function usePriceCounter(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    if (from === target) return;

    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
}

export function HomeUnits() {
  const [activeSlug, setActiveSlug] = useState<UnitSlug>("pearl");
  const active = housingUnits.find((unit) => unit.slug === activeSlug) ?? housingUnits[0];
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const translatedPrice = usePriceCounter(active.priceFrom);
  const [tabOffsets, setTabOffsets] = useState<Record<string, { left: number; width: number }>>({});
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTabClick = useCallback(
    (slug: UnitSlug, el: HTMLButtonElement) => {
      setActiveSlug(slug);
      setHasInteracted(true);
      const rect = el.getBoundingClientRect();
      const listRect = tabListRef.current?.getBoundingClientRect();
      if (listRect) {
        setTabOffsets((prev) => ({
          ...prev,
          [slug]: { left: rect.left - listRect.left, width: rect.width },
        }));
      }
    },
    [],
  );

  const activeOffset = tabOffsets[activeSlug];

  return (
    <section id="houses" className="scroll-mt-24 bg-warm-white py-24 sm:py-32">
      <div className="container-site">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3 text-terracotta">Our Properties</p>
          <h2 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Six property types, one estate
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-grey">
            From the Opal apartment to the Pearl villa, every type is available at Wellsprings.
          </p>
        </div>

        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Property types"
          className="mx-auto mb-10 flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-full border border-grey-line bg-white p-1.5 relative"
        >
          {activeOffset && (
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-navy shadow-md"
              animate={{ left: activeOffset.left, width: activeOffset.width }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          {housingUnits.map((unit) => (
            <button
              key={unit.slug}
              type="button"
              role="tab"
              id={`tab-${unit.slug}`}
              aria-selected={activeSlug === unit.slug}
              aria-controls={`panel-${unit.slug}`}
              ref={(el) => {
                if (el && activeSlug === unit.slug) {
                  const rect = el.getBoundingClientRect();
                  const listRect = tabListRef.current?.getBoundingClientRect();
                  if (listRect && !tabOffsets[unit.slug]) {
                    setTabOffsets((prev) => ({
                      ...prev,
                      [unit.slug]: { left: rect.left - listRect.left, width: rect.width },
                    }));
                  }
                }
              }}
              onClick={(e) => handleTabClick(unit.slug, e.currentTarget)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 relative z-10",
                activeSlug === unit.slug
                  ? "text-white"
                  : "text-navy hover:text-navy",
              )}
            >
              {unit.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeSlug}`}
          aria-labelledby={`tab-${activeSlug}`}
          className="overflow-hidden rounded-2xl border border-grey-line bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {hasInteracted ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative min-h-72 lg:min-h-[28rem] overflow-hidden cursor-default"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
                  <EstateImage
                    src={active.heroImage}
                    alt={active.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <StatusBadge status={active.status} unitsLeft={active.unitsLeft} />
                </div>
              </motion.div>
            </AnimatePresence>
            ) : (
              <div className="relative min-h-72 lg:min-h-[28rem] overflow-hidden cursor-default">
                <EstateImage
                  src={active.heroImage}
                  alt={active.heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <StatusBadge status={active.status} unitsLeft={active.unitsLeft} />
                </div>
              </div>
            )}

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-navy sm:text-3xl">{active.fullName}</h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-text-grey">{active.tagline}</p>

              {hasInteracted ? (
                <AnimatePresence mode="wait">
                  <motion.dl
                    key={active.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
                  >
                    {unitStats(active).map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="rounded-xl bg-cream/60 p-3.5 cursor-default transition-all duration-200 hover:shadow-md hover:bg-brand-blue/10 hover:border hover:border-brand-blue/20"
                      >
                        <stat.icon className="h-5 w-5 text-brand-blue transition-transform duration-200" aria-hidden="true" />
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="mt-1.5 text-lg font-bold text-navy">{stat.value}</dd>
                        <dd className="text-xs font-medium text-text-grey">{stat.label}</dd>
                      </motion.div>
                    ))}
                  </motion.dl>
                </AnimatePresence>
              ) : (
                <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {unitStats(active).map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-cream/60 p-3.5 cursor-default"
                    >
                      <stat.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="mt-1.5 text-lg font-bold text-navy">{stat.value}</dd>
                      <dd className="text-xs font-medium text-text-grey">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-6 rounded-xl border border-grey-line bg-cream px-5 py-4 text-navy">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">Starting from</p>
                <p className="text-2xl font-bold text-navy">
                  {formatPrice(translatedPrice)}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={`/properties/${active.slug}`} variant="navy" className="hover:scale-[1.03] hover:shadow-md transition-all duration-200">
                  View Full Details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <BookViewingButton unit={active.slug} source="home-selector" variant="outline" label="Schedule a Visit" className="hover:scale-[1.03] hover:shadow-md transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
