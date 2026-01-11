import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Amir Aliu',
  description:
    'Browse my portfolio of web applications, creative experiments, and open-source contributions. Built with React, Next.js, TypeScript, and modern web technologies.',
  openGraph: {
    title: 'Projects — Amir Aliu',
    description:
      'Browse my portfolio of web applications, creative experiments, and open-source contributions.',
    url: 'https://amiraliu.vercel.app/projects',
    type: 'website',
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}