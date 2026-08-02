'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Folder, Tag, ArrowRight } from 'lucide-react';
import { searchPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { LatestArticles } from '@/components/home/LatestArticles';
import { RightSidebar } from '@/components/sidebar/RightSidebar';
import { AdSlot } from '@/components/ads/AdSlot';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = searchPosts(query, selectedCategory, selectedTag);

  return (
    <div className="py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Header */}
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Search <span className="orange-gradient-text">Articles & Blueprints</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Query our entire database of AI automation, Next.js, SEO, and tech guides.
            </p>
          </div>

          {/* Search Controls Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-[#ff7a00] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords (e.g. Next.js 15, Claude, SEO)..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#ff7a00]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a00]"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a00]"
              >
                <option value="">All Topics / Tags</option>
                {['AI Automation', 'Next.js', 'Claude', 'SEO', 'TypeScript', 'Docker', 'WordPress'].map((tag) => (
                  <option key={tag} value={tag.toLowerCase().replace(/\s+/g, '-')}>
                    #{tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AdSlot type="leaderboard" />

        {/* Results Info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <p className="text-xs font-medium text-zinc-400">
            Found <span className="text-[#ff7a00] font-bold">{results.length}</span> matching articles.
          </p>
          {(query || selectedCategory || selectedTag) && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('');
                setSelectedTag('');
              }}
              className="text-xs text-[#ff7a00] hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Posts Stream + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <div className="lg:col-span-8">
            {results.length > 0 ? (
              <LatestArticles posts={results} />
            ) : (
              <div className="p-12 rounded-2xl bg-[#141417] border border-white/10 text-center space-y-3">
                <p className="text-zinc-300 text-sm font-semibold">No matching articles found.</p>
                <p className="text-xs text-zinc-500">Try broadening your search keywords or clearing filters.</p>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
