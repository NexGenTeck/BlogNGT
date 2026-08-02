import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI Automation',
    description: 'Practical guides, LLM integration, workflow automation, and agentic solutions.',
    iconName: 'Bot',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    description: 'Modern frontend, backend architecture, performance, and responsive web design.',
    iconName: 'Code',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Data-driven growth strategies, PPC, content marketing, and brand building.',
    iconName: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'seo',
    slug: 'seo',
    name: 'SEO & Growth',
    description: 'Technical SEO, keyword research, schema optimization, and rank strategy.',
    iconName: 'Search',
    image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'business',
    slug: 'business',
    name: 'Business Growth',
    description: 'SaaS scaling, digital transformation, leadership, and startup playbooks.',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tutorials',
    slug: 'tutorials',
    name: 'Tutorials & Guides',
    description: 'Step-by-step developer tutorials and technical implementation guides.',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'AWS, Docker, CI/CD pipelines, Kubernetes, and scalable infrastructure.',
    iconName: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cyber-security',
    slug: 'cyber-security',
    name: 'Cyber Security',
    description: 'Enterprise security, web protection, auth patterns, and threat prevention.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'case-studies',
    slug: 'case-studies',
    name: 'Case Studies',
    description: 'Real-world client success stories, benchmark metrics, and technical teardowns.',
    iconName: 'FileText',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tech-news',
    slug: 'tech-news',
    name: 'Tech News',
    description: 'The latest industry updates, framework releases, and tech breakdowns.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}
