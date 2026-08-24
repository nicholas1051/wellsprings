import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "pdfs");
mkdirSync(outDir, { recursive: true });

function buildPdf(title) {
  const content = `BT /F1 20 Tf 72 700 Td (${title}) Tj ET\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${content.length} >>\nstream\n${content}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((obj, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return pdf;
}

const files = [
  { file: "floor-plan-type-a.pdf", title: "Type A Floor Plan — Placeholder. Replace with the real plan." },
  { file: "floor-plan-type-b.pdf", title: "Type B Floor Plan — Placeholder. Replace with the real plan." },
  { file: "floor-plan-type-c.pdf", title: "Type C Floor Plan — Placeholder. Replace with the real plan." },
];

for (const file of files) {
  writeFileSync(join(outDir, file.file), buildPdf(file.title), "binary");
}

console.log(`Generated ${files.length} placeholder PDFs in ${outDir}`);
