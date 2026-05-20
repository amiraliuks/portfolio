import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from "rehype-pretty-code";
import { slugifyHeading } from '@/lib/blog-content';
import { cn } from "@/lib/utils";
import { toSafeHref } from "@/lib/url-safety";
import { baseUrl } from "@/app/sitemap";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { MDXImageLightbox } from "@/components/mdx/MDXImageLightbox";
import { ZoomableImage } from "@/components/mdx/ZoomableImage";
import { HeadingCopyLink } from "@/components/blog/HeadingCopyLink";

function StyledTable(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-10 overflow-x-auto">
      <table
        {...props}
        className="
  w-full
  border
  rounded-none
  overflow-hidden
  text-sm
  border-neutral-300
  dark:border-neutral-800
"
      />
    </div>
  );
}

function StyledThead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className="
  border-b
  bg-neutral-200 border-neutral-300
  dark:bg-neutral-900 dark:border-neutral-800
"
    />
  );
}

function StyledTbody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

function StyledTr(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className="
  border-b
  transition-colors
  border-neutral-200
  hover:bg-neutral-100
  dark:border-neutral-800
  dark:hover:bg-neutral-900/60
"
    />
  );
}

function StyledTh(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className="
  text-left
  px-5 py-3
  font-semibold
  uppercase tracking-wide text-xs
  text-neutral-700
  dark:text-neutral-200
"
    />
  );
}

function StyledTd(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className="
  px-5 py-3
  text-neutral-700
  dark:text-neutral-400
"
    />
  );
}

function StyledImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <ZoomableImage {...props} />;
}

function isImageElement(node: ReactNode): node is React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>> {
  return (
    React.isValidElement<React.ImgHTMLAttributes<HTMLImageElement>>(node) &&
    (node.type === "img" || node.type === StyledImage)
  );
}

function upgradeImageChildren(children: ReactNode): ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (isImageElement(child)) {
      return <StyledImage {...child.props} />;
    }

    const childProps = child.props as { children?: ReactNode };
    if (!childProps.children) return child;

    return React.cloneElement(child, {
      children: upgradeImageChildren(childProps.children),
    } as Partial<typeof childProps>);
  });
}

function StyledParagraph({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const childArray = React.Children.toArray(children);
  const onlyChild = childArray.length === 1 ? childArray[0] : null;

  if (isImageElement(onlyChild)) {
    const alt = typeof onlyChild.props.alt === "string" ? onlyChild.props.alt.trim() : "";

    return (
      <figure className="not-prose my-8">
        <StyledImage {...onlyChild.props} />
        {alt ? (
          <figcaption className="mt-3 border-l-2 border-border pl-3 font-sans text-xs leading-relaxed text-muted-foreground">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return <p {...props}>{children}</p>;
}

function StyledFigure({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <figure {...props} className={cn("not-prose my-8", className)}>
      {upgradeImageChildren(children)}
    </figure>
  );
}

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  const safeHref = toSafeHref(href, baseUrl);
  if (!safeHref) {
    return <span {...rest}>{children}</span>;
  }

  if (safeHref.startsWith('/')) {
    return (
      <Link href={safeHref} {...rest}>
        {children}
      </Link>
    );
  }

  if (safeHref.startsWith('#')) {
    return (
      <a href={safeHref} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={safeHref} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function RoundedImage(props: ImageProps) {
  return <Image {...props} className="rounded-lg" alt={props.alt || ''} />;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  "data-language"?: string;
}

function Code({ children, className, ...props }: CodeProps) {
  const isBlockCode =
    className?.includes("language-") || typeof props["data-language"] === "string";

  if (isBlockCode) {
    return (
      <code
        className={cn("font-mono text-[13px] leading-6", className)}
        {...props}
      >
        {children}
      </code>
    );
  }

  // Inline code
  return (
    <code
      className="
        font-mono
        text-[13px]
        px-1.5
        py-0.5
        rounded-none
        bg-neutral-200 text-neutral-800
        dark:bg-neutral-900 dark:text-neutral-200
      "
      {...props}
    >
      {children}
    </code>
  );
}

function extractTextFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractTextFromNode(child)).join("");
  }

  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return extractTextFromNode(node.props.children);
  }

  return "";
}

function createHeading(level: number, getUniqueSlug: (text: string) => string) {
  const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
    const headingText = extractTextFromNode(children).trim();
    const slug = headingText ? getUniqueSlug(headingText) : undefined;

    return React.createElement(
      `h${level}`,
      slug ? { id: slug, className: "scroll-mt-24 group/heading" } : undefined,
      slug
        ? [
          React.createElement('a', {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: 'anchor',
            'aria-label': `Jump to ${headingText}`,
          }),
          children,
          React.createElement(HeadingCopyLink, {
            slug,
            label: headingText || "section",
            key: `copy-${slug}`,
          }),
        ]
        : children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

const baseComponents = {
  Image: RoundedImage,
  img: StyledImage,
  figure: StyledFigure,
  p: StyledParagraph,
  a: CustomLink,
  code: Code,
  pre: CodeBlock,

  table: StyledTable,
  thead: StyledThead,
  tbody: StyledTbody,
  tr: StyledTr,
  th: StyledTh,
  td: StyledTd,
};

const prettyCodeOptions = {
  theme: {
    dark: "dark-plus",
    light: "light-plus",
  },
  keepBackground: false,
  defaultLang: "bash",
  onVisitLine(node: { children: Array<unknown> }) {
    if (!node.children.length) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = [...(node.properties.className ?? []), "code-line-highlighted"];
  },
  onVisitHighlightedWord(node: { properties: { className?: string[] } }) {
    node.properties.className = [...(node.properties.className ?? []), "code-word-highlighted"];
  },
};

export function CustomMDX(props: MDXRemoteProps) {
  const slugCounts = new Map<string, number>();
  const getUniqueSlug = (text: string) => {
    const baseSlug = slugifyHeading(text);
    if (!baseSlug) return "";

    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);
    return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
  };

  const headingComponents = {
    h1: createHeading(1, getUniqueSlug),
    h2: createHeading(2, getUniqueSlug),
    h3: createHeading(3, getUniqueSlug),
    h4: createHeading(4, getUniqueSlug),
    h5: createHeading(5, getUniqueSlug),
    h6: createHeading(6, getUniqueSlug),
  };

  return (
    <MDXImageLightbox>
      <MDXRemote
        {...props}
        components={{ ...baseComponents, ...headingComponents, ...(props.components || {}) }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </MDXImageLightbox>
  );
}