import fs from "fs";
import path from "path";

const imagesDir = path.resolve(process.cwd(), "public/images");

const images = [
  "hero.jpg",
  "masterplan.jpg",
  "pearl-hero.jpg", "pearl-1.jpg", "pearl-2.jpg", "pearl-3.jpg", "pearl-4.jpg",
  "pearl-ground.svg", "pearl-first.svg",
  "moonstone-hero.jpg", "moonstone-1.jpg", "moonstone-2.jpg", "moonstone-3.jpg", "moonstone-4.jpg",
  "moonstone-ground.svg", "moonstone-first.svg",
  "emerald-hero.jpg", "emerald-1.jpg", "emerald-2.jpg", "emerald-3.jpg", "emerald-4.jpg",
  "emerald-ground.svg", "emerald-first.svg",
  "coral-hero.jpg", "coral-1.jpg", "coral-2.jpg", "coral-3.jpg", "coral-4.jpg",
  "coral-ground.svg", "coral-first.svg",
  "aquamarine-hero.jpg", "aquamarine-1.jpg", "aquamarine-2.jpg", "aquamarine-3.jpg", "aquamarine-4.jpg",
  "aquamarine-ground.svg", "aquamarine-first.svg",
  "opal-hero.jpg", "opal-1.jpg", "opal-2.jpg", "opal-3.jpg", "opal-4.jpg",
  "opal-ground.svg",
  "gallery-aerial-1.jpg", "gallery-gatehouse.jpg",
  "gallery-pearl-ext.jpg", "gallery-moonstone-ext.jpg", "gallery-emerald-ext.jpg",
  "gallery-coral-ext.jpg", "gallery-aquamarine-ext.jpg", "gallery-opal-ext.jpg",
  "gallery-living-1.jpg", "gallery-kitchen-1.jpg", "gallery-bedroom-1.jpg", "gallery-bathroom-1.jpg",
  "gallery-construction-1.jpg", "gallery-construction-2.jpg", "gallery-construction-3.jpg",
  "gallery-road-1.jpg", "gallery-gate-1.jpg", "gallery-green-1.jpg",
  "gallery-family-1.jpg", "gallery-evening-1.jpg",
];

function labelFromFilename(name) {
  const base = name.replace(/\.(jpg|svg|png)$/, "");
  return base
    .replace(/^gallery-/, "")
    .replace(/-(?:ext|hero|ground|first)$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryFromFilename(name) {
  if (name.startsWith("gallery-construction")) return "amenity";
  if (name.startsWith("gallery-road") || name.startsWith("gallery-gate") || name.startsWith("gallery-green")) return "amenity";
  if (name.startsWith("gallery-family") || name.startsWith("gallery-evening")) return "gallery";
  if (name.startsWith("gallery-")) return "exterior";
  if (name.includes("-hero")) return "hero";
  if (name.includes("-ground") || name.includes("-first")) return "floorplan";
  if (name === "hero.jpg") return "hero";
  if (name === "masterplan.jpg") return "hero";
  const num = name.match(/-(\d)\.jpg$/);
  if (num) {
    const n = parseInt(num[1]);
    if (n <= 2) return "interior";
    return "exterior";
  }
  return "gallery";
}

const colors = {
  hero: { bg: "#1B2A3D", accent: "#5A87A8" },
  interior: { bg: "#F5F0EB", accent: "#C4714A" },
  exterior: { bg: "#E8EDE9", accent: "#8BAF7E" },
  floorplan: { bg: "#F8F8F8", accent: "#5A87A8" },
  gallery: { bg: "#2A2A2A", accent: "#C4A97D" },
  amenity: { bg: "#E8EDE9", accent: "#8BAF7E" },
};

function generatePhotoSvg(label, category) {
  const { bg, accent } = colors[category] || colors.gallery;
  const isHero = category === "hero";
  const w = isHero ? 1920 : category === "exterior" ? 1200 : 800;
  const h = isHero ? 1080 : category === "exterior" ? 800 : 600;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${accent}33"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="${w * 0.1}" y="${h * 0.35}" width="${w * 0.8}" height="${h * 0.3}" rx="8" fill="${accent}15" stroke="${accent}40" stroke-width="1"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${isHero ? 32 : 22}" font-weight="600" fill="${accent}" opacity="0.7">${label}</text>
  <text x="50%" y="56%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${isHero ? 16 : 12}" fill="${accent}" opacity="0.4">Wellsprings Ibadan</text>
  <text x="50%" y="64%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="${accent}" opacity="0.3">Replace with real photograph</text>
</svg>`;
}

function generateFloorplanSvg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#f8f8f8"/>
  <rect x="40" y="40" width="720" height="520" rx="4" fill="none" stroke="#5A87A8" stroke-width="2" stroke-dasharray="8 4"/>
  <text x="50%" y="45%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#5A87A8" opacity="0.6">${label}</text>
  <text x="50%" y="55%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#999" opacity="0.5">Floor plan — replace with architectural drawing</text>
</svg>`;
}

let created = 0;
let skipped = 0;

for (const img of images) {
  const filePath = path.join(imagesDir, img);
  if (fs.existsSync(filePath)) {
    skipped++;
    continue;
  }

  const isFloorplan = img.includes("-ground") || img.includes("-first");
  const label = labelFromFilename(img);
  const category = categoryFromFilename(img);
  const svg = isFloorplan
    ? generateFloorplanSvg(label)
    : generatePhotoSvg(label, category);

  fs.writeFileSync(filePath, svg, "utf8");
  created++;
}

console.log(`Created ${created} placeholder images, skipped ${skipped} existing.`);
