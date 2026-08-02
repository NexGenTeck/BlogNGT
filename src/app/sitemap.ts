import { MetadataRoute } from 'next';
import { POSTS } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { AUTHORS } from '@/lib/authors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog.nexgenteck.com';

  const staticPages = [
    '',
    '/categories',
    '/tags',
    '/about',
    '/contact',
    '/search',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/dmca',
    '/editorial-policy',
    '/write-for-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const postPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const authorPages = AUTHORS.map((author) => ({
    url: `${baseUrl}/author/${author.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...authorPages];
}
