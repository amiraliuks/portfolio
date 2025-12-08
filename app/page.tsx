import { Metadata } from 'next';
import MainContent from '@/components/MainContent';

export const metadata: Metadata = {
  title: 'Amir Aliu - Full Stack Developer',
  description:
    'Full Stack Developer from Kosovo.',
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
};

export default function HomePage() {
  return (
    <MainContent />
  )
}
