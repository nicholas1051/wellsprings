"use client";

import { useState } from "react";
import { EstateImage } from "@/components/ui/EstateImage";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { useLightbox } from "@/components/gallery/Lightbox";

interface GalleryGridProps {
  items: GalleryItem[];
  showFilter?: boolean;
  className?: string;
}

export function GalleryGrid({ items, showFilter = false, className }: GalleryGridProps) {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const lightbox = useLightbox();

  const visible =
    showFilter && category !== "all" ? items.filter((item) => item.category === category) : items;

  return (
    <div className={className}>
      {showFilter ? (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCategory(option.value)}
              aria-pressed={category === option.value}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === option.value
                  ? "border-navy bg-navy text-white"
                  : "border-grey-line bg-white text-navy hover:border-navy/50 hover:bg-tint",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
            onClick={() => lightbox.open(visible, index)}
            aria-label={`View larger: ${item.alt}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-grey-line bg-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-dark"
          >
            <EstateImage
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-lg backdrop-blur-sm">
                <ZoomIn className="h-5 w-5" />
              </span>
            </span>
            {item.isArtisticImpression && (
              <span className="absolute top-2 right-2 rounded-full bg-brand-blue/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                Artistic Impression
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
