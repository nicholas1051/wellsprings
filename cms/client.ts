/**
 * Sanity client configuration.
 *
 * Before using, install Sanity:
 *   npm install sanity @sanity/image-url @sanity/vision
 *
 * Then create a .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_READ_TOKEN=your-read-token
 *
 * And run:
 *   sanity init --template clean --create-project "Wellsprings Ibadan"
 *   sanity schema deploy
 */

// import { createClient } from "next-sanity";
// import imageUrlBuilder from "@sanity/image-url";

// export const sanityConfig = {
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2024-01-01",
//   useCdn: process.env.NODE_ENV === "production",
// };

// export const sanityClient = createClient(sanityConfig);

// const builder = imageUrlBuilder(sanityClient);

// export function urlFor(source: { _ref?: string; asset?: { _ref?: string } }) {
//   return builder.image(source);
// }

/**
 * GROQ queries for fetching CMS content.
 * These mirror the current static data structure.
 */
export const queries = {
  allProperties: `*[_type == "property"] | order(order asc) {
    _id,
    name,
    fullName,
    slug,
    tagline,
    propertyType,
    priceFrom,
    status,
    unitsLeft,
    bedrooms,
    bathrooms,
    toilets,
    floorAreaSqm,
    parkingSpaces,
    homeOffice,
    maidsRoom,
    description,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    gallery[] {
      "src": src.asset->url,
      alt
    },
    "floorPlanGround": floorPlanGround.asset->url,
    "floorPlanFirst": floorPlanFirst.asset->url,
    rooms,
    features,
    artImpression
  }`,

  propertyBySlug: `*[_type == "property" && slug.current == $slug][0] {
    ...
  }`,

  allGalleryImages: `*[_type == "galleryImage"] | order(order asc) {
    _id,
    "src": src.asset->url,
    alt,
    category,
    isArtisticImpression
  }`,

  siteSettings: `*[_type == "siteSettings"][0] {
    brandName,
    tagline,
    phone,
    phoneAlt,
    email,
    officeAddress,
    salesHours,
    siteVisitNote,
    socialLinks,
    availability[] {
      "propertyName": propertyRef->name,
      "propertySlug": propertyRef->slug.current,
      totalUnits,
      soldUnits,
      reservedUnits,
      currentPriceOverride,
      updatedAt
    },
    paymentPlans
  }`,
} as const;
