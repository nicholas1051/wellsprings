import { site } from "@/data/site";
import type { HousingUnit } from "@/data/properties";

export function organizationLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.brandName,
    url: site.siteUrl,
    telephone: site.phone.display,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.officeAddress,
      addressLocality: "Ibadan",
      addressRegion: "Oyo State",
      addressCountry: "NG",
    },
    logo: `${site.siteUrl}/wellsprings-logo.png`,
    sameAs: [site.social.facebook, site.social.instagram, site.social.x],
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export function residenceLd(unit: HousingUnit) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: unit.fullName,
    image: [new URL(unit.heroImage, site.siteUrl).toString()],
    description: unit.tagline,
    numberOfRooms: unit.bedrooms,
    numberOfBathroomsTotal: unit.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: unit.floorAreaSqm,
      unitCode: "MTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ibadan",
      addressRegion: "Oyo State",
      addressCountry: "NG",
    },
    ...(unit.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: unit.priceFrom,
            priceCurrency: "NGN",
            availability:
              unit.status === "sold"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
          },
        }
      : {}),
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
