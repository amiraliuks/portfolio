export type BlogLanguage = "en" | "al";

// Blog interfaces
export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  description?: string;
  public?: boolean;
  tags?: string[];
  readingTime?: number;
  image?: string;
  language?: BlogLanguage;
  translationKey?: string;
  availableLanguages?: BlogLanguage[];
  translationSlugs?: Partial<Record<BlogLanguage, string>>;
  heroFit?: "cover" | "contain";
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
