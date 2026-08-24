import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src");

function findTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !["node_modules", ".next", ".git", "cms"].includes(entry.name)) {
      results.push(...findTsxFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      results.push(full);
    }
  }
  return results;
}

const files = findTsxFiles(srcDir);
let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const orig = content;

  // Step 1: Remove font-bold from DM Serif Display headings
  // Headings use font-heading + large sizes (3xl-8xl) -> remove font-bold
  // These should be weight 400
  content = content.replace(
    /font-heading\s+text-(3xl|4xl|5xl|6xl|7xl|8xl)[^"]*?\s+font-bold/g,
    "font-heading text-$1$2"
  );

  // Simpler: just remove font-bold that appears right after font-heading + large size
  // Handle: "font-heading text-3xl font-bold" -> "font-heading text-3xl"
  content = content.replace(/(font-heading\s+text-(?:3xl|4xl|5xl|6xl|7xl|8xl)(?:\s+\S+)*?)\s+font-bold/g, (_, p1) => p1);

  // Step 2: For smaller sizes, remove font-heading (use Manrope body font)
  // "font-heading text-xl font-bold" -> "text-xl font-bold" (Manrope)
  // "font-heading text-2xl font-bold" -> "text-2xl font-bold"
  // "font-heading text-lg" -> "text-lg"
  const sizes = "sm|base|lg|xl|2xl";
  const sizePattern = new RegExp(`font-heading\\s+(text-(?:${sizes})\\s+(?:font-bold|font-semibold))`, "g");
  content = content.replace(sizePattern, "$1");

  // "font-heading text-xl" -> "text-xl"
  const sizeOnlyPattern = new RegExp(`font-heading\\s+(text-(?:${sizes}))`, "g");
  content = content.replace(sizeOnlyPattern, "$1");

  // "font-bold font-heading text-xl" -> "font-bold text-xl"
  content = content.replace(new RegExp(`font-bold\\s+font-heading\\s+(text-(?:${sizes}))`, "g"), "font-bold $1");

  // "font-heading font-bold" (no size) -> "font-bold"
  content = content.replace(/font-heading\s+font-bold/g, "font-bold");
  content = content.replace(/font-heading\s+font-semibold/g, "font-semibold");

  if (content !== orig) {
    const boldDiff = (orig.match(/font-bold/g) || []).length - (content.match(/font-bold/g) || []).length;
    const headingDiff = (orig.match(/font-heading/g) || []).length - (content.match(/font-heading/g) || []).length;
    totalChanges += boldDiff + headingDiff;
    fs.writeFileSync(file, content, "utf8");
    console.log(`${path.relative(srcDir, file)}: -${boldDiff} bold, -${headingDiff} font-heading`);
  }
}

console.log(`\nDone. ${totalChanges} total typography changes.`);
