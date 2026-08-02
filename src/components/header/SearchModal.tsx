'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Tag, Folder, ArrowRight } from 'lucide-react';
import { POSTS } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#141417] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-[#ff7a00] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, AI, Next.js, SEO, tutorials..."
            className="w-full bg-transparent text-white placeholder-zinc-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs text-zinc-400 bg-white/5 border border-white/10 rounded hover:text-white"
          >
            ESC
          </button>
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2 flex items-center">
                  <Folder className="w-3.5 h-3.5 mr-1.5 text-[#ff7a00]" /> Popular Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] text-zinc-300 border border-white/5 transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2 flex items-center">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-[#ff7a00]" /> Trending Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['AI Automation', 'Next.js 15', 'Claude 3.5', 'Technical SEO', 'TypeScript', 'Docker'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={onClose}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-medium text-zinc-400">
                Found <span className="text-[#ff7a00] font-bold">{results.length}</span> matching articles:
              </p>
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-[#ff7a00]/10 border border-white/5 hover:border-[#ff7a00]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase text-[#ff7a00]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-zinc-500">{post.readingTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#ff7a00] transition-colors mt-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-1">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">No articles found matching &quot;{query}&quot;.</p>
              <p className="text-xs text-zinc-500 mt-1">Try searching for alternative topics like AI, SEO, or Web Development.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
          <span>Search NexGenTeck Knowledge Base</span>
          {query.trim() && (
            <button
              onClick={handleSearchSubmit}
              className="flex items-center text-[#ff7a00] hover:underline font-medium"
            >
              View all results <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
