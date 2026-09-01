import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { PageBackground } from "@/components/ui/PageBackground";
import { CompanyStory } from "@/components/about/CompanyStory";
import { EstateStory } from "@/components/about/EstateStory";
import { GeneralFeatures } from "@/components/about/GeneralFeatures";
import { VerifySection } from "@/components/about/VerifySection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { trustItems } from "@/data/why";
import { site, partners } from "@/data/site";

export const metadata: Metadata = {
  title: `About StellarVera | ${site.brandName}`,
  description: `About ${site.legalName} (SDCL), the developer behind ${site.brandName}. Building residential estates in ${site.location}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageBackground blobs={[
      { color: "blue", size: 800, className: "top-[-200px] left-[-200px]" },
      { color: "sage", size: 600, className: "bottom-[-100px] right-[-150px]", delay: 0.3 },
    ]}>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/stellavera-development.jpg"
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
          <p className="eyebrow mb-3 text-brand-blue">About StellarVera</p>
          <h1 className="font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            Building in {site.location}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {`${site.legalName} (SDCL) is the development company behind ${site.brandName}, the ultra-modern Jericho estate in the heart of Ibadan.`}
          </p>
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <CompanyStory />

          <div className="mt-24">
            <EstateStory />
          </div>

          <div className="mt-24">
            <GeneralFeatures />
          </div>

          <div className="mt-24">
            <VerifySection trustItems={trustItems} />
          </div>

          <div className="mt-24">
            <PartnersSection partners={partners.map((p) => p.name)} />
          </div>

          <Reveal delay={0.05}>
            <div className="mt-24 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Visit the estate</h2>
                <p className="mt-1 text-sm text-white/70">
                  Walk the units and see the construction quality in person.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <BookViewingButton source="about-page" className="shrink-0" label="Schedule a Visit" />
                <ButtonLink
                  href="/contact"
                  variant="outline-white"
                  className="shrink-0"
                >
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageBackground>
  );
}