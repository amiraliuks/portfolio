import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const warnThresholdBytes = 1.5 * 1024 * 1024;
const failThresholdBytes = 3 * 1024 * 1024;
const strictMode = process.argv.includes("--strict");

const warnings = [];
const errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!imageExtensions.has(ext)) continue;

    const stats = fs.statSync(fullPath);
    const sizeBytes = stats.size;
    const relative = path.relative(publicDir, fullPath).replace(/\\/g, "/");

    if (sizeBytes >= failThresholdBytes) {
      errors.push({ relative, sizeBytes });
    } else if (sizeBytes >= warnThresholdBytes) {
      warnings.push({ relative, sizeBytes });
    }
  }
}

if (fs.existsSync(publicDir)) {
  walk(publicDir);
}

function toMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

if (warnings.length) {
  console.warn("Large images (warning > 1.5MB):");
  for (const item of warnings) {
    console.warn(`- ${item.relative} (${toMb(item.sizeBytes)} MB)`);
  }
}

if (errors.length) {
  console.error(
    strictMode
      ? "Oversized images (fail > 3MB):"
      : "Oversized images detected (run with --strict to fail CI):"
  );
  for (const item of errors) {
    console.error(`- ${item.relative} (${toMb(item.sizeBytes)} MB)`);
  }
  if (strictMode) {
    process.exit(1);
  }
}

console.log("Image size check passed.");