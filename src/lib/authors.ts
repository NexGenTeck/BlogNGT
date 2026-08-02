import { Author } from './types';

export const AUTHORS: Author[] = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Principal AI Architect & CTO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Alex leads the AI Automation team at NexGenTeck, specializing in LLM agents, cloud architecture, and enterprise digital transformations.',
    socials: {
      twitter: 'https://twitter.com/alexmorgan_dev',
      linkedin: 'https://linkedin.com/in/alexmorgan',
      github: 'https://github.com/alexmorgan',
    },
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Head of Growth & Digital Strategy',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Sarah oversees growth campaigns and technical SEO strategies for Fortune 500 brands and high-growth SaaS startups.',
    socials: {
      twitter: 'https://twitter.com/sarahj_growth',
      linkedin: 'https://linkedin.com/in/sarahjenkins',
    },
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Senior Full Stack Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialist in Next.js App Router, React Server Components, TypeScript, and high-performance Web App architectures.',
    socials: {
      twitter: 'https://twitter.com/dchen_dev',
      github: 'https://github.com/davidchen',
    },
  },
];

export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id || a.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
}
