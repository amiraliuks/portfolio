import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");
const contentRoots = [path.join(contentDir, "blog-posts"), path.join(contentDir, "writeups")];
const mojibakeFixes = new Map([
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€¦", "…"],
  ["â†’", "→"],
  ["Ã—", "×"],
  ["ðŸ‘‰", "👉"],
  ["ðŸ‡½ðŸ‡°", "🇽🇰"],
]);

function normalizeMarkdown(input) {
  let output = input.replace(/\r\n/g, "\n");

  const suspiciousCount = (output.match(/Ã.|â.|ðŸ|Â/g) ?? []).length;
  if (suspiciousCount >= 3) {
    const repaired = Buffer.from(output, "latin1").toString("utf8");
    const repairedSuspiciousCount = (repaired.match(/Ã.|â.|ðŸ|Â/g) ?? []).length;
    if (repairedSuspiciousCount < suspiciousCount) {
      output = repaired;
    }
  }

  for (const [bad, good] of mojibakeFixes.entries()) {
    output = output.replaceAll(bad, good);
  }

  output = output
    .replace(/[ \t]+$/gm, "")
    .replace(/^-{8,}$/gm, "---")
    .replace(/``` +([a-zA-Z0-9_-]+)/g, "```$1")
    .replace(/([A-Za-z])\.It\b/g, "$1. It")
    .replace(/spectogram/gi, "spectrogram")
    .replace(/\n{3,}/g, "\n\n");

  return output.trimEnd() + "\n";
}

const files = contentRoots.flatMap((dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
});

let changed = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");
  const normalized = normalizeMarkdown(original);
  if (normalized === original) continue;

  fs.writeFileSync(filePath, normalized, "utf8");
  changed += 1;
}

console.log(`Normalized ${changed} content file${changed === 1 ? "" : "s"}.`);