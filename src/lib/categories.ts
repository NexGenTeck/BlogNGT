import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI Automation',
    description: 'Practical guides, LLM integration, workflow automation, and agentic solutions.',
    iconName: 'Bot',
  },
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    description: 'Modern frontend, backend architecture, performance, and responsive web design.',
    iconName: 'Code',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Data-driven growth strategies, PPC, content marketing, and brand building.',
    iconName: 'TrendingUp',
  },
  {
    id: 'seo',
    slug: 'seo',
    name: 'SEO & Growth',
    description: 'Technical SEO, keyword research, schema optimization, and rank strategy.',
    iconName: 'Search',
  },
  {
    id: 'business',
    slug: 'business',
    name: 'Business Growth',
    description: 'SaaS scaling, digital transformation, leadership, and startup playbooks.',
    iconName: 'Briefcase',
  },
  {
    id: 'tutorials',
    slug: 'tutorials',
    name: 'Tutorials & Guides',
    description: 'Step-by-step developer tutorials and technical implementation guides.',
    iconName: 'BookOpen',
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'AWS, Docker, CI/CD pipelines, Kubernetes, and scalable infrastructure.',
    iconName: 'Cloud',
  },
  {
    id: 'cyber-security',
    slug: 'cyber-security',
    name: 'Cyber Security',
    description: 'Enterprise security, web protection, auth patterns, and threat prevention.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'case-studies',
    slug: 'case-studies',
    name: 'Case Studies',
    description: 'Real-world client success stories, benchmark metrics, and technical teardowns.',
    iconName: 'FileText',
  },
  {
    id: 'tech-news',
    slug: 'tech-news',
    name: 'Tech News',
    description: 'The latest industry updates, framework releases, and tech breakdowns.',
    iconName: 'Zap',
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}
