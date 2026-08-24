export interface WhyReason {
  number: string;
  title: string;
  text: string;
}

export const whyReasons: WhyReason[] = [
  {
    number: "01",
    title: "A Masterplanned Estate",
    text: "25 acres planned as a single community, not a collection of individual plots. Parks, drainage, roads, and shared spaces were designed together.",
  },
  {
    number: "02",
    title: "Six Property Types",
    text: "From the Opal apartment at \u20A645M to the Pearl villa at \u20A690M, six distinct home types cover a range of family sizes and budgets.",
  },
  {
    number: "03",
    title: "Old Bodija Address",
    text: "One of Ibadan\u2019s established residential areas. Tree-lined streets, good schools nearby, and quick access to Dugbe.",
  },
  {
    number: "04",
    title: "Clear Pricing and Process",
    text: "Published prices, Governor\u2019s Consent land title, and a five-step buying process. No hidden fees or undocumented payments.",
  },
  {
    number: "05",
    title: "Known Design Team",
    text: "Architecture by Studio Stoone Designs. Structural engineering by KOA Consultants. Project management by African United Consultants.",
  },
  {
    number: "06",
    title: "Infrastructure That Works",
    text: "Borehole water, underground drainage, solar-ready wiring, and 24/7 CCTV security. Built to handle Ibadan\u2019s rainy season and power supply challenges.",
  },
];

export const trustItems = [
  { label: "Estate Size", value: "25 Acres" },
  { label: "Property Types", value: "6 Types" },
  { label: "Land Title", value: "Governor\u2019s Consent" },
] as const;

export const sitePlan = {
  image: "/images/masterplan.jpg",
  alt: "Aerial masterplan of Wellsprings Ibadan estate showing all zones, roads, and green spaces",
  legend: [
    { label: "Residential Zone", color: "#5A87A8" },
    { label: "Green / Parks", color: "#8BAF7E" },
    { label: "Roads & Drainage", color: "#C4A882" },
    { label: "Community Centre", color: "#D4856A" },
  ],
} as const;

export const howToOwnSteps = [
  {
    step: 1,
    title: "Enquiry",
    description: "Contact us by WhatsApp, phone, or the online form. We will send you current availability and pricing.",
    icon: "message",
  },
  {
    step: 2,
    title: "Site Inspection",
    description: "Visit the estate, walk through available units, and see the construction quality in person.",
    icon: "map-pin",
  },
  {
    step: 3,
    title: "Documentation",
    description: "Review the estate by-laws, design guidelines, and purchase agreement. Everything is in writing before you commit.",
    icon: "file-text",
  },
  {
    step: 4,
    title: "Payment and Allocation",
    description: "Choose your unit and payment plan. Once payment is confirmed, your plot is allocated and documented.",
    icon: "credit-card",
  },
  {
    step: 5,
    title: "Handover",
    description: "Collect your title documents (Deed of Assignment, Governor\u2019s Consent) and your keys.",
    icon: "key",
  },
];
