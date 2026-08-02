'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
  posts: Post[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="space-y-6 pt-12 border-t border-white/10">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-[#ff7a00]" />
        <h3 className="text-xl font-extrabold text-white">
          Related Articles
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl overflow-hidden bg-[#141417] border border-white/10 glass-card p-4 transition-all duration-300 hover:border-[#ff7a00]/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40">
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

              <Link href={`/blog/${post.slug}`}>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ff7a00] transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </Link>

              <p className="text-xs text-zinc-400 line-clamp-2">{post.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 mt-4">
              <span>{post.readingTime}</span>
              <Link href={`/blog/${post.slug}`} className="text-[#ff7a00] font-semibold hover:underline flex items-center">
                Read <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
