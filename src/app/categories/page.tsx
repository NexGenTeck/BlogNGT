import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

        {/* Categories Grid with Rich Topic Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative p-5 rounded-2xl bg-[#141417] border border-white/10 glass-card transition-all duration-300 hover:border-[#ff7a00]/50 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Category Image Header */}
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 border border-white/10 bg-zinc-900">
                    <Image
                      src={cat.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15">
                      {count} {count === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ff7a00] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#ff7a00] mt-6">
                  <span>Explore Topic Articles</span>
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
