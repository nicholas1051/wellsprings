"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero").then((m) => m.Hero), {
  ssr: false,
  loading: () => (
    <section className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="min-h-[625px] rounded-[28px] bg-navy" />
    </section>
  ),
});
const SitePlan = dynamic(() => import("@/components/home/SitePlan").then((m) => m.SitePlan), { ssr: false });

import { GradientBlobs } from "@/components/ui/GradientBlobs";
import { TopoLines } from "@/components/ui/TopoLines";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { Architecture } from "@/components/home/Architecture";
import { WhyWellsprings } from "@/components/home/WhyWellsprings";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { LocationSection } from "@/components/home/LocationSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HowToOwn } from "@/components/home/HowToOwn";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <div id="hero" className="relative mb-8 sm:mb-12">
        <TopoLines variant="hero" />
        <GradientBlobs blobs={[
          { color: "blue", size: 800, className: "top-[-200px] right-[-200px]" },
          { color: "terracotta", size: 600, className: "bottom-[-100px] left-[-150px]", delay: 0.3 },
        ]} />
        <Hero />
      </div>

      <WhyWellsprings />

      <div className="relative mb-8 sm:mb-12">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-50px] right-[-150px]" },
          { color: "sage", size: 500, className: "bottom-[-100px] left-[-200px]", delay: 0.3 },
        ]} />
        <FeaturedProperties />
      </div>

      <div className="relative mb-8 sm:mb-12">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-50px] right-[-150px]" },
          { color: "sage", size: 500, className: "bottom-[-100px] left-[-200px]", delay: 0.3 },
        ]} />
        <Architecture />
      </div>

      <div id="features" className="relative mb-8 sm:mb-12">
        <GradientBlobs blobs={[
          { color: "terracotta", size: 600, className: "top-[50px] left-[-150px]" },
          { color: "blue", size: 500, className: "bottom-[-50px] right-[-100px]", delay: 0.2 },
        ]} />
        <KeyFeatures />
      </div>

      <div className="relative mb-8 sm:mb-12">
        <TopoLines variant="location" />
        <GradientBlobs blobs={[
          { color: "blue", size: 800, className: "top-[-150px] left-[-200px]" },
          { color: "sage", size: 600, className: "bottom-[-100px] right-[-150px]", delay: 0.3 },
        ]} />
        <LocationSection />
      </div>

      <div className="relative mb-8 sm:mb-12">
        <TopoLines variant="siteplan" />
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[-100px] right-[-200px]" },
          { color: "terracotta", size: 500, className: "bottom-[-50px] left-[-150px]", delay: 0.3 },
        ]} />
        <SitePlan />
      </div>

      <div className="relative mb-8 sm:mb-12">
        <GradientBlobs blobs={[
          { color: "sage", size: 600, className: "top-[50px] left-[-150px]" },
          { color: "blue", size: 500, className: "bottom-[-50px] right-[-100px]", delay: 0.2 },
        ]} />
        <TrustStrip />
      </div>

      <div className="mb-8 sm:mb-12">
        <HowToOwn />
      </div>

      <div id="faq" className="relative mb-8 sm:mb-12">
        <GradientBlobs blobs={[
          { color: "blue", size: 700, className: "top-[0px] left-[-200px]" },
          { color: "terracotta", size: 500, className: "bottom-[-50px] right-[-150px]", delay: 0.3 },
        ]} />
        <FaqSection />
      </div>

      <FinalCta />
    </>
  );
}
