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

let count = 0;
for (const f of findTsx(srcDir)) {
  let c = fs.readFileSync(f, "utf8");
  if (c.includes("$2")) {
    c = c.replace(/\$2/g, "");
    fs.writeFileSync(f, c, "utf8");
    count++;
    console.log(path.relative(srcDir, f));
  }
}
console.log(`Fixed ${count} files`);
