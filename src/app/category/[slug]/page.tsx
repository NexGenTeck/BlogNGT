import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/posts';
import { LatestArticles } from '@/components/home/LatestArticles';
import { RightSidebar } from '@/components/sidebar/RightSidebar';
import { AdSlot } from '@/components/ads/AdSlot';
import { Folder, Home, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: 'Category Not Found | NexGenTeck Blog' };

  return {
    title: `${category.name} Articles & Guides | NexGenTeck Blog`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#ff7a00] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <Link href="/categories" className="hover:text-[#ff7a00]">Categories</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-[#ff7a00] font-bold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff7a00]/10 blur-[90px] pointer-events-none rounded-full" />
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-bold text-[#ff7a00]">
            <Folder className="w-3.5 h-3.5" />
            <span>Category Archives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {category.name}
          </h1>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <AdSlot type="leaderboard" />

        {/* Posts Stream + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <LatestArticles posts={posts} />
            ) : (
              <div className="p-12 rounded-2xl bg-[#141417] border border-white/10 text-center space-y-3">
                <p className="text-zinc-400 text-sm">No articles published in this category yet.</p>
                <Link href="/categories" className="text-xs font-bold text-[#ff7a00] hover:underline inline-block">
                  Browse other categories →
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <RightSidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
