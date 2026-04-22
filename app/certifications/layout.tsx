import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications',
  description:
    "Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I've built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.",
  openGraph: {
    title: 'Certifications | Amir Aliu',
    description:
      "Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I've built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.",
    url: 'https://amiraliu.vercel.app/certifications',
    type: 'website',
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/certifications',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
