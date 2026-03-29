import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import remarkGfm from 'remark-gfm'

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
        leading-5
        not-prose
        bg-neutral-100 border-neutral-200
        dark:bg-neutral-950 dark:border-neutral-800
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
        className="block font-mono text-[13px] leading-5 text-neutral-900 dark:text-neutral-100"
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

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level: number) {
  const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
    const slug = typeof children === 'string' ? slugify(children) : undefined;

    return React.createElement(
      `h${level}`,
      slug ? { id: slug } : undefined,
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

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
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
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
