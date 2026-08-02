export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  image?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  isDraft?: boolean;
  views?: number;
  faqs?: FAQItem[];
  tableOfContents?: { id: string; title: string; level: number }[];
  metaTitle?: string;
  metaDescription?: string;
}
