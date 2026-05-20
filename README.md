# Amir Aliu Portfolio

This is my personal portfolio site built with Next.js.

It is both a public profile and a living archive of what I ship: projects, certifications, research, CTF writeups, and security-focused work.

## What is included
- Home page with:
  - profile intro
  - social links
  - live snapshot metrics (projects, certs, posts)
  - featured blog posts
  - animated experience and education sections
  - resume preview sheet with open/download fallback links
- Projects section with:
  - category filters for web, software, game, browser extension, mobile, ML, hardware, security, and automation work
  - project cards with stack/category badges
  - detailed project pages with media galleries and structured metadata
- Certifications section with category filters (`All`, `Professional`, `CTF`) and expandable details
- Research section with CVE/disclosure tracking and links to related writeups
- Blog section with:
  - search and tag filters
  - featured posts
  - EN/AL language support (with language switch on post pages)
  - reading time, reading progress bar, and table of contents
  - related posts by language/tag relevance
  - per-post hero image mode (`cover` or `contain`) via frontmatter
- Writeups section for CTF writeups from solo and team competitions
- About page with highlights, journey timeline, focus areas, and trust/profile links
- Testimonials route (currently intentionally not publishing testimonials)

## SEO and metadata features
- Route-level metadata for core pages
- Open Graph + Twitter cards
- JSON-LD structured data (Person, Website, CollectionPage, BlogPosting, Breadcrumbs)
- Canonical URLs
- Multilingual alternates (`hreflang`) for EN/AL blog variants
- Dynamic sitemap with blog, writeup, project, and core page routes
- Dynamic OG image route

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

## Content notes
Blog posts are stored in `content/blog-posts/*.mdx`.

CTF writeups are stored in `content/writeups/*.mdx`.

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
  - `components/layout/` - navbar, footer, theme provider, progress bar
  - `components/sections/` - home, project, research, certification, education, experience sections
  - `components/media/` - resume sheet, image modal, badge sheet, project media showcase
  - `components/blog/`, `components/mdx/`, `components/ui/` - blog helpers, MDX rendering, shared UI primitives
- `content/blog-posts/` - MDX blog posts
- `content/writeups/` - CTF writeups
- `data/` - projects, certifications, experience, metadata, tech stack
- `lib/` - parsing, SEO helpers, analytics helpers, utility functions
- `public/` - static assets
  - `public/icons/` - favicon and app icons
  - `public/brand/` - brand/supporting footer assets
  - `public/og/` - static OG/reference images
  - `public/projects/`, `public/certifications/`, `public/education/`, `public/blog-posts/`, `public/ctf-writeups/` - page-specific media
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