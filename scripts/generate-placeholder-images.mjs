import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const tones = {
  dark: { from: "#17324D", to: "#0D1B2A", text: "#FFFFFF", sub: "#C8A96B", accent: "#699DD5" },
  light: { from: "#EAF3FB", to: "#F8F9FA", text: "#17324D", sub: "#3E6FA3", accent: "#699DD5" },
  mid: { from: "#FFFFFF", to: "#EAF3FB", text: "#17324D", sub: "#3E6FA3", accent: "#699DD5" },
};

function svg({ width, height, label, sub, tone }) {
  const palette = tones[tone];
  const cx = width * 0.5;
  const cy = height * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.from}"/>
      <stop offset="1" stop-color="${palette.to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <circle cx="${width * 0.12}" cy="${height * 0.15}" r="${Math.min(width, height) * 0.22}" fill="${palette.accent}" opacity="0.18"/>
  <circle cx="${width * 0.9}" cy="${height * 0.85}" r="${Math.min(width, height) * 0.28}" fill="${palette.accent}" opacity="0.14"/>
  <rect x="${width * 0.04}" y="${height * 0.04}" width="${width * 0.92}" height="${height * 0.92}" fill="none" stroke="${palette.accent}" stroke-opacity="0.35" stroke-width="${Math.max(2, Math.round(Math.min(width, height) / 300))}"/>
  <text x="${cx}" y="${cy - 8}" text-anchor="middle" dominant-baseline="middle" font-family="Manrope, Arial, sans-serif" font-size="${Math.round(Math.min(width, height) / 14)}" font-weight="700" fill="${palette.text}">${label}</text>
  <text x="${cx}" y="${cy + Math.round(Math.min(width, height) / 12)}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, sans-serif" font-size="${Math.round(Math.min(width, height) / 26)}" font-weight="500" fill="${palette.sub}">${sub}</text>
</svg>
`;
}

const files = [
  { file: "hero.svg", width: 1600, height: 900, label: "Hero photograph", sub: "[Replace with exterior photography]", tone: "dark" },
  { file: "development.svg", width: 1200, height: 800, label: "Development — architectural photo", sub: "[Replace with real photo]", tone: "mid" },
  { file: "about.svg", width: 1200, height: 800, label: "About — developer / site team", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-a-hero.svg", width: 1200, height: 800, label: "Type A — exterior", sub: "[Replace with real photo]", tone: "dark" },
  { file: "type-b-hero.svg", width: 1200, height: 800, label: "Type B — exterior", sub: "[Replace with real photo]", tone: "dark" },
  { file: "type-c-hero.svg", width: 1200, height: 800, label: "Type C — exterior", sub: "[Replace with real photo]", tone: "dark" },
  { file: "type-a-1.svg", width: 800, height: 600, label: "Type A — living room", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-a-2.svg", width: 800, height: 600, label: "Type A — kitchen", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-a-3.svg", width: 800, height: 600, label: "Type A — bedroom", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-a-4.svg", width: 800, height: 600, label: "Type A — bathroom", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-b-1.svg", width: 800, height: 600, label: "Type B — living room", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-b-2.svg", width: 800, height: 600, label: "Type B — kitchen", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-b-3.svg", width: 800, height: 600, label: "Type B — bedroom", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-b-4.svg", width: 800, height: 600, label: "Type B — bathroom", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-c-1.svg", width: 800, height: 600, label: "Type C — living room", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-c-2.svg", width: 800, height: 600, label: "Type C — kitchen", sub: "[Replace with real photo]", tone: "mid" },
  { file: "type-c-3.svg", width: 800, height: 600, label: "Type C — bedroom", sub: "[Replace with real photo]", tone: "light" },
  { file: "type-c-4.svg", width: 800, height: 600, label: "Type C — bathroom", sub: "[Replace with real photo]", tone: "mid" },
  { file: "dev-1.svg", width: 800, height: 600, label: "Estate gate / entrance", sub: "[Replace with real photo]", tone: "mid" },
  { file: "dev-2.svg", width: 800, height: 600, label: "Internal roads & landscaping", sub: "[Replace with real photo]", tone: "light" },
  { file: "dev-3.svg", width: 800, height: 600, label: "Security / perimeter fencing", sub: "[Replace with real photo]", tone: "mid" },
  { file: "floorplan-a.svg", width: 800, height: 1000, label: "Floor plan — Type A", sub: "[Replace with actual plan / PDF]", tone: "light" },
  { file: "floorplan-b.svg", width: 800, height: 1000, label: "Floor plan — Type B", sub: "[Replace with actual plan / PDF]", tone: "light" },
  { file: "floorplan-c.svg", width: 800, height: 1000, label: "Floor plan — Type C", sub: "[Replace with actual plan / PDF]", tone: "light" },
  { file: "site-plan.svg", width: 1200, height: 900, label: "Master site plan", sub: "[Replace with estate layout showing plot numbers]", tone: "mid" },
];

for (const f of files) {
  writeFileSync(join(outDir, f.file), svg(f), "utf8");
}

console.log(`Generated ${files.length} placeholder images in ${outDir}`);
