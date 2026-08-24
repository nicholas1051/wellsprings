import type { Metadata } from "next";
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
      <header className="bg-off-white pb-10 pt-28 sm:pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="Gallery"
            title="See the estate"
            description="Photos of the estate, homes, and construction progress. Tap any image to view it larger. Images marked \u201CArtistic Impression\u201D are illustrative renders."
          />
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
