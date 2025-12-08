// Blog interfaces
export interface BlogPost {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
  slug: string;
  content: string;
}

export interface BlogPageParams {
  slug: string;
}

export interface BlogPageProps {
  params: Promise<BlogPageParams>;
}
