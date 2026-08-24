import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src");

function findTsx(dir) {
  const r = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory() && !["node_modules", ".next", ".git", "cms"].includes(e.name)) {
      r.push(...findTsx(f));
    } else if (e.isFile() && e.name.endsWith(".tsx")) {
      r.push(f);
    }
  }
  return r;
}

// Restore \uXXXX escapes that got broken (the backslash was lost)
// Pattern: non-backslash followed by u + 4 hex digits at word boundary
const fixUnicode = (c) => c.replace(/(?<!\\)(u[0-9a-fA-F]{4})/g, "\\$1");

let count = 0;
for (const f of findTsx(srcDir)) {
  const orig = fs.readFileSync(f, "utf8");
  const fixed = fixUnicode(orig);
  if (fixed !== orig) {
    fs.writeFileSync(f, fixed, "utf8");
    count++;
    console.log(path.relative(srcDir, f));
  }
}
console.log(`Fixed Unicode escapes in ${count} files`);
