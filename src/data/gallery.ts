export type GalleryCategory = "all" | "exteriors" | "interiors" | "construction" | "amenities" | "lifestyle";

export interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "all">;
  isArtisticImpression?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery-aerial-1.jpg", alt: "Aerial view of Wellsprings estate showing the full masterplan", category: "exteriors" },
  { src: "/images/gallery-gatehouse.jpg", alt: "Wellsprings estate gatehouse entrance structure", category: "exteriors" },
  { src: "/images/gallery-pearl-ext.jpg", alt: "Pearl villa exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-moonstone-ext.jpg", alt: "Moonstone duplex exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-emerald-ext.jpg", alt: "Emerald duplex exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-coral-ext.jpg", alt: "Coral terrace exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-aquamarine-ext.jpg", alt: "Aquamarine villa exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-opal-ext.jpg", alt: "Opal apartment exterior render at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery-living-1.jpg", alt: "Spacious open-plan living room with natural light", category: "interiors" },
  { src: "/images/gallery-kitchen-1.jpg", alt: "Modern fitted kitchen with quality worktops", category: "interiors" },
  { src: "/images/gallery-bedroom-1.jpg", alt: "Master bedroom with en-suite bathroom", category: "interiors" },
  { src: "/images/gallery-bathroom-1.jpg", alt: "Contemporary bathroom with modern sanitary ware", category: "interiors" },
  { src: "/images/gallery-construction-1.jpg", alt: "Construction progress at Wellsprings: foundation work", category: "construction" },
  { src: "/images/gallery-construction-2.jpg", alt: "Construction progress at Wellsprings: structural framing", category: "construction" },
  { src: "/images/gallery-construction-3.jpg", alt: "Construction progress at Wellsprings: roofing and finishing", category: "construction" },
  { src: "/images/gallery-road-1.jpg", alt: "Internal interlocked road within the estate", category: "amenities" },
  { src: "/images/gallery-gate-1.jpg", alt: "Secure gated entry with 24/7 security", category: "amenities" },
  { src: "/images/gallery-green-1.jpg", alt: "Landscaped green space within the estate", category: "amenities" },
  { src: "/images/gallery-family-1.jpg", alt: "Family enjoying the estate grounds", category: "lifestyle", isArtisticImpression: true },
  { src: "/images/gallery-evening-1.jpg", alt: "Evening view of completed homes at Wellsprings", category: "lifestyle", isArtisticImpression: true },
];

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "exteriors", label: "Exteriors" },
  { value: "interiors", label: "Interiors" },
  { value: "construction", label: "Construction" },
  { value: "amenities", label: "Amenities" },
  { value: "lifestyle", label: "Lifestyle" },
];
