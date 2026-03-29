import path from 'path';
import fs from 'fs';
import { calculateReadingTime } from './utils';

type Metadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  description?: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
};

const FRONTMATTER_KEYS = new Set<keyof Metadata>([
  "title",
  "publishedAt",
  "summary",
  "description",
  "tags",
  "readingTime",
  "image",
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

    const key = rawKey.trim() as keyof Metadata;
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

    metadata[key] = value;
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

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir.toString(), file));
    const slug = path.basename(file, path.extname(file));
    const explicitImage = metadata.image?.trim();

    return {
      slug,
      content,
      metadata: {
        ...metadata,
        description: metadata.description ?? metadata.summary,
        readingTime: metadata.readingTime ?? calculateReadingTime(content),
        image: explicitImage || extractFirstImage(content),
      },
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content'));
}
