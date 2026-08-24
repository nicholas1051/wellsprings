export interface Feature {
  id: string;
  title: string;
  description: string;
  category: "estate" | "home" | "community";
}

export const features: Feature[] = [
  {
    id: "gated-security",
    title: "Gated Estate Security",
    description: "24/7 manned gatehouse with CCTV surveillance, access control, and perimeter patrols.",
    category: "estate",
  },
  {
    id: "borehole-water",
    title: "Borehole Water Supply",
    description: "Dedicated borehole serving the entire estate with overhead storage and treatment.",
    category: "estate",
  },
  {
    id: "underground-drainage",
    title: "Underground Drainage",
    description: "Engineered drainage corridors designed to handle Ibadan\u2019s rainy season without flooding.",
    category: "estate",
  },
  {
    id: "paved-roads",
    title: "Paved Internal Roads",
    description: "Wide, interlocked internal roads with street lighting throughout the estate.",
    category: "estate",
  },
  {
    id: "landscaping",
    title: "Landscaped Green Spaces",
    description: "Communal parks, walking paths, and mature trees across the estate.",
    category: "community",
  },
  {
    id: "community-centre",
    title: "Community Centre",
    description: "A shared gathering space for residents\u2019 events, meetings, and celebrations.",
    category: "community",
  },
  {
    id: "children-playground",
    title: "Children\u2019s Playground",
    description: "A safe, shaded play area designed for families with young children.",
    category: "community",
  },
  {
    id: "modern-kitchen",
    title: "Modern Kitchens",
    description: "Fitted cabinets, quality worktops, and provision for built-in appliances in every unit.",
    category: "home",
  },
  {
    id: "parking",
    title: "Private Parking",
    description: "Dedicated parking on your plot. Covered carports available in select unit types.",
    category: "home",
  },
  {
    id: "ensuite-bedrooms",
    title: "En-suite Bedrooms",
    description: "Master and additional bedrooms with attached bathrooms and modern sanitary ware.",
    category: "home",
  },
  {
    id: "solar-readiness",
    title: "Solar-Ready Wiring",
    description: "Pre-installed conduits and inverter provision so you can add solar later.",
    category: "home",
  },
  {
    id: "tiled-compound",
    title: "Tiled Compound",
    description: "Fully tiled compound floors for a clean, low-maintenance outdoor finish.",
    category: "home",
  },
];

export const featureCategories = [
  { id: "estate", label: "Estate Features", icon: "shield" },
  { id: "home", label: "Home Finishes", icon: "home" },
  { id: "community", label: "Community", icon: "users" },
] as const;

export const featureById = (id: string) => features.find((f) => f.id === id);
