export type BlogLanguage = "en" | "al";

// Blog interfaces
export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  description?: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
  language?: BlogLanguage;
  translationKey?: string;
  availableLanguages?: BlogLanguage[];
  translationSlugs?: Partial<Record<BlogLanguage, string>>;
};

export type BlogPost = {
  slug: string;
  content: string;
  metadata: BlogMetadata;
};

export type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
