'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Post } from '@/lib/types';
import { AdSlot } from '../ads/AdSlot';

interface LatestArticlesProps {
  posts: Post[];
}

export function LatestArticles({ posts }: LatestArticlesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section id="latest-articles" className="py-12">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#ff7a00]/10 text-[#ff7a00] border border-[#ff7a00]/20">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Latest Articles
              </h2>
              <p className="text-xs text-zinc-400">
                Fresh technical posts, tutorials, and strategy guides.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Magazine Grid Articles */}
        <div className="space-y-8">
          {currentPosts.map((post, index) => (
            <React.Fragment key={post.slug}>
              
              {/* Insert AdSense Slot Between Articles at position 3 */}
              {index === 3 && <AdSlot type="between-posts" />}

              <article className="group rounded-2xl overflow-hidden bg-[#141417] border border-white/10 glass-card p-5 sm:p-6 transition-all duration-300 hover:border-[#ff7a00]/40 hover:shadow-xl flex flex-col md:flex-row gap-6 items-stretch">
                
                {/* Large Thumbnail */}
                <div className="relative aspect-[16/10] w-full md:w-72 lg:w-80 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#ff7a00] text-black shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-xs text-zinc-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" />
                        {post.readingTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff7a00] transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags & Footer Read More */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold text-[#ff7a00] group-hover:text-white transition-colors"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </article>
            </React.Fragment>
          ))}
        </div>

        {/* Custom Pagination Component */}
        {totalPages > 1 && (
          <div className="pt-6 flex items-center justify-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#ff7a00] text-black shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
