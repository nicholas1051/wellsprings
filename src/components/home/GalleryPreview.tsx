"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { galleryItems } from "@/data/gallery";
import { useLightbox } from "@/components/gallery/Lightbox";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const preview = galleryItems.slice(0, 10);

export function GalleryPreview() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lightbox = useLightbox();

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - track.parentElement!.offsetWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="bg-warm-white py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="See the estate"
              description="Photos of the estate, homes, and construction progress."
            />
            <ButtonLink href="/gallery" variant="outline">
              View Full Gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {preview.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => lightbox.open(preview, preview.indexOf(item))}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-grey-line"
              >
                <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-warm-white overflow-hidden" style={{ height: "100vh" }}>
      <div className="container-site pt-24 sm:pt-32">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title="See the estate"
            description="Scroll to explore photos of the estate, homes, and construction progress."
          />
          <ButtonLink href="/gallery" variant="outline">
            View Full Gallery
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-5 px-6 sm:px-12"
          style={{ width: "max-content" }}
        >
          {preview.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => lightbox.open(preview, index)}
              className="group relative flex-shrink-0 w-[70vw] sm:w-[40vw] lg:w-[28vw] aspect-[4/3] overflow-hidden rounded-2xl border border-grey-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-dark"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-navy shadow-lg backdrop-blur-sm">
                  <ZoomIn className="h-6 w-6" />
                </span>
              </span>
              {item.isArtisticImpression && (
                <span className="absolute top-3 right-3 rounded-full bg-brand-blue/80 px-2.5 py-1 text-[0.65rem] font-medium text-white backdrop-blur-sm">
                  Artistic Impression
                </span>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {item.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="container-site pb-8 pt-6">
        <div className="flex items-center gap-2 text-sm text-text-grey">
          <span className="inline-block h-px flex-1 bg-grey-line" />
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <span className="inline-block h-px flex-1 bg-grey-line" />
        </div>
      </div>
    </section>
  );
}
