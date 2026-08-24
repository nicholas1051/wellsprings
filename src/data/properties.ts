export type UnitStatus = "available" | "limited" | "reserved" | "sold";
export type PropertyType = "villa" | "duplex" | "bungalow" | "townhouse" | "apartment";
export type UnitSlug =
  | "pearl"
  | "moonstone"
  | "emerald"
  | "coral"
  | "aquamarine"
  | "opal";

export interface FloorPlanRoom {
  id: string;
  name: string;
  area: number;
  floor: "ground" | "first";
}

export interface HousingUnitGalleryImage {
  src: string;
  alt: string;
}

export interface HousingUnit {
  slug: UnitSlug;
  name: string;
  fullName: string;
  tagline: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  homeOffice: boolean;
  maidsRoom: boolean;
  parkingSpaces: number;
  floorAreaSqm: number;
  garden: boolean;
  priceFrom: number;
  status: UnitStatus;
  unitsLeft: number;
  heroImage: string;
  heroImageAlt: string;
  gallery: HousingUnitGalleryImage[];
  floorPlanGround: string;
  floorPlanFirst?: string;
  rooms: FloorPlanRoom[];
  features: string[];
  description: string[];
  artImpression: string;
}

export const housingUnits: HousingUnit[] = [
  {
    slug: "pearl",
    name: "Pearl",
    fullName: "Pearl: 5-Bedroom Detached Villa",
    tagline: "A prime patch of good taste. Five bedrooms, home office, 5.5 baths, and maid\u2019s room.",
    propertyType: "villa",
    bedrooms: 5,
    bathrooms: 5.5,
    homeOffice: true,
    maidsRoom: true,
    parkingSpaces: 2,
    floorAreaSqm: 472,
    garden: true,
    priceFrom: 90000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/pearl-hero.jpg",
    heroImageAlt: "Pearl 5-bedroom detached villa exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/pearl-1.jpg", alt: "Pearl grand living room with floor-to-ceiling windows" },
      { src: "/images/pearl-2.jpg", alt: "Pearl chef's kitchen with premium appliances" },
      { src: "/images/pearl-3.jpg", alt: "Pearl master suite with en-suite bathroom" },
      { src: "/images/pearl-4.jpg", alt: "Pearl private garden terrace" },
    ],
    floorPlanGround: "/images/pearl-ground.svg",
    floorPlanFirst: "/images/pearl-first.svg",
    rooms: [
      { id: "p-g1", name: "Entrance Foyer", area: 18, floor: "ground" },
      { id: "p-g2", name: "Living Room", area: 45, floor: "ground" },
      { id: "p-g3", name: "Dining Area", area: 28, floor: "ground" },
      { id: "p-g4", name: "Kitchen", area: 22, floor: "ground" },
      { id: "p-g5", name: "Guest Bedroom", area: 20, floor: "ground" },
      { id: "p-g6", name: "Home Office", area: 16, floor: "ground" },
      { id: "p-g7", name: "Maid's Room", area: 12, floor: "ground" },
      { id: "p-f1", name: "Master Suite", area: 38, floor: "first" },
      { id: "p-f2", name: "Bedroom 2", area: 22, floor: "first" },
      { id: "p-f3", name: "Bedroom 3", area: 22, floor: "first" },
      { id: "p-f4", name: "Bedroom 4", area: 20, floor: "first" },
      { id: "p-f5", name: "Family Lounge", area: 30, floor: "first" },
    ],
    features: ["Home Zone Security", "Drainage System", "Proper Town Planning", "Work-Life Balance", "24-Hour Power Supply", "24/7 Security", "Lush Green Area"],
    description: [
      "Pearl, the flagship house type, is built on about 850sqm of land with two floors. The ground floor features a large living room, easily accessed from the reception. The open-plan dining area leads to the garden, which overlooks the swimming pool. The kitchen space is ample. The ground floor also has a home office, guest bedroom, and maid\u2019s room.",
      "The upper floor has four ensuite rooms and a family lounge accessed from a gallery, which may be used for displaying art collections or family pictures and heirlooms. Show off your good taste; buy a Pearl.",
    ],
    artImpression: "Artistic Impression",
  },
  {
    slug: "moonstone",
    name: "Moonstone",
    fullName: "Moonstone: 4-Bedroom Semi-Detached Duplex",
    tagline: "Buy a Moonstone for a fresh start with your family.",
    propertyType: "duplex",
    bedrooms: 4,
    bathrooms: 4.5,
    homeOffice: true,
    maidsRoom: true,
    parkingSpaces: 2,
    floorAreaSqm: 334,
    garden: true,
    priceFrom: 86000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/moonstone-hero.jpg",
    heroImageAlt: "Moonstone 4-bedroom semi-detached duplex exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/moonstone-1.jpg", alt: "Moonstone double-height living room" },
      { src: "/images/moonstone-2.jpg", alt: "Moonstone modern kitchen with island" },
      { src: "/images/moonstone-3.jpg", alt: "Moonstone master bedroom suite" },
      { src: "/images/moonstone-4.jpg", alt: "Moonstone upper landing and family area" },
    ],
    floorPlanGround: "/images/moonstone-ground.svg",
    floorPlanFirst: "/images/moonstone-first.svg",
    rooms: [
      { id: "m-g1", name: "Living Room", area: 38, floor: "ground" },
      { id: "m-g2", name: "Dining", area: 22, floor: "ground" },
      { id: "m-g3", name: "Kitchen", area: 20, floor: "ground" },
      { id: "m-g4", name: "Guest Bedroom", area: 18, floor: "ground" },
      { id: "m-g5", name: "Maid's Room", area: 11, floor: "ground" },
      { id: "m-f1", name: "Master Suite", area: 32, floor: "first" },
      { id: "m-f2", name: "Bedroom 2", area: 20, floor: "first" },
      { id: "m-f3", name: "Bedroom 3", area: 20, floor: "first" },
      { id: "m-f4", name: "Family Lounge", area: 26, floor: "first" },
      { id: "m-f5", name: "Home Office", area: 14, floor: "first" },
    ],
    features: ["Home Zone Security", "Drainage System", "Proper Town Planning", "Work-Life Balance", "24-Hour Power Supply", "24/7 Security", "Lush Green Area"],
    description: [
      "The Moonstone is a 4-bedroom semi-detached duplex with 410m\u00B2 of space across two floors. Five bathrooms, a home office, and maid\u2019s quarters. The living room has a double-height ceiling that brings in natural light from above.",
      "The upper floor has a family lounge and four bedrooms, including the master suite. Two parking spaces are included on the plot. The layout works well for families who want the feel of a detached home at a lower price point.",
    ],
    artImpression: "Artistic Impression",
  },
  {
    slug: "emerald",
    name: "Emerald",
    fullName: "Emerald: Detached Bungalow with a Twist",
    tagline: "Style and luxury combined. Four bedrooms, home office, and a maid\u2019s room.",
    propertyType: "bungalow",
    bedrooms: 4,
    bathrooms: 3.5,
    homeOffice: true,
    maidsRoom: true,
    parkingSpaces: 2,
    floorAreaSqm: 332,
    garden: true,
    priceFrom: 88000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/emerald-hero.jpg",
    heroImageAlt: "Emerald 4-bedroom detached duplex exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/emerald-1.jpg", alt: "Emerald open-plan living and dining" },
      { src: "/images/emerald-2.jpg", alt: "Emerald fitted kitchen with utility room" },
      { src: "/images/emerald-3.jpg", alt: "Emerald master bedroom with walk-in closet" },
      { src: "/images/emerald-4.jpg", alt: "Emerald landscaped garden view" },
    ],
    floorPlanGround: "/images/emerald-ground.svg",
    floorPlanFirst: "/images/emerald-first.svg",
    rooms: [
      { id: "e-g1", name: "Living Room", area: 40, floor: "ground" },
      { id: "e-g2", name: "Dining Area", area: 24, floor: "ground" },
      { id: "e-g3", name: "Kitchen", area: 22, floor: "ground" },
      { id: "e-g4", name: "Guest Bedroom", area: 19, floor: "ground" },
      { id: "e-g5", name: "Maid's Room", area: 12, floor: "ground" },
      { id: "e-f1", name: "Master Suite", area: 35, floor: "first" },
      { id: "e-f2", name: "Bedroom 2", area: 21, floor: "first" },
      { id: "e-f3", name: "Bedroom 3", area: 21, floor: "first" },
      { id: "e-f4", name: "Family Lounge", area: 28, floor: "first" },
      { id: "e-f5", name: "Home Office", area: 15, floor: "first" },
    ],
    features: ["modern-kitchen", "parking", "security", "water-supply", "tiled-compound", "perimeter-fencing", "ensuite-bedrooms", "solar-readiness", "home-office", "maids-room"],
    description: [
      "The Emerald is not your typical bungalow with all spaces on one floor. It allows for two living additional areas for the family. The ground floor has three rooms, including two ensuite rooms and a family lounge. It also has a spacious living and dining area with a garden room overlooking the lawn. The ground floor equally boasts of a well-illuminated kitchen and home office, which converts to a bedroom, should there be a need for more space.",
      "The upper floor is styled like an attic with two ensuite bedrooms and a family room, thus making family times more fun. There\u2019ll be enough love to go around when you buy an Emerald.",
    ],
    artImpression: "Artistic Impression",
  },
  {
    slug: "coral",
    name: "Coral",
    fullName: "Coral: 3-Bedroom Semi-Detached Bungalow",
    tagline: "For family, happiness, and class. Three bedrooms, home office, and a mini garden.",
    propertyType: "bungalow",
    bedrooms: 3,
    bathrooms: 3.5,
    homeOffice: true,
    maidsRoom: false,
    parkingSpaces: 2,
    floorAreaSqm: 287,
    garden: true,
    priceFrom: 75000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/coral-hero.jpg",
    heroImageAlt: "Coral 3-bedroom semi-detached bungalow exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/coral-1.jpg", alt: "Coral welcoming living room" },
      { src: "/images/coral-2.jpg", alt: "Coral kitchen with modern finishes" },
      { src: "/images/coral-3.jpg", alt: "Coral upstairs bedroom" },
      { src: "/images/coral-4.jpg", alt: "Coral terrace and outdoor area" },
    ],
    floorPlanGround: "/images/coral-ground.svg",
    floorPlanFirst: "/images/coral-first.svg",
    rooms: [
      { id: "c-g1", name: "Living Room", area: 32, floor: "ground" },
      { id: "c-g2", name: "Dining", area: 20, floor: "ground" },
      { id: "c-g3", name: "Kitchen", area: 18, floor: "ground" },
      { id: "c-g4", name: "Guest Bedroom", area: 16, floor: "ground" },
      { id: "c-g5", name: "Maid's Room", area: 10, floor: "ground" },
      { id: "c-f1", name: "Master Suite", area: 28, floor: "first" },
      { id: "c-f2", name: "Bedroom 2", area: 18, floor: "first" },
      { id: "c-f3", name: "Bedroom 3", area: 18, floor: "first" },
      { id: "c-f4", name: "Family Lounge", area: 22, floor: "first" },
    ],
    features: ["Home Zone Security", "Drainage System", "Proper Town Planning", "Work-Life Balance", "24-Hour Power Supply", "24/7 Security", "Lush Green Area"],
    description: [
      "This semi-detached bungalow is an economical choice, suitable for new families. The ground floor boasts a large living and dining area and a kitchen with an island. The home office is retained in this house type.",
      "The upper floor is designed similarly to the Emerald, with two ensuite bedrooms and a family room. You\u2019ve landed a happy life when you buy a Coral.",
    ],
    artImpression: "Artistic Impression",
  },
  {
    slug: "aquamarine",
    name: "Aquamarine",
    fullName: "Aquamarine: 4-Bedroom Townhouse",
    tagline: "A paragon of luxury. Four bedrooms, maid\u2019s room, and a convertible home office.",
    propertyType: "townhouse",
    bedrooms: 4,
    bathrooms: 4.5,
    homeOffice: true,
    maidsRoom: true,
    parkingSpaces: 2,
    floorAreaSqm: 404,
    garden: true,
    priceFrom: 86000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/aquamarine-hero.jpg",
    heroImageAlt: "Aquamarine 4-bedroom townhouse exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/aquamarine-1.jpg", alt: "Aquamarine spacious living area" },
      { src: "/images/aquamarine-2.jpg", alt: "Aquamarine designer kitchen" },
      { src: "/images/aquamarine-3.jpg", alt: "Aquamarine master bedroom" },
      { src: "/images/aquamarine-4.jpg", alt: "Aquamarine private garden" },
    ],
    floorPlanGround: "/images/aquamarine-ground.svg",
    floorPlanFirst: "/images/aquamarine-first.svg",
    rooms: [
      { id: "a-g1", name: "Living Room", area: 36, floor: "ground" },
      { id: "a-g2", name: "Dining Area", area: 22, floor: "ground" },
      { id: "a-g3", name: "Kitchen", area: 20, floor: "ground" },
      { id: "a-g4", name: "Guest Bedroom", area: 17, floor: "ground" },
      { id: "a-g5", name: "Maid's Room", area: 11, floor: "ground" },
      { id: "a-f1", name: "Master Suite", area: 30, floor: "first" },
      { id: "a-f2", name: "Bedroom 2", area: 19, floor: "first" },
      { id: "a-f3", name: "Bedroom 3", area: 19, floor: "first" },
      { id: "a-f4", name: "Family Lounge", area: 24, floor: "first" },
      { id: "a-f5", name: "Home Office", area: 13, floor: "first" },
    ],
    features: ["Home Zone Security", "Drainage System", "Proper Town Planning", "Work-Life Balance", "24-Hour Power Supply", "24/7 Security", "Lush Green Area"],
    description: [
      "The Wellsprings townhouse sits on two floors. Each of the four ensuite bedrooms is intricately designed to give a luxurious feel. The combined living and dining areas have access to the mini garden. The convertible home office is accessible from the anteroom leading to an additional ensuite room for guests.",
      "Buy an Aquamarine and ensure serene transformation.",
    ],
    artImpression: "Artistic Impression",
  },
  {
    slug: "opal",
    name: "Opal",
    fullName: "Opal: 3-Bedroom Garden Apartment",
    tagline: "Three bedrooms in a garden apartment, with maid\u2019s quarters and access to all estate amenities.",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 3.5,
    homeOffice: false,
    maidsRoom: true,
    parkingSpaces: 2,
    floorAreaSqm: 472,
    garden: false,
    priceFrom: 45000000,
    status: "available",
    unitsLeft: 0,
    heroImage: "/images/opal-hero.jpg",
    heroImageAlt: "Opal 3-bedroom garden apartment exterior at Wellsprings Ibadan",
    gallery: [
      { src: "/images/opal-1.jpg", alt: "Opal bright open-plan living" },
      { src: "/images/opal-2.jpg", alt: "Opal compact modern kitchen" },
      { src: "/images/opal-3.jpg", alt: "Opal master bedroom" },
      { src: "/images/opal-4.jpg", alt: "Opal bathroom with modern fittings" },
    ],
    floorPlanGround: "/images/opal-ground.svg",
    rooms: [
      { id: "o-g1", name: "Living / Dining", area: 28, floor: "ground" },
      { id: "o-g2", name: "Kitchen", area: 12, floor: "ground" },
      { id: "o-g3", name: "Master Bedroom", area: 18, floor: "ground" },
      { id: "o-g4", name: "Bedroom 2", area: 14, floor: "ground" },
    ],
    features: ["Home Zone Security", "Drainage System", "Proper Town Planning", "Work-Life Balance", "24-Hour Power Supply", "24/7 Security", "Lush Green Area"],
    description: [
      "The Opal is a 3-bedroom garden apartment with 472m\u00B2 of living space, three and a half bathrooms, a maid\u2019s room, and one parking space. The layout combines the living and dining areas into a single open room, with a separate kitchen and three bedrooms.",
      "Opal buyers have full access to Wellsprings\u2019 estate amenities: borehole water, 24/7 security, paved roads, and communal green spaces. The entry price makes it the most accessible way into the estate.",
    ],
    artImpression: "Artistic Impression",
  },
];

export const unitBySlug = (slug: string) => housingUnits.find((u) => u.slug === slug);

export const statusLabels: Record<UnitStatus, string> = {
  available: "Available",
  limited: "Limited Availability",
  reserved: "Reserved",
  sold: "Sold",
};

export const propertyTypeLabels: Record<PropertyType, string> = {
  villa: "Villa",
  duplex: "Duplex",
  bungalow: "Bungalow",
  townhouse: "Townhouse",
  apartment: "Apartment",
};

export const formatPrice = (price: number) => `\u20A6${(price / 1000000).toFixed(0)}M`;
