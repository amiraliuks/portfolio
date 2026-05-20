export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

const HEADING_PATTERN = /^(#{1,3})\s+(.+)$/;

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function stripInlineMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const slugCounts = new Map<string, number>();
  let inCodeFence = false;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence || !line) continue;

    const match = line.match(HEADING_PATTERN);
    if (!match) continue;

    const level = match[1].length as 1 | 2 | 3;
    const text = stripInlineMarkdown(match[2]);
    const baseId = slugifyHeading(text);

    if (!text || !baseId) continue;

    const count = slugCounts.get(baseId) ?? 0;
    slugCounts.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    headings.push({ id, text, level });
  }

  return headings;
}

export function extractPostDescription(content: string, maxLength = 180) {
  let inCodeFence = false;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) continue;
    if (/^(#{1,6}|\*|-|>|\||\d+\.)/.test(line)) continue;

    const cleaned = stripInlineMarkdown(line);
    if (!cleaned) continue;

    if (cleaned.length <= maxLength) return cleaned;
    return `${cleaned.slice(0, maxLength - 3).trimEnd()}...`;
  }

  return "";
}

function normalizeComparableImageSrc(src: string) {
  const value = src.trim().replace(/^<|>$/g, "");
  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);
      return `${url.origin}${url.pathname}`.toLowerCase();
    } catch {
      return value.toLowerCase();
    }
  }

  return value.split(/[?#]/)[0].toLowerCase();
}

function imageSourcesMatch(a: string, b: string) {
  const normalizedA = normalizeComparableImageSrc(a);
  const normalizedB = normalizeComparableImageSrc(b);
  if (!normalizedA || !normalizedB) return false;

  if (normalizedA === normalizedB) return true;
  if (normalizedA.endsWith(normalizedB)) return true;
  if (normalizedB.endsWith(normalizedA)) return true;
  return false;
}

function extractImageSrcFromLine(line: string) {
  const markdownImageMatch = line.match(
    /^!\[[^\]]*\]\((?:<([^>]+)>|([^) \t\r\n]+))(?:\s+"[^"]*")?\)\s*$/
  );
  if (markdownImageMatch?.[1] || markdownImageMatch?.[2]) {
    return markdownImageMatch[1] ?? markdownImageMatch[2];
  }

  const mdxImageMatch = line.match(/^<Image[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>\s*$/i);
  if (mdxImageMatch?.[1]) return mdxImageMatch[1];

  const htmlImageMatch = line.match(/^<img[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>\s*$/i);
  if (htmlImageMatch?.[1]) return htmlImageMatch[1];

  return null;
}

export function stripFirstMatchingImageFromContent(content: string, targetImage?: string) {
  if (!targetImage) return content;

  const lines = content.split(/\r?\n/);
  const output: string[] = [];
  let removed = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const candidateSrc = extractImageSrcFromLine(line.trim());

    if (!removed && candidateSrc && imageSourcesMatch(candidateSrc, targetImage)) {
      removed = true;

      const nextLine = lines[index + 1];
      if (typeof nextLine === "string" && nextLine.trim() === "") {
        index += 1;
      }

      continue;
    }

    output.push(line);
  }

  return output.join("\n");
}