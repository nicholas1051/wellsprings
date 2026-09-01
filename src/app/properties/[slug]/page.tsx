import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { housingUnits, unitBySlug, formatPrice, propertyTypeLabels } from "@/data/properties";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { formatArea } from "@/lib/format";
import { residenceLd } from "@/lib/schema";
import { FloorPlanExplorer } from "@/components/home/FloorPlanExplorer";
import { PropertyComparison } from "@/components/home/PropertyComparison";
import { MortgageCalculator } from "@/components/home/MortgageCalculator";
import { EstateImage } from "@/components/ui/EstateImage";
import { PropertySpecs, PropertyGallery, PropertySidebar } from "@/components/properties/PropertyDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return housingUnits.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = unitBySlug(slug);
  if (!unit) return {};
  return {
    title: `${unit.name} — ${unit.fullName} | ${site.brandName}`,
    description: `${unit.tagline} Starting from ${formatPrice(unit.priceFrom)}. ${unit.bedrooms} bedrooms, ${unit.bathrooms} bathrooms, ${formatArea(unit.floorAreaSqm)}.`,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title: `${unit.name} | ${site.brandName}`,
      description: unit.tagline,
      images: [{ url: unit.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const unit = unitBySlug(slug);
  if (!unit) notFound();

  const otherUnits = housingUnits.filter((u) => u.slug !== unit.slug).slice(0, 3);

  const specs = [
    { iconName: "BedDouble", label: "Bedrooms", value: String(unit.bedrooms) },
    { iconName: "Bath", label: "Bathrooms", value: String(unit.bathrooms) },
    { iconName: "Ruler", label: "Floor Area", value: formatArea(unit.floorAreaSqm) },
    { iconName: "Car", label: "Parking", value: `${unit.parkingSpaces} ${unit.parkingSpaces > 1 ? "Spaces" : "Space"}` },
    ...(unit.homeOffice ? [{ iconName: "Briefcase", label: "Home Office", value: "Yes" }] : []),
    ...(unit.maidsRoom ? [{ iconName: "User", label: "Maid\u2019s Room", value: "Yes" }] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: residenceLd(unit) }}
      />

      <header className="relative min-h-[60vh] flex items-end overflow-hidden bg-navy">
        <EstateImage
          src={unit.heroImage}
          alt={unit.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="container-site relative z-10 pb-12 pt-40 text-center sm:pt-48">
          <Reveal>
            <nav className="mb-4 text-sm text-white/60">
              <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{unit.name}</span>
            </nav>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {propertyTypeLabels[unit.propertyType]}
              </span>
            </div>
            <h1 className="font-heading text-4xl text-white sm:text-5xl lg:text-6xl">{unit.name}</h1>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/80">{unit.fullName}</p>
          </Reveal>
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <Reveal>
                <PropertySpecs specs={specs} />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-navy">{unit.name}</h2>
                  <div className="mt-4 space-y-4">
                    {unit.description.map((para, i) => (
                      <p key={i} className="leading-relaxed text-text-grey">{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">Gallery</h2>
                  <PropertyGallery images={unit.gallery} unitName={unit.name} />
                  <p className="mt-2 text-xs text-text-grey italic">{unit.artImpression}</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <FloorPlanExplorer unit={unit} />
              </Reveal>

              <Reveal delay={0.15}>
                <MortgageCalculator price={unit.priceFrom} />
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <PropertySidebar unit={unit} />
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <PropertyComparison currentSlug={unit.slug} />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Explore More" title="Compare other property types" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {otherUnits.map((other) => (
              <Link
                key={other.slug}
                href={`/properties/${other.slug}`}
                className="group block overflow-hidden rounded-2xl border border-grey-line bg-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <EstateImage src={other.heroImage} alt={other.heroImageAlt} fill sizes="33vw" className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy group-hover:text-brand-blue transition-colors">{other.name}</h3>
                  <p className="text-sm text-text-grey">{other.bedrooms} bed &bull; {formatArea(other.floorAreaSqm)}</p>
                  <p className="mt-2 text-base font-bold text-navy">{formatPrice(other.priceFrom)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
