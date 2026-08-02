import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Calendar, Clock, ChevronRight, Home, HelpCircle, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { CommentSection } from '@/components/blog/CommentSection';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLdSchema';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | NexGenTeck Blog',
    };
  }

  return {
    title: `${post.title} | NexGenTeck Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://blog.nexgenteck.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://blog.nexgenteck.com/blog/${post.slug}`,
      siteName: 'NexGenTeck Blog',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const relatedPosts = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const postUrl = `https://blog.nexgenteck.com/blog/${post.slug}`;

  const breadcrumbItems = [
    { name: 'Home', url: 'https://blog.nexgenteck.com' },
    { name: post.category, url: `https://blog.nexgenteck.com/category/${post.category}` },
    { name: post.title, url: postUrl },
  ];

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ReadingProgressBar />

      <article className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-[#ff7a00] flex items-center">
              <Home className="w-3.5 h-3.5 mr-1" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <Link href={`/category/${post.category}`} className="hover:text-[#ff7a00] font-medium uppercase text-[#ff7a00]">
              {post.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-600 hidden sm:inline" />
            <span className="text-zinc-500 line-clamp-1 hidden sm:inline">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-6 max-w-4xl">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff7a00] text-black shadow-md inline-block">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author Meta Row */}
            <div className="pt-4 border-y border-white/10 flex flex-wrap items-center justify-between gap-4">
              <Link href={`/author/${post.author.id}`} className="flex items-center space-x-3 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#ff7a00]/40">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#ff7a00] transition-colors">
                    {post.author.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{post.author.role}</p>
                </div>
              </Link>

              <div className="flex items-center space-x-6 text-xs text-zinc-400">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5 text-[#ff7a00]" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-[#ff7a00]" />
                  {post.readingTime}
                </span>
              </div>

              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </header>

          {/* Large Hero Image */}
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl glass-card bg-black/40">
            <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Layout with Sticky TOC Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
            
            {/* Table of Contents Column (Desktop) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
              {post.tableOfContents && <TableOfContents items={post.tableOfContents} />}
              <AdSlot type="sidebar" />
            </div>

            {/* Main Article Content Body Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* In-Article Top Ad Placement */}
              <AdSlot type="in-article" />

              {/* Formatted Markdown/Rich Text Article Body */}
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-[#ff7a00] text-zinc-200 text-sm sm:text-base leading-relaxed space-y-6">
                
                {/* Dynamically Rendered Content Snippets */}
                <div className="space-y-6">
                  {post.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      const headingText = paragraph.replace('## ', '');
                      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return (
                        <h2 key={i} id={id} className="text-2xl font-bold text-white pt-6 border-t border-white/10 flex items-center">
                          <span className="w-2 h-6 bg-[#ff7a00] rounded-full mr-3 inline-block" />
                          {headingText}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      const headingText = paragraph.replace('### ', '');
                      return (
                        <h3 key={i} className="text-xl font-semibold text-white pt-4">
                          {headingText}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={i} className="p-4 rounded-xl bg-[#ff7a00]/10 border-l-4 border-[#ff7a00] text-white italic my-4">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    if (paragraph.startsWith('```')) {
                      const lines = paragraph.split('\n');
                      const lang = lines[0].replace('```', '') || 'typescript';
                      const codeContent = lines.slice(1, -1).join('\n');
                      return <CodeBlock key={i} code={codeContent} language={lang} />;
                    }
                    return (
                      <p key={i} className="text-zinc-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

              </div>

              {/* In-Article Bottom Ad Placement */}
              <AdSlot type="in-article" />

              {/* Tags Cloud */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 flex items-center mr-2">
                  <Tag className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" /> Article Tags:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] text-zinc-300 border border-white/5 transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Frequently Asked Questions (FAQ) Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 my-8">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                    <HelpCircle className="w-5 h-5 text-[#ff7a00]" />
                    <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
                  </div>

                  <div className="space-y-4">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center">
                          <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] text-[10px] font-bold flex items-center justify-center mr-2 flex-shrink-0">
                            Q
                          </span>
                          {faq.question}
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed pl-7">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <AuthorCard author={post.author} />

              {/* Previous / Next Article Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group p-4 rounded-xl bg-[#141417] border border-white/10 hover:border-[#ff7a00]/40 transition-all space-y-1"
                  >
                    <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center">
                      <ArrowLeft className="w-3 h-3 mr-1" /> Previous Article
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#ff7a00] line-clamp-1">
                      {prevPost.title}
                    </h4>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group p-4 rounded-xl bg-[#141417] border border-white/10 hover:border-[#ff7a00]/40 transition-all space-y-1 text-right ml-auto w-full"
                  >
                    <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center justify-end">
                      Next Article <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#ff7a00] line-clamp-1">
                      {nextPost.title}
                    </h4>
                  </Link>
                ) : <div />}
              </div>

              {/* Reader Comments Section */}
              <CommentSection />

              {/* Related Articles */}
              <RelatedArticles posts={relatedPosts} />

            </div>

          </div>

        </div>
      </article>
    </>
  );
}
