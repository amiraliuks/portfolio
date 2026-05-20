import { MetadataRoute } from 'next';
import { getBlogPosts, getWriteupPosts } from '@/lib/getBlogs';
import { projects } from '@/data/projects';
import type { BlogPost } from '@/types/types';
import { getBlogHreflangAlternates } from '@/lib/blog-hreflang';

export const baseUrl = 'https://amiraliu.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getBlogPosts()
    .filter((post) => post.metadata.public !== false)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
      alternates: {
        languages: getBlogHreflangAlternates(post as BlogPost, baseUrl),
      },
    }));

  const writeups = getWriteupPosts()
    .filter((post) => post.metadata.public !== false)
    .map((post) => ({
      url: `${baseUrl}/writeups/${post.slug}`,
      lastModified: post.metadata.publishedAt,
      alternates: {
        languages: getBlogHreflangAlternates(post as BlogPost, baseUrl, '/writeups'),
      },
    }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.createdAt,
  }));

  const routes = ['', '/about', '/projects', '/research', '/certifications', '/blog', '/writeups'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...writeups, ...projectRoutes];
}