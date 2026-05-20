import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";

import { Toaster } from '@/components/ui/sonner';
import { JetBrains_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/layout/theme-provider';
import { ProgressBar } from '@/components/layout/ProgressBar';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { metadata as appMetadata } from '@/data/metadata';


const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  ...appMetadata,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amir Aliu',
    alternateName: 'Amir Aliu',
    url: 'https://amiraliu.vercel.app',
    image:
      'https://amiraliu.vercel.app/og?title=Amir%20Aliu&description=Cybersecurity%20research%20and%20modern%20web%20development',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent',
    },
    sameAs: ['https://github.com/amiraliuks', 'https://x.com/amiraliudev'],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Amir Aliu Portfolio',
    url: 'https://amiraliu.vercel.app',
    description:
      'Full Stack Developer & Designer portfolio featuring web apps, UI experiments, and open source contributions.',
    author: {
      '@type': 'Person',
      name: 'Amir Aliu',
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} overflow-scroll scrollbar-hide`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const appliedTheme = theme === 'system' ? systemTheme : theme;
                  document.documentElement.classList.add(appliedTheme);
                } catch (e) {}
              `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar />
            <div className="app-shell mx-auto max-w-2xl px-5 sm:px-6 lg:px-8 flex flex-col pt-12 min-h-screen">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Skip to main content
              </a>
              <Navbar />
              <main id="main-content" className="grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster
              position="bottom-right"
              richColors
              closeButton
              toastOptions={{
                className: 'border border-border bg-background text-foreground',
                duration: 5000,
                style: {
                  fontFamily: 'DM Sans, sans-serif',
                },
              }}
            />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}