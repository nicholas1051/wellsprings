"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero").then((m) => m.Hero), {
  ssr: false,
  loading: () => (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" aria-hidden="true" />
      <div className="container-site relative z-10 pb-24 pt-48 sm:pb-32">
        <p className="eyebrow mb-5 text-gold">Wellsprings Ibadan</p>
        <h1 className="font-heading text-[2.5rem] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
          Dream. <span className="text-terracotta">Live</span>. Repeat.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl text-justify">
          Thoughtfully designed homes set within a serene and welcoming community.
          Wellsprings gives you the comfort and space to live well, work productively,
          and build meaningful connections. Because where you live should make life better.
        </p>
      </div>
    </section>
  ),
});
const SitePlan = dynamic(() => import("@/components/home/SitePlan").then((m) => m.SitePlan), { ssr: false });

import { GradientBlobs } from "@/components/ui/GradientBlobs";
import { TopoLines } from "@/components/ui/TopoLines";
import { Development } from "@/components/home/Development";
import { HomeUnits } from "@/components/home/HomeUnits";
import { Architecture } from "@/components/home/Architecture";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { LocationSection } from "@/components/home/LocationSection";
import { Why } from "@/components/home/Why";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FaqSection } from "@/components/home/FaqSection";
import { HowToOwn } from "@/components/home/HowToOwn";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <div id="hero" className="relative">
        <TopoLines variant="hero" />
        <GradientBlobs blobs={[
          { color: "blue", size: 800, className: "top-[-200px] right-[-200px]" },
          { color: "terracotta", size: 600, className: "bottom-[-100px] left-[-150px]", delay: 0.3 },
        ]} />
        <Hero />
      </div>

      <div className="relative">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-100px] left-[-200px]" },
          { color: "sage", size: 500, className: "bottom-[-50px] right-[-100px]", delay: 0.2 },
        ]} />
        <Development />
      </div>

      <div className="relative">
        <GradientBlobs blobs={[
          { color: "terracotta", size: 600, className: "top-[100px] right-[-200px]" },
          { color: "blue", size: 500, className: "bottom-[50px] left-[-150px]", delay: 0.2 },
        ]} />
        <HomeUnits />
      </div>

      <div className="relative">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-50px] right-[-150px]" },
          { color: "sage", size: 500, className: "bottom-[-100px] left-[-200px]", delay: 0.3 },
        ]} />
        <Architecture />
      </div>

      <div id="features" className="relative">
        <GradientBlobs blobs={[
          { color: "terracotta", size: 600, className: "top-[50px] left-[-150px]" },
          { color: "blue", size: 500, className: "bottom-[-50px] right-[-100px]", delay: 0.2 },
        ]} />
        <KeyFeatures />
      </div>

      <div id="gallery-preview" className="relative">
        <GradientBlobs blobs={[
          { color: "sage", size: 700, className: "top-[-100px] right-[-200px]" },
          { color: "gold", size: 500, className: "bottom-[50px] left-[-150px]", delay: 0.2 },
        ]} />
        <GalleryPreview />
      </div>

      <div className="relative">
        <TopoLines variant="location" />
        <GradientBlobs blobs={[
          { color: "blue", size: 800, className: "top-[-150px] left-[-200px]" },
          { color: "sage", size: 600, className: "bottom-[-100px] right-[-150px]", delay: 0.3 },
        ]} />
        <LocationSection />
      </div>

      <div id="why" className="relative">
        <GradientBlobs blobs={[
          { color: "terracotta", size: 600, className: "top-[0px] right-[-150px]" },
          { color: "gold", size: 500, className: "bottom-[-50px] left-[-100px]", delay: 0.2 },
        ]} />
        <Why />
      </div>

      <div className="relative">
        <TopoLines variant="siteplan" />
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-100px] right-[-200px]" },
          { color: "terracotta", size: 500, className: "bottom-[50px] left-[-150px]", delay: 0.3 },
        ]} />
        <SitePlan />
      </div>

      <div className="relative">
        <GradientBlobs blobs={[
          { color: "sage", size: 600, className: "top-[50px] left-[-150px]" },
          { color: "blue", size: 500, className: "bottom-[-50px] right-[-100px]", delay: 0.2 },
        ]} />
        <TrustStrip />
      </div>

      <div className="relative">
        <GradientBlobs blobs={[
          { color: "terracotta", size: 600, className: "top-[-50px] right-[-150px]" },
          { color: "sage", size: 500, className: "bottom-[50px] left-[-100px]", delay: 0.2 },
        ]} />
        <HowToOwn />
      </div>

      <div id="faq" className="relative">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[0px] left-[-200px]" },
          { color: "terracotta", size: 500, className: "bottom-[-50px] right-[-150px]", delay: 0.3 },
        ]} />
        <FaqSection />
      </div>

      <div className="relative">
        <TopoLines variant="hero" />
        <GradientBlobs blobs={[
          { color: "terracotta", size: 800, className: "top-[-150px] left-[-200px]" },
          { color: "blue", size: 600, className: "bottom-[-100px] right-[-150px]", delay: 0.3 },
          { color: "gold", size: 400, className: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2", delay: 0.5 },
        ]} />
        <FinalCta />
      </div>
    </>
  );
}
