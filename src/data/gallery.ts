export type GalleryCategory = "all" | "exteriors" | "interiors" | "construction" | "amenities" | "lifestyle";

export interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "all">;
  isArtisticImpression?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/ext-1.jpg", alt: "Modern white house with large glass windows and clean lines", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-2.jpg", alt: "Modern two-story house with clean lines and large windows", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-3.jpg", alt: "Modern house exterior with clean lines and window detail", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-4.jpg", alt: "Modern house with geometric design and lush landscaping", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-5.jpg", alt: "Modern two-story home lit at night with warm interior lighting", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/ext-6.jpg", alt: "Modern luxury house with stone accents at sunset", category: "exteriors", isArtisticImpression: true },
  { src: "/images/gallery/int-1.jpg", alt: "Modern minimalist living room with white furniture and natural light", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-2.jpg", alt: "Modern lounge area with city view and contemporary furniture", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-3.jpg", alt: "Modern bedroom with large window and city skyline view", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/int-4.jpg", alt: "Elegant bathroom with marble walls and modern fixtures", category: "interiors", isArtisticImpression: true },
  { src: "/images/gallery/con-1.jpg", alt: "Construction progress: structural development on site", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/con-2.jpg", alt: "Construction progress: scaffolding and building framework", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/con-3.jpg", alt: "Construction progress: architectural detail and precision work", category: "construction", isArtisticImpression: true },
  { src: "/images/gallery/amen-1.jpg", alt: "Modern kitchen with stainless steel appliances and marble countertops", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/amen-2.jpg", alt: "Modern luxury home with swimming pools at dusk", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/amen-3.jpg", alt: "Modern buildings with pools and landscaped green spaces", category: "amenities", isArtisticImpression: true },
  { src: "/images/gallery/life-1.jpg", alt: "Modern home exterior with landscaped garden and family living", category: "lifestyle", isArtisticImpression: true },
  { src: "/images/gallery/life-2.jpg", alt: "Evening view of modern residential homes with warm lighting", category: "lifestyle", isArtisticImpression: true },
];

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "exteriors", label: "Exteriors" },
  { value: "interiors", label: "Interiors" },
  { value: "construction", label: "Construction" },
  { value: "amenities", label: "Amenities" },
  { value: "lifestyle", label: "Lifestyle" },
];
