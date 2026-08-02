import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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

        {/* Category Header Card with Rich Topic Image Backdrop */}
        <div className="p-8 sm:p-10 rounded-2xl border border-white/10 glass-card space-y-3 relative overflow-hidden bg-black">
          <Image
            src={category.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
            alt={category.name}
            fill
            className="object-cover opacity-25 pointer-events-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-xs font-bold text-[#ff7a00] shadow-md">
              <Folder className="w-3.5 h-3.5" />
              <span>Category Topic Archives</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
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
