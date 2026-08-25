export type GalleryCategory = "all" | "exteriors" | "interiors" | "construction" | "amenities" | "lifestyle";

export interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "all">;
  isArtisticImpression?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/ext-1.jpg", alt: "Modern luxury home with stone accents at sunset", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-2.jpg", alt: "Contemporary home with clean architectural lines", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-3.jpg", alt: "Modern luxury home with large windows at dusk", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-4.jpg", alt: "Elegant modern house exterior with landscaped frontage", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-5.jpg", alt: "Brick and stone residential home with green surroundings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-6.jpg", alt: "Stone-accented modern home exterior at Wellsprings", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/int-1.jpg", alt: "Spacious modern living room with natural light", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-2.jpg", alt: "Contemporary open-plan kitchen and living area", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-3.jpg", alt: "Luxurious master bedroom with elegant furnishings", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-4.jpg", alt: "Modern bathroom with premium finishes", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/con-1.jpg", alt: "Construction progress: structural development at Wellsprings", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/con-2.jpg", alt: "Construction progress: building framework and scaffolding", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/con-3.jpg", alt: "Construction progress: architectural detail work", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/amen-1.jpg", alt: "Swimming pool and recreational area within the estate", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/amen-2.jpg", alt: "Landscaped garden and green open space", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/amen-3.jpg", alt: "Landscaped estate driveway and internal roads", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/life-1.jpg", alt: "Family enjoying the estate grounds and surroundings", category: "lifestyle", isArtisticImpression: true },
  { src: "/images/gallery/life-2.jpg", alt: "Evening view of completed homes at Wellsprings", category: "lifestyle", isArtisticImpression: true },
];

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "exteriors", label: "Exteriors" },
  { value: "interiors", label: "Interiors" },
  { value: "construction", label: "Construction" },
  { value: "amenities", label: "Amenities" },
  { value: "lifestyle", label: "Lifestyle" },
];
