import { Post } from './types';
import { AUTHORS } from './authors';

export const POSTS: Post[] = [
  {
    slug: 'building-enterprise-ai-agents-nextjs-15-claude-openai',
    title: 'Building Enterprise AI Agents with Next.js 15, Claude 3.5 & OpenAI API',
    excerpt: 'Discover how to engineer resilient, stateful AI workflows using Next.js 15 App Router, React 19 Server Actions, and autonomous subagent architectures for real-world enterprise applications.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'ai-automation',
    tags: ['AI Automation', 'Next.js', 'Claude', 'OpenAI', 'TypeScript', 'React'],
    author: AUTHORS[0], // Alex Morgan
    publishedAt: '2026-07-28',
    readingTime: '8 min read',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    views: 14250,
    metaTitle: 'Building Enterprise AI Agents with Next.js 15 & Claude 3.5 | NexGenTeck',
    metaDescription: 'Step-by-step guide to building scalable, production-grade AI agents using Next.js 15, React 19, and Claude 3.5 API.',
    tableOfContents: [
      { id: 'introduction', title: '1. Introduction to Enterprise AI Agents', level: 2 },
      { id: 'architecture-overview', title: '2. System Architecture & Tech Stack', level: 2 },
      { id: 'setting-up-nextjs15', title: '3. Setting Up Next.js 15 & Server Actions', level: 2 },
      { id: 'building-the-agent-loop', title: '4. Engineering the Autonomous Agent Loop', level: 2 },
      { id: 'error-handling-and-retries', title: '5. Error Handling & Tool Calling Safety', level: 2 },
      { id: 'conclusion', title: '6. Final Recommendations & Deployment', level: 2 },
    ],
    faqs: [
      {
        question: 'Why use Next.js 15 for AI Agent platforms?',
        answer: 'Next.js 15 App Router provides seamless streaming responses (RSC), server-side environment security for API keys, and edge runtime scalability perfect for real-time agent responses.',
      },
      {
        question: 'How do you prevent AI model hallucination in enterprise workflows?',
        answer: 'We implement structured JSON outputs using Zod schemas, strict system prompt constraints, and verification steps in the agent execution pipeline.',
      },
    ],
    content: `
## Introduction to Enterprise AI Agents

Artificial Intelligence has shifted rapidly from simple chat prompt interfaces to **autonomous, multi-step AI agents** capable of planning, inspecting databases, making API calls, and executing tasks end-to-end. 

For modern enterprises, embedding AI automation into internal operations and customer-facing software is no longer a luxury—it is the single largest lever for operational efficiency and revenue growth.

In this guide, we will walk step-by-step through creating a robust enterprise-ready AI Agent platform built on **Next.js 15**, **Claude 3.5 Sonnet**, and **OpenAI GPT-4o**.

\`\`\`typescript
// Example Zod Schema for Structured Agent Outputs
import { z } from 'zod';

export const AgentStepSchema = z.object({
  thought: z.string().describe('Reasoning step before tool execution'),
  toolName: z.string().optional().describe('Name of the tool to invoke'),
  toolArgs: z.record(z.any()).optional().describe('Arguments passed to the tool'),
  isFinal: z.boolean().describe('Whether the task has reached completion'),
  finalAnswer: z.string().optional().describe('Result message for the user'),
});
\`\`\`

---

## System Architecture & Tech Stack

A high-performance AI agent system consists of four primary layers:

1. **Client / Orchestration Layer**: Next.js 15 App Router with React Server Components (RSC) and dynamic UI updates.
2. **LLM Engine**: Anthropic Claude 3.5 Sonnet for complex reasoning & OpenAI for rapid utility tasks.
3. **Tool Execution Registry**: Typed tools for database queries, web searching, email dispatch, and CRM sync.
4. **State Persistence**: PostgreSQL + Redis cache for conversation state management and tool execution history.

> [!IMPORTANT]
> Always enforce strict authorization checks on every tool function. Never allow an LLM tool call to execute database writes or administrative actions without dynamic role validation.

---

## Setting Up Next.js 15 & Server Actions

With Next.js 15, we leverage Server Actions for secure execution of agent tools directly from server environments:

\`\`\`typescript
'use server';

import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function runAgentWorkflow(userPrompt: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    tools: [
      {
        name: 'queryCustomerDatabase',
        description: 'Fetch customer details by email or account ID',
        input_schema: {
          type: 'object',
          properties: {
            customerEmail: { type: 'string' }
          },
          required: ['customerEmail']
        }
      }
    ]
  });

  return response;
}
\`\`\`

---

## Engineering the Autonomous Agent Loop

The core engine of an AI Agent is its **reasoning loop**. Rather than completing work in a single turn, the agent evaluates task completion after every tool execution:

1. Receive prompt from user.
2. Formulate execution plan.
3. Call appropriate tool (e.g. web search, database fetch).
4. Inspect tool output and update internal memory context.
5. Repeat until final answer condition is satisfied.

\`\`\`javascript
async function executeAgentLoop(initialPrompt) {
  let steps = 0;
  let maxSteps = 10;
  let isComplete = false;
  
  while (!isComplete && steps < maxSteps) {
    steps++;
    const stepResult = await runNextAgentStep();
    if (stepResult.isFinal) {
      isComplete = true;
      return stepResult.finalAnswer;
    }
  }
}
\`\`\`

---

## Error Handling & Tool Calling Safety

Production AI agents must gracefully handle rate limits, tool execution timeouts, and ambiguous model responses. 

Key safety practices include:
- **Exponential Backoff**: Automatically retry LLM API calls on HTTP 429 or 503 errors.
- **Tool Timeouts**: Wrap all external HTTP fetch calls with 10-second AbortController timeouts.
- **Human-in-the-loop (HITL)**: Require human approval before committing destructive actions like deleting user records or sending external emails.

---

## Final Recommendations & Deployment

When deploying your Next.js 15 AI agent solution to production:
- Deploy to Vercel or AWS ECS with Node.js runtime for long-running streaming response support.
- Monitor execution costs and latency using OpenTelemetry tracing and LangSmith / Helicone.
- Implement streaming responses using ReadableStream for an interactive UI experience.

By implementing this architecture, NexGenTeck has empowered enterprise clients to automate up to 75% of routine customer support and internal data synthesis workflows while maintaining 99.9% accuracy.
    `,
  },
  {
    slug: 'mastering-technical-seo-2026-schema-core-web-vitals-nextjs',
    title: 'Mastering Technical SEO in 2026: Schema.org, Core Web Vitals & Next.js App Router',
    excerpt: 'A comprehensive technical SEO guide to achieving 100/100 Lighthouse scores, structured data indexing, instant indexing on Google, and rank dominance.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'seo',
    tags: ['SEO', 'Next.js', 'Schema.org', 'Core Web Vitals', 'Digital Marketing', 'Web Development'],
    author: AUTHORS[1], // Sarah Jenkins
    publishedAt: '2026-07-25',
    readingTime: '10 min read',
    isFeatured: true,
    isPopular: true,
    isTrending: false,
    views: 11890,
    metaTitle: 'Mastering Technical SEO in 2026: Schema.org & Next.js | NexGenTeck',
    metaDescription: 'Learn how to optimize Next.js App Router applications for 100/100 Lighthouse performance, Schema.org rich snippets, and Google ranking.',
    tableOfContents: [
      { id: 'why-technical-seo-matters', title: '1. Why Technical SEO Matters in 2026', level: 2 },
      { id: 'nextjs-metadata-api', title: '2. Leveraging the Next.js Metadata API', level: 2 },
      { id: 'schema-org-structured-data', title: '3. Implementing Schema.org JSON-LD', level: 2 },
      { id: 'core-web-vitals-optimization', title: '4. Core Web Vitals & Image Optimization', level: 2 },
      { id: 'xml-sitemap-rss', title: '5. XML Sitemaps, RSS Feeds & Indexing', level: 2 },
    ],
    faqs: [
      {
        question: 'What is the most critical Core Web Vital metric in 2026?',
        answer: 'INP (Interaction to Next Paint) along with LCP (Largest Contentful Paint) are the primary UX signals evaluated by Google search crawlers.',
      },
      {
        question: 'Does Next.js App Router automatically generate JSON-LD schema?',
        answer: 'No, while Next.js handles meta tags via generateMetadata(), JSON-LD schemas should be rendered via structured script tags in head or layout.',
      },
    ],
    content: `
## Why Technical SEO Matters in 2026

Search Engine Optimization has evolved beyond keyword stuffing and backlink counting. Modern search engines like Google utilize AI-driven semantic search algorithms (GEMINI & SGE) that prioritize **page speed, semantic HTML structure, entity relationships, and JSON-LD structured data**.

A technical website that loads in under **1.2 seconds**, zero Cumulative Layout Shift (CLS), and explicit Schema markup will consistently outrank higher-authority domain competitors.

---

## Leveraging the Next.js Metadata API

Next.js 15 provides a built-in \`generateMetadata\` function that delivers dynamic openGraph tags and canonical URLs per route:

\`\`\`typescript
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: \`https://blog.nexgenteck.com/blog/\${post.slug}\`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: \`https://blog.nexgenteck.com/blog/\${post.slug}\`,
      siteName: 'NexGenTeck Blog',
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
\`\`\`

---

## Implementing Schema.org JSON-LD

Structured data allows search crawlers to display rich snippets, author panels, and instant answer cards directly in search results.

Below is an example of an **Article Schema** component:

\`\`\`typescript
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
      url: 'https://blog.nexgenteck.com/author/' + post.author.id,
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
      '@id': 'https://blog.nexgenteck.com/blog/' + post.slug,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
\`\`\`

---

## Core Web Vitals & Image Optimization

To achieve a 95+ PageSpeed score:
1. **Next Image Component**: Always use \`<Image />\` with \`sizes\` and priority tags for Above-The-Fold hero images.
2. **Font Subsetting**: Utilize \`next/font/google\` to inline CSS font declarations zero render-blocking requests.
3. **CSS Minification**: Purge unused CSS rules using Tailwind CSS content scanning.
4. **Layout Instability Elimination**: Set explicit height/width ratios or container aspect ratios for image wrappers and AdSense placeholders.

---

## XML Sitemaps, RSS Feeds & Indexing

Ensure your blog automatically generates an up-to-date XML Sitemap at \`/sitemap.xml\` and RSS feed at \`/rss.xml\` to notify search engine crawlers immediately whenever new content is published.
    `,
  },
  {
    slug: 'b2b-growth-blueprint-scaling-tech-startups',
    title: 'The Ultimate Digital Growth Blueprint for Scaling B2B Tech Startups',
    excerpt: 'Unpack the exact lead generation, SEO funnel, performance marketing, and conversion rate optimization strategies used by top-tier tech companies.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'business',
    tags: ['Business Growth', 'Digital Marketing', 'SaaS', 'SEO', 'Lead Generation'],
    author: AUTHORS[1], // Sarah Jenkins
    publishedAt: '2026-07-20',
    readingTime: '7 min read',
    isFeatured: false,
    isPopular: true,
    isTrending: true,
    views: 9420,
    metaTitle: 'The Ultimate B2B Growth Blueprint for Tech Startups | NexGenTeck',
    metaDescription: 'Discover high-converting B2B growth strategies, content funnels, and performance marketing playbooks.',
    content: `
## Scaling B2B Technology Growth

In the competitive landscape of modern software and IT services, achieving predictable revenue growth requires a multi-touch digital growth strategy.

### 1. High-Intent Content Marketing
Rather than publishing generic top-of-funnel posts, focus on **solution-seeking commercial intent content**:
- "Best Enterprise AI Tools for Financial Modeling"
- "Next.js vs Remix for Enterprise Platforms"
- "How to Reduce Cloud Computing Costs by 40%"

### 2. Retargeting & Omnichannel Presence
Drive prospective clients down the funnel through segmented LinkedIn retargeting, custom newsletters, and whitepapers.

> [!TIP]
> Offer immediate value upfront: interactive calculators, diagnostic audit checklists, or open-source boilerplates drive 5x higher conversion rates than static pitch decks.
    `,
  },
  {
    slug: 'deploying-zero-trust-cyber-security-aws-docker',
    title: 'Deploying Zero-Trust Cyber Security Pipelines in AWS with DevOps & Docker',
    excerpt: 'Protect cloud infrastructures from vulnerabilities by implementing Zero-Trust network policies, automated vulnerability scanning, IAM role isolation, and Docker container hardening.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    category: 'cyber-security',
    tags: ['Cyber Security', 'Cloud & DevOps', 'AWS', 'Docker', 'DevOps'],
    author: AUTHORS[2], // David Chen
    publishedAt: '2026-07-15',
    readingTime: '9 min read',
    isFeatured: false,
    isPopular: false,
    isTrending: true,
    views: 6810,
    metaTitle: 'Deploying Zero-Trust Security Pipelines in AWS | NexGenTeck',
    metaDescription: 'Step-by-step devops guide to Zero-Trust architecture in AWS using Docker container security and automated vulnerability scanners.',
    content: `
## Zero-Trust Cloud Architecture

In a modern Zero-Trust environment, **never trust, always verify**. Every request originating inside or outside your perimeter must be authenticated, authorized, and encrypted.

### Container Security Best Practices
1. **Non-Root Docker Containers**: Always configure your \`Dockerfile\` to run applications under unprivileged system user IDs.
2. **Minimal Base Images**: Use Distroless or Alpine Linux base images to eliminate unnecessary shell utilities and binaries.
3. **Secrets Management**: Inject API keys dynamic at runtime using AWS Secrets Manager or HashiCorp Vault.

\`\`\`dockerfile
# Multi-stage Dockerfile hardening example
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`
    `,
  },
  {
    slug: 'typescript-5-5-in-depth-generics-pattern-matching',
    title: 'TypeScript 5.5 In-Depth: Advanced Generics, Pattern Matching, and Performance',
    excerpt: 'Master the latest features in TypeScript 5.5 including inferred type predicates, control flow analysis improvements, and speed optimizations for enterprise codebases.',
    coverImage: 'https://images.unsplash.com/photo-1516116211223-4c71414a381c?auto=format&fit=crop&w=1200&q=80',
    category: 'web-development',
    tags: ['TypeScript', 'Web Development', 'JavaScript', 'Tutorials'],
    author: AUTHORS[2], // David Chen
    publishedAt: '2026-07-10',
    readingTime: '6 min read',
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    views: 8190,
    metaTitle: 'TypeScript 5.5 In-Depth Guide & Performance Tips | NexGenTeck',
    metaDescription: 'In-depth breakdown of TypeScript 5.5 features, type safety best practices, and generic optimization patterns.',
    content: `
## TypeScript 5.5 Feature Breakdown

TypeScript 5.5 brings major type inference capabilities that clean up complex codebase checks and improve compiler speed by up to 25%.

### 1. Inferred Type Predicates
Functions returning boolean checks on array filters now automatically narrow types without explicit \`x is Type\` annotations!

\`\`\`typescript
const numbersAndStrings = [1, 'two', 3, 'four', 5];

// Previously required: (x): x is string => typeof x === 'string'
// In TypeScript 5.5+, automatically inferred as string[]!
const stringsOnly = numbersAndStrings.filter(x => typeof x === 'string');
\`\`\`

### 2. Regular Expression Syntax Validation
The compiler now parses regular expression literals to verify valid syntax and flag invalid backreferences before compilation!
    `,
  },
  {
    slug: 'case-study-nexgenteck-accelerated-client-organic-traffic-340-percent',
    title: 'Case Study: How NexGenTeck Accelerated Client Organic Traffic by 340% in 90 Days',
    excerpt: 'See how our growth and engineering teams transformed an enterprise SaaS client web platform into a high-speed SEO growth engine.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    category: 'case-studies',
    tags: ['Case Studies', 'SEO', 'Business Growth', 'Next.js', 'Digital Marketing'],
    author: AUTHORS[0], // Alex Morgan
    publishedAt: '2026-07-02',
    readingTime: '5 min read',
    isFeatured: false,
    isPopular: false,
    isTrending: true,
    views: 5430,
    metaTitle: 'Case Study: 340% Organic Traffic Acceleration | NexGenTeck',
    metaDescription: 'Read how NexGenTeck optimized web performance, structured data, and content distribution to drive 340% organic traffic growth.',
    content: `
## Executive Summary

When CloudScale Solutions approached NexGenTeck, their legacy web application was suffering from slow loading speeds (PageSpeed 42/100), poor search indexing, and high bounce rates.

### The Challenge
- High TTFB (Time to First Byte) across global regions.
- Missing JSON-LD schemas preventing rich search snippet displays.
- Unoptimized image assets causing massive cumulative layout shifts.

### The NexGenTeck Solution
1. Re-architected site architecture on **Next.js 15 App Router** on Edge Infrastructure.
2. Implemented automated **Schema.org entity markup** across all product and blog pages.
3. Designed an automated **AI-assisted content workflow** targeting long-tail commercial intent keywords.

### Results Achieved
- **+340% increase in organic search traffic** in 90 days.
- **100/100 Desktop PageSpeed** score & **98/100 Mobile PageSpeed**.
- **+180% boost in organic inbound lead inquiries**.
    `,
  },
  {
    slug: 'prompt-engineering-masterclass-crafting-deterministic-ai-workflows',
    title: 'Prompt Engineering Masterclass: Crafting Deterministic AI Workflows for Business',
    excerpt: 'Learn systematically how to write robust system prompts, few-shot examples, and guardrail constraints to build reliable AI features.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    category: 'tutorials',
    tags: ['Prompt Engineering', 'AI Automation', 'ChatGPT', 'Claude', 'Tutorials'],
    author: AUTHORS[0], // Alex Morgan
    publishedAt: '2026-06-25',
    readingTime: '8 min read',
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    views: 12900,
    metaTitle: 'Prompt Engineering Masterclass for Developers | NexGenTeck',
    metaDescription: 'Learn advanced prompt engineering techniques, few-shot prompting, and output parsing for production AI systems.',
    content: `
## Mastering Prompt Engineering

Building production software with LLMs requires shifting from conversational prompting to **systematic, deterministic prompt engineering**.

### Core Principles for Production Prompts

1. **Role & Intent Priming**: Define exact domain persona, expertise constraints, and output boundaries.
2. **Explicit XML / JSON Formatting**: Structure inputs and outputs using clear tags like \`<input>\`, \`<rules>\`, and \`<output_format>\`.
3. **Negative Constraints**: Explicitly state what the model MUST NOT do.

\`\`\`markdown
<system_prompt>
You are an expert financial analyst assistant.
Follow these strict rules:
1. Output ONLY valid JSON matching the schema provided.
2. Do not include markdown code block formatting if JSON raw output is requested.
3. If data is missing from the input context, output null rather than guessing values.
</system_prompt>
\`\`\`
    `,
  },
  {
    slug: 'wordpress-to-nextjs-migration-guide-10x-speed-security',
    title: 'WordPress to Next.js Migration Guide: 10x Speed & Superior Security',
    excerpt: 'A complete step-by-step roadmap for migrating legacy WordPress blogs and marketing websites to Next.js without losing SEO rankings or backlinks.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'tech-news',
    tags: ['WordPress', 'Next.js', 'Web Development', 'SEO', 'Tech News'],
    author: AUTHORS[2], // David Chen
    publishedAt: '2026-06-18',
    readingTime: '7 min read',
    isFeatured: false,
    isPopular: false,
    isTrending: false,
    views: 4890,
    metaTitle: 'WordPress to Next.js Migration Guide | NexGenTeck',
    metaDescription: 'Learn how to safely migrate your WordPress site to Next.js while preserving 100% of your SEO rankings and improving site speed by 10x.',
    content: `
## Why Migrate from WordPress to Next.js?

While WordPress served the internet well for decades, modern web applications demand **uncompromising performance, tight security, and zero plugin vulnerability risks**.

### Key Benefits of Decoupling:
- **10x Page Load Speeds**: Static pre-rendering and edge CDN distribution.
- **Zero SQL Injection / Plugin Exploits**: No exposed WordPress admin panel or PHP database connection.
- **100/100 Core Web Vitals**: Modern React hydration and dynamic image optimization.
    `,
  }
];

// Helper Functions
export function getAllPosts(): Post[] {
  return POSTS.filter((post) => !post.isDraft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return POSTS.filter((p) => p.isFeatured && !p.isDraft);
}

export function getPopularPosts(): Post[] {
  return POSTS.filter((p) => p.isPopular && !p.isDraft);
}

export function getTrendingPosts(): Post[] {
  return POSTS.filter((p) => p.isTrending && !p.isDraft);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return POSTS.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase() && !p.isDraft
  );
}

export function getPostsByTag(tagSlug: string): Post[] {
  return POSTS.filter(
    (p) =>
      p.tags.some(
        (t) =>
          t.toLowerCase().replace(/\s+/g, '-') === tagSlug.toLowerCase() ||
          t.toLowerCase() === tagSlug.toLowerCase()
      ) && !p.isDraft
  );
}

export function getPostsByAuthor(authorId: string): Post[] {
  return POSTS.filter((p) => p.author.id === authorId && !p.isDraft);
}

export function searchPosts(query: string, category?: string, tag?: string): Post[] {
  let filtered = getAllPosts();

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    filtered = filtered.filter((p) =>
      p.tags.some((t) => t.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase())
    );
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}
