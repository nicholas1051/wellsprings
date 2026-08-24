export interface Landmark {
  name: string;
  distance: string;
  distanceKm: number;
  color: string;
  position: "top" | "upper-left" | "upper-right" | "left" | "left-lower" | "right" | "right-upper" | "lower-left" | "lower-right";
  icon: string;
}

export const location = {
  heading: "Jericho, one of Ibadan\u2019s most established residential areas.",
  intro:
    "Wellsprings sits in Jericho, a quiet, well-connected neighbourhood in Ibadan. Old Bodija is just minutes away, the Dugbe business district is 10 km, and University College Hospital is 4 km. The estate is tucked off the main road, away from traffic and noise.",
  estateCenter: { lat: 7.3964, lng: 3.9164 },
  landmarks: [
    { name: "O. Awolowo Train Station", distance: "30 km", distanceKm: 30, color: "#D4856A", position: "top", icon: "train" },
    { name: "Oyo State Secretariat", distance: "12.3 km", distanceKm: 12.3, color: "#8BAF7E", position: "upper-left", icon: "building" },
    { name: "The Ventura Mall", distance: "12 km", distanceKm: 12, color: "#8BAF7E", position: "upper-right", icon: "mall" },
    { name: "Dugbe Train Station", distance: "6 km", distanceKm: 6, color: "#5A87A8", position: "left", icon: "train" },
    { name: "The Palms Mall", distance: "13 km", distanceKm: 13, color: "#5A87A8", position: "right", icon: "mall" },
    { name: "Ibadan Airport", distance: "25 km", distanceKm: 25, color: "#9B7DB8", position: "left-lower", icon: "airport" },
    { name: "Jericho Mall", distance: "5 km", distanceKm: 5, color: "#9B7DB8", position: "right-upper", icon: "mall" },
    { name: "Bodija Market", distance: "14.7 km", distanceKm: 14.7, color: "#C47171", position: "lower-left", icon: "market" },
    { name: "Dugbe Business District", distance: "10 km", distanceKm: 10, color: "#C47171", position: "lower-right", icon: "business" },
  ],
  neighborhood: {
    title: "The Jericho Neighbourhood",
    description:
      "Jericho has been one of Ibadan\u2019s key residential areas for decades. Tree-lined streets, proximity to good schools, and easy access to Old Bodija and Dugbe make it a settled, well-connected neighbourhood. Wellsprings sits within this corridor, close to the amenities that make the area work.",
  },
} as const;
