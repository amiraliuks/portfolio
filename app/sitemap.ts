import { getBlogPosts } from '@/lib/getBlogs';
import { projects } from '@/data/projects';

export const baseUrl = 'https://amiraliu.vercel.app';

export default async function sitemap() {
  const blogs = getBlogPosts()
    .filter((post) => post.metadata.public !== false)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.createdAt,
  }));

  const routes = ['', '/about', '/projects', '/certifications', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...projectRoutes];
}
