import path from 'path';
import fs from 'fs';
import { calculateReadingTime } from './utils';
import { extractPostDescription } from './blog-content';

type Metadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  description?: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
  language?: BlogLanguage;
  translationKey?: string;
  availableLanguages?: BlogLanguage[];
  translationSlugs?: Partial<Record<BlogLanguage, string>>;
};

export type BlogLanguage = "en" | "al";

type FrontmatterKey =
  | "title"
  | "publishedAt"
  | "summary"
  | "description"
  | "tags"
  | "readingTime"
  | "image"
  | "language"
  | "translationKey";

const FRONTMATTER_KEYS = new Set<keyof Metadata>([
  "title",
  "publishedAt",
  "summary",
  "description",
  "tags",
  "readingTime",
  "image",
  "language",
  "translationKey",
]);

const TAG_ALIASES: Record<string, string> = {
  "browser extension": "Browser Extensions",
  chrome: "Browser Extensions",
  firefox: "Browser Extensions",
  "domain verification": "Browser Extensions",
  "web security": "Security Research",
  phishing: "Security Research",
  cve: "Security Research",
  rce: "Security Research",
  "broken access control": "Security Research",
  ctf: "CTF Writeups",
  writeup: "CTF Writeups",
};

function normalizeTag(tag: string) {
  const normalizedKey = tag.trim().toLowerCase();
  return TAG_ALIASES[normalizedKey] ?? tag.trim();
}

function extractFirstImage(content: string) {
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

function parseLanguage(value: string): BlogLanguage | undefined {
  const normalized = value.trim().toLowerCase();
  if (normalized === "en" || normalized === "english") return "en";
  if (normalized === "al" || normalized === "sq" || normalized === "albanian" || normalized === "shqip") {
    return "al";
  }
  return undefined;
}

function inferLanguageFromSlug(slug: string): BlogLanguage {
  return slug.toLowerCase().endsWith("-al") ? "al" : "en";
}

function inferTranslationKey(slug: string, explicitTranslationKey?: string, language?: BlogLanguage) {
  const explicit = explicitTranslationKey?.trim();
  if (explicit) return explicit;

  const inferredLanguage = language ?? inferLanguageFromSlug(slug);
  if (inferredLanguage === "al" && slug.toLowerCase().endsWith("-al")) {
    return slug.slice(0, -3);
  }

  return slug;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {} as Metadata, content: fileContent };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();

  const metadata: Partial<Metadata> = {};

  frontMatterBlock.split("\n").forEach((line) => {
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || !rest.length) return;

    const key = rawKey.trim() as FrontmatterKey;
    if (!FRONTMATTER_KEYS.has(key)) return;

    let value = rest.join(":").trim();

    value = value.replace(/^['"](.*)['"]$/, "$1");

    if (key === "tags") {
      metadata.tags = Array.from(
        new Set(
          value
            .split(",")
            .map((tag) => normalizeTag(tag))
            .filter(Boolean)
        )
      );
      return;
    }

    if (key === "readingTime") {
      const parsedValue = Number(value);
      if (!Number.isNaN(parsedValue)) {
        metadata.readingTime = parsedValue;
      }
      return;
    }

    if (key === "language") {
      const parsedLanguage = parseLanguage(value);
      if (parsedLanguage) metadata.language = parsedLanguage;
      return;
    }

    if (key === "translationKey") {
      metadata.translationKey = value;
      return;
    }

    (metadata as Record<string, unknown>)[key] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: fs.PathLike) {
  const mdxFiles = getMDXFiles(dir);

  const rawPosts = mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir.toString(), file));
    const slug = path.basename(file, path.extname(file));
    const explicitImage = metadata.image?.trim();
    const fallbackDescription =
      metadata.description ?? metadata.summary ?? extractPostDescription(content);
    const normalizedTags = metadata.tags?.filter(Boolean) ?? [];
    const language = metadata.language ?? inferLanguageFromSlug(slug);
    const translationKey = inferTranslationKey(slug, metadata.translationKey, language);

    return {
      slug,
      content,
      metadata: {
        ...metadata,
        language,
        translationKey,
        summary: metadata.summary ?? fallbackDescription,
        description: fallbackDescription,
        tags: normalizedTags,
        readingTime: metadata.readingTime ?? calculateReadingTime(content),
        image: explicitImage || extractFirstImage(content),
      },
    };
  });

  const translationGroups = new Map<
    string,
    {
      slugs: Partial<Record<BlogLanguage, string>>;
      languages: Set<BlogLanguage>;
    }
  >();

  rawPosts.forEach((post) => {
    const key = post.metadata.translationKey ?? post.slug;
    const language = post.metadata.language ?? inferLanguageFromSlug(post.slug);
    const group = translationGroups.get(key) ?? {
      slugs: {},
      languages: new Set<BlogLanguage>(),
    };

    group.languages.add(language);
    if (!group.slugs[language]) {
      group.slugs[language] = post.slug;
    }

    translationGroups.set(key, group);
  });

  return rawPosts.map((post) => {
    const groupKey = post.metadata.translationKey ?? post.slug;
    const group = translationGroups.get(groupKey);
    const availableLanguages = (["en", "al"] as BlogLanguage[]).filter((language) =>
      group?.languages.has(language)
    );

    return {
      ...post,
      metadata: {
        ...post.metadata,
        availableLanguages:
          availableLanguages.length > 0
            ? availableLanguages
            : [post.metadata.language ?? inferLanguageFromSlug(post.slug)],
        translationSlugs: group?.slugs ?? {},
      },
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content'));
}

export function getBlogListingPosts() {
  const allPosts = getBlogPosts();
  const grouped = new Map<string, (typeof allPosts)[number]>();

  allPosts.forEach((post) => {
    const groupKey = post.metadata.translationKey ?? post.slug;
    const existing = grouped.get(groupKey);
    if (!existing) {
      grouped.set(groupKey, post);
      return;
    }

    const existingLanguage = existing.metadata.language ?? inferLanguageFromSlug(existing.slug);
    const currentLanguage = post.metadata.language ?? inferLanguageFromSlug(post.slug);

    if (existingLanguage !== "en" && currentLanguage === "en") {
      grouped.set(groupKey, post);
      return;
    }

    if (existingLanguage === currentLanguage) {
      const existingDate = new Date(existing.metadata.publishedAt).getTime();
      const currentDate = new Date(post.metadata.publishedAt).getTime();
      if (currentDate > existingDate) {
        grouped.set(groupKey, post);
      }
    }
  });

  return Array.from(grouped.values());
}
