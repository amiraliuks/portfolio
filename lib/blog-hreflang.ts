import type { BlogPost, BlogLanguage } from "@/types/types";

const HREFLANG_BY_LANGUAGE: Record<BlogLanguage, string> = {
  en: "en-US",
  al: "sq-AL",
};

const OG_LOCALE_BY_LANGUAGE: Record<BlogLanguage, string> = {
  en: "en_US",
  al: "sq_AL",
};

export function getBlogHreflangAlternates(
  post: BlogPost,
  siteBaseUrl: string,
  routeBase = "/blog"
) {
  const alternates: Record<string, string> = {};
  const translationSlugs = post.metadata.translationSlugs ?? {};

  (Object.keys(HREFLANG_BY_LANGUAGE) as BlogLanguage[]).forEach((language) => {
    const slug = translationSlugs[language];
    if (!slug) return;
    alternates[HREFLANG_BY_LANGUAGE[language]] = `${siteBaseUrl}${routeBase}/${slug}`;
  });

  if (Object.keys(alternates).length === 0) {
    const fallbackLanguage = post.metadata.language ?? "en";
    alternates[HREFLANG_BY_LANGUAGE[fallbackLanguage]] = `${siteBaseUrl}${routeBase}/${post.slug}`;
  }

  if (alternates["en-US"]) {
    alternates["x-default"] = alternates["en-US"];
  } else {
    alternates["x-default"] = `${siteBaseUrl}${routeBase}/${post.slug}`;
  }

  return alternates;
}

export function getOpenGraphLocales(post: BlogPost) {
  const currentLanguage = post.metadata.language ?? "en";
  const currentLocale = OG_LOCALE_BY_LANGUAGE[currentLanguage];

  const alternateLocales = Array.from(
    new Set(
      (post.metadata.availableLanguages ?? [])
        .filter((language) => language !== currentLanguage)
        .map((language) => OG_LOCALE_BY_LANGUAGE[language])
    )
  );

  return {
    locale: currentLocale,
    alternateLocale: alternateLocales,
  };
}