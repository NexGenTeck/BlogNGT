import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/categories';
import { getAllPosts } from '@/lib/posts';
import { Grid, ArrowRight, Folder } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'All Topics & Categories | NexGenTeck Blog',
  description: 'Browse all technology, AI automation, web development, SEO, and business growth categories on the NexGenTeck Blog.',
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00]">
            <Folder className="w-3.5 h-3.5" />
            <span>Explore Knowledge Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Topics & <span className="orange-gradient-text">Categories</span>
          </h1>
          <p className="text-base text-zinc-300">
            Explore hand-crafted blueprints, step-by-step developer guides, and business growth frameworks organized by domain specialization.
          </p>
        </div>

        <AdSlot type="leaderboard" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card transition-all duration-300 hover:border-[#ff7a00]/50 hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ff7a00]/20 to-[#ff9e00]/10 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] font-bold text-xl group-hover:scale-110 transition-transform">
                      {cat.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                      {count} {count === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ff7a00] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#ff7a00] mt-6">
                  <span>Explore Articles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
