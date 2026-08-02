'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, TrendingUp, Flame, Folder, Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { getPopularPosts, getTrendingPosts } from '@/lib/posts';
import { AdSlot } from '../ads/AdSlot';

export function RightSidebar() {
  const popularPosts = getPopularPosts().slice(0, 4);
  const trendingPosts = getTrendingPosts().slice(0, 3);

  return (
    <aside className="space-y-8">
      {/* 1. About NexGenTeck Card */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff7a00] to-[#ff9e00] flex items-center justify-center font-extrabold text-black text-xl shadow-md">
            N
          </div>
          <div>
            <h3 className="text-base font-bold text-white">NexGenTeck Blog</h3>
            <p className="text-[11px] text-zinc-400">Your Digital Growth Partner</p>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          Welcome to the official blog subdomain of NexGenTeck. We publish high-impact tutorials, AI automation blueprints, web engineering benchmarks, and growth playbooks.
        </p>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          <a
            href="https://www.nexgenteck.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff7a00] font-semibold hover:underline flex items-center"
          >
            Visit main site ↗
          </a>
          <span className="text-zinc-500">blog.nexgenteck.com</span>
        </div>
      </div>

      {/* 2. Google AdSense Sidebar Placement */}
      <AdSlot type="sidebar" />

      {/* 3. Popular Posts */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
            <Flame className="w-4 h-4 mr-2 text-[#ff7a00]" /> Popular Articles
          </h3>
        </div>

        <div className="space-y-4">
          {popularPosts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start space-x-3 transition-all"
            >
              <span className="text-xl font-extrabold text-zinc-600 group-hover:text-[#ff7a00] transition-colors w-5">
                0{idx + 1}
              </span>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#ff7a00]">
                  {post.category}
                </span>
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-[10px] text-zinc-500">{post.readingTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Categories Counter List */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
            <Folder className="w-4 h-4 mr-2 text-[#ff7a00]" /> Categories
          </h3>
          <Link href="/categories" className="text-xs text-[#ff7a00] hover:underline font-medium">
            View All
          </Link>
        </div>

        <div className="space-y-2">
          {CATEGORIES.slice(0, 7).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white border border-transparent hover:border-white/5 transition-all"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Trending Topics Widget */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-[#ff7a00]" /> Trending Articles
          </h3>
        </div>

        <div className="space-y-4">
          {trendingPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-3 rounded-xl bg-white/5 hover:bg-[#ff7a00]/10 border border-white/5 hover:border-[#ff7a00]/30 transition-all"
            >
              <h4 className="text-xs font-bold text-white group-hover:text-[#ff7a00] line-clamp-2">
                {post.title}
              </h4>
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
                <span>By {post.author.name}</span>
                <span>{post.publishedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
