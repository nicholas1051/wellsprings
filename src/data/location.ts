export interface Landmark {
  id: string;
  name: string;
  distanceKm: number;
  category: "transport" | "government" | "shopping" | "business" | "commerce" | "airport";
  badge: string;
  icon?: string;
  description: string;
}

export const location = {
  heading: "Live Where Everything Is Within Reach",
  intro:
    "Wellsprings puts you close to the places that matter — from transport and business to shopping, government and everyday essentials.",
  estateCenter: { lat: 7.3964, lng: 3.9164 },
  landmarks: [
    { id: "train1", name: "O. Awolowo Train Station", distanceKm: 3, category: "transport" as const, badge: "\uD83D\uDE86", description: "A nearby rail connection that supports convenient movement across Ibadan." },
    { id: "secretariat", name: "Oyo State Secretariat", distanceKm: 12.3, category: "government" as const, badge: "\u25A3", icon: "landmark", description: "Close to a major government and administrative destination in Oyo State." },
    { id: "palms", name: "The Palms Mall", distanceKm: 13, category: "shopping" as const, badge: "\u25A2", icon: "shopping-bag", description: "A major shopping destination for retail, dining and everyday convenience." },
    { id: "dugbe-business", name: "Dugbe Business District", distanceKm: 10, category: "business" as const, badge: "\u25A4", description: "Convenient access to one of Ibadan's established commercial and business districts." },
    { id: "bodija", name: "Bodija Market", distanceKm: 14.7, category: "commerce" as const, badge: "\u25A5", description: "A major market area for everyday shopping, food and local commerce." },
    { id: "airport", name: "Ibadan Airport", distanceKm: 25, category: "airport" as const, badge: "\u2708", description: "Wider regional connectivity through Ibadan's airport corridor." },
    { id: "jericho", name: "Jericho Mall", distanceKm: 5, category: "shopping" as const, badge: "\u25C7", icon: "store", description: "A nearby lifestyle and shopping destination for dining, retail and leisure." },
    { id: "dugbe-station", name: "Dugbe Train Station", distanceKm: 6, category: "transport" as const, badge: "\uD83D\uDE86", description: "A nearby rail connection linking Wellsprings with important parts of Ibadan." },
  ],
  insights: [
    { label: "Closest destination", name: "O. Awolowo Train Station", detail: "Just 3 km away" },
    { label: "Nearby lifestyle", name: "Jericho Mall", detail: "5 km from Wellsprings" },
    { label: "Business access", name: "Dugbe Business District", detail: "10 km away" },
    { label: "Wider connectivity", name: "Ibadan Airport", detail: "25 km away" },
  ],
  neighborhood: {
    title: "The Jericho Neighbourhood",
    description:
      "Jericho has been one of Ibadan's key residential areas for decades. Tree-lined streets, proximity to good schools, and easy access to Old Bodija and Dugbe make it a settled, well-connected neighbourhood. Wellsprings sits within this corridor, close to the amenities that make the area work.",
  },
};

export const categoryColors: Record<string, string> = {
  transport: "#5E8EB7",
  government: "#78A96D",
  shopping: "#8D70B7",
  business: "#6A9ABF",
  commerce: "#C86D6D",
  airport: "#C86D6D",
};

export const categoryLabels: Record<string, string> = {
  transport: "Transport",
  government: "Government",
  shopping: "Shopping",
  business: "Business",
  commerce: "Commerce",
  airport: "Airport",
};
