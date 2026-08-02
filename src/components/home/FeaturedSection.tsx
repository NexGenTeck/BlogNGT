'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowUpRight, Share2, Sparkles } from 'lucide-react';
import { Post } from '@/lib/types';

interface FeaturedSectionProps {
  posts: Post[];
}

export function FeaturedSection({ posts }: FeaturedSectionProps) {
  if (!posts || posts.length === 0) return null;

  const mainFeatured = posts[0];
  const secondaryFeatured = posts.slice(1, 3);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#ff7a00]/10 text-[#ff7a00] border border-[#ff7a00]/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Featured Insights
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Hand-picked technical articles & strategy guides from our lead experts.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Large Featured Article Card */}
          {mainFeatured && (
            <div className="lg:col-span-7">
              <article className="group relative rounded-2xl overflow-hidden bg-[#141417] border border-white/10 glass-card h-full flex flex-col transition-all duration-300 hover:border-[#ff7a00]/50 hover:shadow-2xl">
                
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                  <Image
                    src={mainFeatured.coverImage}
                    alt={mainFeatured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff7a00] text-black shadow-md">
                      {mainFeatured.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 text-xs text-zinc-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" />
                        {mainFeatured.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" />
                        {mainFeatured.readingTime}
                      </span>
                    </div>

                    <Link href={`/blog/${mainFeatured.slug}`} className="block group">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff7a00] transition-colors leading-snug">
                        {mainFeatured.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                      {mainFeatured.excerpt}
                    </p>
                  </div>

                  {/* Author Footer Info */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link href={`/author/${mainFeatured.author.id}`} className="flex items-center space-x-3 group/author">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#ff7a00]/30">
                        <Image
                          src={mainFeatured.author.avatar}
                          alt={mainFeatured.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover/author:text-[#ff7a00]">
                          {mainFeatured.author.name}
                        </h4>
                        <p className="text-[10px] text-zinc-400">{mainFeatured.author.role}</p>
                      </div>
                    </Link>

                    <Link
                      href={`/blog/${mainFeatured.slug}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#ff7a00] text-zinc-300 hover:text-black transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </article>
            </div>
          )}

          {/* Secondary Featured Articles Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {secondaryFeatured.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl overflow-hidden bg-[#141417] border border-white/10 glass-card p-5 transition-all duration-300 hover:border-[#ff7a00]/40 flex flex-col sm:flex-row gap-5 items-center"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full sm:w-40 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#ff7a00] text-black">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-zinc-400">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-[#ff7a00] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-zinc-400 line-clamp-2">{post.excerpt}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-medium text-zinc-300">By {post.author.name}</span>
                    <Link href={`/blog/${post.slug}`} className="text-[#ff7a00] font-semibold hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
