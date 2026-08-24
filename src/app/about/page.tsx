import type { Metadata } from "next";
import { BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { PageBackground } from "@/components/ui/PageBackground";
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
      <header className="bg-off-white pb-10 pt-28 sm:pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="About Us"
            title={`Building in ${site.location}`}
            description={`${site.legalName} (SDCL) builds residential estates focused on quality construction, good planning, and transparent processes.`}
          />
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: FileCheck2,
                  title: "Registered Company",
                  text: `Registered with CAC as ${site.legalName}. Verifiable corporate entity.`,
                },
                {
                  icon: ShieldCheck,
                  title: "Documented Land Title",
                  text: `${site.landTitleStatus}. Full title documentation provided at purchase.`,
                },
                {
                  icon: BadgeCheck,
                  title: "Clear Pricing",
                  text: "Published prices, documented terms, written agreements. No undocumented payments.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-grey-line bg-white p-6">
                  <item.icon className="h-6 w-6 text-brand-blue-deep" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-bold text-navy">{item.title}</h2>
                  <p className="mt-2 text-sm text-text-grey">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold text-navy">What We Do</h2>
                <p className="mt-4 text-base leading-relaxed text-text-grey">
                  StellarVera Development Company Limited builds residential estates in Nigerian cities.
                  We focus on masterplanning, quality construction, and processes that buyers can verify.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-grey">
                  Wellsprings Ibadan is our flagship estate: 25 acres of residential living in Jericho.
                  Underground drainage, borehole water, paved roads, and communal parks form the infrastructure.
                  Six property types, ranging from apartments to detached villas, sit within the plan.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-grey-line bg-cream p-8">
                <p className="eyebrow mb-4 text-brand-blue-deep">Design & Build Partners</p>
                <ul className="space-y-3">
                  {partners.map((partner) => (
                    <li key={partner} className="flex items-center gap-3 border-b border-grey-line py-3 last:border-b-0">
                      <span className="h-2 w-2 rounded-full bg-brand-blue" aria-hidden="true" />
                      <span className="text-base font-semibold text-navy">{partner}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-text-grey">
                  Architecture by Studio Stoone Designs. Structural engineering by KOA Consultants.
                  Project management by African United Consultants. Urban planning by Place-Make.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-navy">What You Can Verify</h2>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {trustItems.map((item) => (
                  <div key={item.label} className="rounded-xl border border-grey-line bg-white p-6">
                    <dt className="text-sm font-medium text-text-grey">{item.label}</dt>
                    <dd className="mt-1 text-lg font-bold text-navy">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
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
