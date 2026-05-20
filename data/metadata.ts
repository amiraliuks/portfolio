const siteUrl = "https://amiraliu.vercel.app";
const defaultTitle = "Amir Aliu - Full Stack Developer";
const defaultDescription =
  "Cybersecurity practitioner focused on vulnerability research and CTF competitions.";
const defaultOgImage = `${siteUrl}/og?title=${encodeURIComponent(defaultTitle)}&description=${encodeURIComponent(defaultDescription)}`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Amir Aliu",
  },
  description: defaultDescription,
  keywords: [
    "Amir Aliu",
    "Amir Aliu Portfolio",
    "Amir Aliu Projects",
    "Amir Aliu Developer",
    "Aliu",
    "Amir Aliu",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Developer",
    "Web Applications",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Next.js Projects",
    "Open Source Contributions",
    "Creative Coding",
    "Portfolio",
    "Software Engineer",
    "UI Design",
    "UX Design",
    "Web Developer Portfolio",
    "Kosovo Developer",
    "Modern Web Development",
    "Web Design",
    "Web Development Projects",
    "Web Apps",
    "DevOps",
  ],
  authors: [{ name: "Amir Aliu", url: siteUrl }],
  creator: "Amir Aliu",
  publisher: "Amir Aliu",
  robots: "index, follow",
  openGraph: {
    title: defaultTitle,
    description:
      "Explore the projects by Amir Aliu - web apps, creative experiments, and open source work.",
    url: siteUrl,
    siteName: defaultTitle,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Explore the projects by Amir Aliu - web apps, creative experiments, and open source work.",
    site: "@amiraliudev",
    creator: "@amiraliudev",
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss`,
    },
  },
};