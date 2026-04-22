# Amir Aliu Portfolio

This is my personal portfolio site built with Next.js.

It is both a public profile and a living archive of what I ship: projects, certifications, blog writeups, and security-focused work.

## What is included
- Home page with:
  - profile intro
  - social links
  - live snapshot metrics (projects, certs, posts)
  - featured blog posts
  - experience and education sections
- Projects section with sortable cards and detailed project pages
- Certifications section with category filters (`All`, `Professional`, `CTF`) and expandable details
- Blog section with:
  - search and tag filters
  - featured posts
  - EN/AL language support (with language switch on post pages)
  - reading time, reading progress bar, and table of contents
  - related posts by language/tag relevance
  - per-post hero image mode (`cover` or `contain`) via frontmatter
- About page with highlights, journey timeline, focus areas, and trust/profile links
- Testimonials route (currently intentionally not publishing testimonials)

## SEO and metadata features
- Route-level metadata for core pages
- Open Graph + Twitter cards
- JSON-LD structured data (Person, Website, CollectionPage, BlogPosting, Breadcrumbs)
- Canonical URLs
- Multilingual alternates (`hreflang`) for EN/AL blog variants
- Dynamic sitemap with blog/project routes

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- MDX (`next-mdx-remote`) for blog content
- Framer Motion, Radix UI, Lucide, React Icons
- Vercel Analytics + Speed Insights
- Playwright for E2E tests

## Run locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix

npm run format:content
npm run validate:content
npm run validate:images
npm run validate:images:strict
npm run validate:seo

npm run test:e2e
npm run test:e2e:headed
```

## Blog content notes
Blog posts are stored in `content/*.mdx`.

Supported frontmatter fields include:
- `title`
- `publishedAt`
- `summary` / `description`
- `public`
- `tags`
- `image`
- `language` (`en` or `al`)
- `translationKey`
- `heroFit` (`cover` or `contain`)

## Project structure (high-level)
- `app/` - routes and page-level metadata
- `components/` - UI and feature components
- `content/` - MDX blog posts
- `data/` - projects, certifications, experience, metadata, tech stack
- `lib/` - parsing, SEO helpers, analytics helpers, utility functions
- `scripts/` - content/SEO/image validation scripts
- `tests/` - Playwright E2E tests

## Deploy
The site is deployed on Vercel.

Any push can be built with:

```bash
npm run build
```

---

If you are forking this repo, replace the personal data in `data/*`, update `baseUrl` in `app/sitemap.ts`, and regenerate metadata/OG values to match your own domain.