import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostsByTag } from '@/lib/posts';
import { LatestArticles } from '@/components/home/LatestArticles';
import { RightSidebar } from '@/components/sidebar/RightSidebar';
import { Tag as TagIcon, Home, ChevronRight } from 'lucide-react';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, ' ').toUpperCase();

  return {
    title: `#${tagName} Articles | NexGenTeck Blog`,
    description: `Browse all technical articles tagged with #${tagName} on the NexGenTeck Blog.`,
  };
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  const tagName = slug.replace(/-/g, ' ');

  return (
    <div className="py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#ff7a00] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <Link href="/tags" className="hover:text-[#ff7a00]">Tags</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-[#ff7a00] font-bold">#{tagName}</span>
        </nav>

        {/* Tag Header */}
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-bold text-[#ff7a00]">
            <TagIcon className="w-3.5 h-3.5" />
            <span>Topic Tag</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white capitalize">
            #{tagName}
          </h1>
          <p className="text-sm text-zinc-300">
            Found <span className="text-[#ff7a00] font-bold">{posts.length}</span> articles tagged with #{tagName}.
          </p>
        </div>

        {/* Posts Stream + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <div className="lg:col-span-8">
            <LatestArticles posts={posts} />
          </div>
          <div className="lg:col-span-4 sticky top-24">
            <RightSidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
