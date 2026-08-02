import React from 'react';
import { Post } from '@/lib/types';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NexGenTeck',
    url: 'https://www.nexgenteck.com',
    logo: 'https://www.nexgenteck.com/logo.png',
    description: 'Your Digital Growth Partner - Enterprise AI Automation, Web Development & Digital Growth Services.',
    sameAs: [
      'https://twitter.com/nexgenteck',
      'https://linkedin.com/company/nexgenteck',
      'https://facebook.com/nexgenteck'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NexGenTeck Blog',
    url: 'https://blog.nexgenteck.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://blog.nexgenteck.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `https://blog.nexgenteck.com/author/${post.author.id}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NexGenTeck',
      url: 'https://www.nexgenteck.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.nexgenteck.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.nexgenteck.com/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
