import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");
const requiredFields = ["title", "publishedAt", "tags", "summary", "language", "translationKey"];
const validLanguages = new Set(["en", "al"]);
const validPublicValues = new Set(["true", "false", "yes", "no", "1", "0"]);

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^\uFEFF?---\s*([\s\S]*?)\s*---/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split("\n")) {
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) continue;

    const key = rawKey.trim();
    let value = rest.join(":").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    data[key] = value;
  }

  return data;
}

function isValidDateString(value) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => path.join(contentDir, file));

const errors = [];
const byTranslationKey = new Map();

for (const filePath of files) {
  const name = path.basename(filePath);
  const frontmatter = parseFrontmatter(filePath);

  if (!frontmatter) {
    errors.push(`${name}: missing frontmatter block`);
    continue;
  }

  for (const field of requiredFields) {
    if (!frontmatter[field] || !String(frontmatter[field]).trim()) {
      errors.push(`${name}: missing required field "${field}"`);
    }
  }

  if (frontmatter.publishedAt && !isValidDateString(frontmatter.publishedAt)) {
    errors.push(`${name}: invalid publishedAt "${frontmatter.publishedAt}"`);
  }

  if (frontmatter.language && !validLanguages.has(frontmatter.language)) {
    errors.push(`${name}: invalid language "${frontmatter.language}" (expected "en" or "al")`);
  }

  if (frontmatter.public) {
    const normalizedPublic = String(frontmatter.public).trim().toLowerCase();
    if (!validPublicValues.has(normalizedPublic)) {
      errors.push(
        `${name}: invalid public value "${frontmatter.public}" (expected true/false)`
      );
    }
  }

  if (frontmatter.tags) {
    const tags = String(frontmatter.tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!tags.length) {
      errors.push(`${name}: tags field is present but empty`);
    }
  }

  if (frontmatter.translationKey) {
    const bucket = byTranslationKey.get(frontmatter.translationKey) ?? [];
    bucket.push({ name, language: frontmatter.language });
    byTranslationKey.set(frontmatter.translationKey, bucket);
  }
}

for (const [translationKey, entries] of byTranslationKey.entries()) {
  const languages = new Set(entries.map((item) => item.language));
  if (!languages.has("en")) {
    const filesList = entries.map((item) => item.name).join(", ");
    errors.push(`translationKey "${translationKey}" has no English source (${filesList})`);
  }
}

if (errors.length) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} files.`);
