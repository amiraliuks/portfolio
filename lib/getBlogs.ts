import path from 'path';
import fs from 'fs';

type Metadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  description?: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
};

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

    const key = rawKey.trim();
    let value = rest.join(":").trim();

    value = value.replace(/^['"](.*)['"]$/, "$1");

    // arrays: tags: a, b, c
    if (value.includes(",")) {
      metadata[key as keyof Metadata] = value
        .split(",")
        .map(v => v.trim()) as any;
      return;
    }

    // numbers
    if (!isNaN(Number(value))) {
      metadata[key as keyof Metadata] = Number(value) as any;
      return;
    }

    metadata[key as keyof Metadata] = value as any;
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

    return {
      slug,
      content,
      metadata: {
        ...metadata,
        description: metadata.description ?? metadata.summary,
      },
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content'));
}