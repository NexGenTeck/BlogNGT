import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { Tag as TagIcon } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'All Article Tags | NexGenTeck Blog',
  description: 'Explore all technical topics, tags, and keywords covered across NexGenTeck articles.',
};

export default function TagsPage() {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00]">
            <TagIcon className="w-3.5 h-3.5" />
            <span>Topic Tag Cloud</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Explore by <span className="orange-gradient-text">Topic Tags</span>
          </h1>
          <p className="text-base text-zinc-300">
            Filter our entire database of engineering benchmarks and strategy posts by specific technologies and frameworks.
          </p>
        </div>

        <AdSlot type="leaderboard" />

        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card">
          <div className="flex flex-wrap gap-3">
            {tags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#ff7a00]/20 text-zinc-200 hover:text-white border border-white/5 hover:border-[#ff7a00]/40 transition-all text-sm font-semibold"
              >
                <span>#{tag}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-black/40 text-[#ff7a00] font-bold">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
