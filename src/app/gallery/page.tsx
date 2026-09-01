import type { Metadata } from "next";
import Image from "next/image";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBackground } from "@/components/ui/PageBackground";
import { galleryItems } from "@/data/gallery";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Gallery | ${site.brandName}`,
  description:
    "Browse photos of the estate, homes, construction progress, and amenities at Wellsprings Ibadan.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <PageBackground blobs={[
      { color: "sage", size: 800, className: "top-[-200px] right-[-200px]" },
      { color: "gold", size: 600, className: "bottom-[-100px] left-[-150px]", delay: 0.3 },
    ]}>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-2.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(23,38,58,.88) 0%, rgba(23,38,58,.75) 40%, rgba(23,38,58,.82) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 container-site py-28 text-center sm:pt-36 sm:pb-12">
          <p className="eyebrow mb-3 text-brand-blue">Gallery</p>
          <h1 className="font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            See the estate
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Photos of the estate, homes, and construction progress. Tap any image to view it larger. Images marked &ldquo;Artistic Impression&rdquo; are illustrative renders.
          </p>
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <GalleryGrid items={galleryItems} showFilter />
        </div>
      </section>
    </PageBackground>
  );
}
