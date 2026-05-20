import { Metadata } from 'next';
import MainContent from '@/components/sections/MainContent';
import { getBlogListingPosts } from '@/lib/getBlogs';
import { projects } from '@/data/projects';
import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: {
    absolute: 'Amir Aliu - Full Stack Developer',
  },
  description:
    'Full Stack Developer from Kosovo.',
  keywords: [
    'Amir Aliu',
    'Cybersecurity portfolio',
    'Full stack developer',
    'CTF competitor',
    'React and Next.js',
  ],
  openGraph: {
    title: 'Amir Aliu - Full Stack Developer',
    description:
      'Full Stack Developer from Kosovo.',
    url: 'https://amiraliu.vercel.app',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Amir%20Aliu%20-%20Full%20Stack%20Developer&description=Building%20scalable%20web%20applications%20with%20modern%20technologies',
        width: 1200,
        height: 630,
        alt: 'Amir Aliu Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amir Aliu - Full Stack Developer',
    description:
      'Full Stack Developer from Kosovo.',
    images: [
      'https://amiraliu.vercel.app/og?title=Amir%20Aliu%20-%20Full%20Stack%20Developer&description=Building%20scalable%20web%20applications%20with%20modern%20technologies',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app',
  },
};

export default function HomePage() {
  const posts = getBlogListingPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  const featuredPosts = posts.slice(0, 2).map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    description: post.metadata.description ?? post.metadata.summary ?? "",
    publishedAt: post.metadata.publishedAt,
    readingTime: post.metadata.readingTime ?? 1,
    tags: (post.metadata.tags ?? []).slice(0, 2),
  }));

  const metrics = [
    { label: "Projects", value: projects.length },
    { label: "Certifications", value: certifications.length },
    { label: "Findings", value: 6, href: "/research" },
    { label: "Blog Posts", value: posts.length },
  ];

  return (
    <MainContent metrics={metrics} featuredPosts={featuredPosts} />
  )
}