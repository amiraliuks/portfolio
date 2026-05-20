import fs from "node:fs";
import path from "node:path";

const siteUrl = "https://amiraliu.vercel.app";
const contentDir = path.join(process.cwd(), "content");
const blogPostsDir = path.join(contentDir, "blog-posts");
const writeupsDir = path.join(contentDir, "writeups");
const publicDir = path.join(process.cwd(), "public");
const projectsFile = path.join(process.cwd(), "data", "projects.ts");

const errors = [];
const warnings = [];

function parseFrontmatter(raw) {
  const match = raw.match(/^\uFEFF?---\s*([\s\S]*?)\s*---/);
  if (!match) return { frontmatter: null, body: raw };

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) continue;
    const key = rawKey.trim();
    const value = rest.join(":").trim().replace(/^['"](.*)['"]$/, "$1");
    frontmatter[key] = value;
  }

  return { frontmatter, body: raw.slice(match[0].length).trim() };
}

function extractFirstImage(content) {
  const markdownImageMatch = content.match(
    /!\[[^\]]*\]\((?:<([^>]+)>|([^) \t\r\n]+))(?:\s+"[^"]*")?\)/
  );
  const markdownImageSrc = markdownImageMatch?.[1] ?? markdownImageMatch?.[2];
  if (markdownImageSrc) return markdownImageSrc;

  const mdxImageMatch = content.match(/<Image[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
  if (mdxImageMatch?.[1]) return mdxImageMatch[1];

  const htmlImageMatch = content.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
  if (htmlImageMatch?.[1]) return htmlImageMatch[1];

  return undefined;
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value, siteUrl);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function validateLocalAsset(ref, context) {
  if (!ref || !ref.startsWith("/")) return;

  const localPath = path.join(publicDir, ref.slice(1));
  if (!fs.existsSync(localPath)) {
    errors.push(`${context}: missing local asset "${ref}"`);
  }
}

function validatePostSeo({ dir, routeBase, label }) {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((file) => file.endsWith(".mdx")) : [];
  const slugs = new Set();
  let publicPostCount = 0;

  for (const file of files) {
    const resolvedFilePath = path.join(dir, file);
    const context = path.relative(process.cwd(), resolvedFilePath);
    const slug = path.basename(file, ".mdx");
    const raw = fs.readFileSync(resolvedFilePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);

    if (!frontmatter) {
      errors.push(`${context}: missing frontmatter`);
      continue;
    }

    const isPublic = String(frontmatter.public ?? "true").trim().toLowerCase() !== "false";
    if (!isPublic) continue;
    publicPostCount += 1;

    if (!frontmatter.title) errors.push(`${context}: missing "title"`);
    if (!frontmatter.summary && !frontmatter.description) {
      errors.push(`${context}: missing "summary" or "description"`);
    }

    if (slugs.has(slug)) errors.push(`${context}: duplicate slug "${slug}"`);
    slugs.add(slug);

    const image = frontmatter.image || extractFirstImage(body);
    if (!image) {
      warnings.push(`${context}: no image found (will fallback to generated /og card)`);
    } else {
      validateLocalAsset(image, context);
      if (!isValidUrl(image) && !image.startsWith("/")) {
        errors.push(`${context}: invalid image URL "${image}"`);
      }
    }

    const canonical = `${siteUrl}${routeBase}/${slug}`;
    if (!isValidUrl(canonical)) {
      errors.push(`${context}: invalid canonical URL "${canonical}"`);
    }
  }

  return { label, count: publicPostCount };
}

function extractField(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  return match?.[1];
}

function validateProjectSeo() {
  const raw = fs.readFileSync(projectsFile, "utf8");
  const blocks = raw.match(/{\s*id:\s*\d+,[\s\S]*?\n\s*},/g) ?? [];
  const slugs = new Set();

  for (const block of blocks) {
    const slug = extractField(block, "slug");
    const title = extractField(block, "title");
    const description = extractField(block, "description");
    const image = extractField(block, "image");
    const galleryImage =
      block.match(/postImages:\s*\[[\s\S]*?src:\s*"([^"]+)"/)?.[1] ?? undefined;
    const ogImage = image || galleryImage;

    if (!slug) {
      errors.push("projects.ts: project block missing slug");
      continue;
    }

    if (slugs.has(slug)) errors.push(`projects.ts: duplicate slug "${slug}"`);
    slugs.add(slug);

    if (!title) errors.push(`projects.ts (${slug}): missing title`);
    if (!description) errors.push(`projects.ts (${slug}): missing description`);

    if (!ogImage) {
      warnings.push(`projects.ts (${slug}): no image/gallery image (will fallback to generated /og card)`);
    } else {
      validateLocalAsset(ogImage, `projects.ts (${slug})`);
      if (!isValidUrl(ogImage) && !ogImage.startsWith("/")) {
        errors.push(`projects.ts (${slug}): invalid image URL "${ogImage}"`);
      }
    }

    const canonical = `${siteUrl}/projects/${slug}`;
    if (!isValidUrl(canonical)) {
      errors.push(`projects.ts (${slug}): invalid canonical URL "${canonical}"`);
    }
  }

  return blocks.length;
}

const blogResult = validatePostSeo({ dir: blogPostsDir, routeBase: "/blog", label: "blog posts" });
const writeupResult = validatePostSeo({
  dir: writeupsDir,
  routeBase: "/writeups",
  label: "writeups",
});
const projectCount = validateProjectSeo();

if (warnings.length) {
  console.warn("SEO warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length) {
  console.error("SEO validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `SEO validation passed (${blogResult.count} ${blogResult.label}, ${writeupResult.count} ${writeupResult.label}, ${projectCount} projects).`
);