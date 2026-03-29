import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import remarkGfm from 'remark-gfm'
import { slugifyHeading } from '@/lib/blog-content';

function StyledTable(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-10 overflow-x-auto">
      <table
        {...props}
        className="
  w-full
  border
  rounded-xl
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

function StyledPre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className="
        my-8
        rounded-xl
        border
        px-4 py-3
        sm:px-5 sm:py-4
        overflow-x-auto
        text-[13px]
        leading-6
        not-prose
        font-mono
        bg-[#f6f8fa] border-[#d0d7de]
        dark:bg-[#1e1e1e] dark:border-[#2d2d30]
      "
    />
  );
}

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
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
}

function Code({ children, className, ...props }: CodeProps) {
  const rawCode = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : ""
    )
    .join("");

  const normalizedCode = rawCode.replace(/\r\n?/g, "\n");
  const isBlock = className?.includes("language-") || normalizedCode.includes("\n");

  if (isBlock) {
    const codeHTML = highlight(normalizedCode.replace(/\n$/, ""));

    return (
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className="block font-mono text-[13px] leading-6 text-[#24292f] dark:text-[#d4d4d4]"
        {...props}
      />
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
        rounded-md
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
      slug ? { id: slug, className: "scroll-mt-24" } : undefined,
      slug
        ? [
          React.createElement('a', {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: 'anchor',
          }),
          children,
        ]
        : children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

const baseComponents = {
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: StyledPre,

  table: StyledTable,
  thead: StyledThead,
  tbody: StyledTbody,
  tr: StyledTr,
  th: StyledTh,
  td: StyledTd,
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
    <MDXRemote
      {...props}
      components={{ ...baseComponents, ...headingComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
