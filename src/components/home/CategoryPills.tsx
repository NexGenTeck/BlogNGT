'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { Sparkles } from 'lucide-react';

export function CategoryPills() {
  return (
    <div className="w-full py-4 border-y border-white/5 bg-[#0f0f12]/60 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center flex-shrink-0 mr-2">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" /> Topics:
        </span>

        <Link
          href="/categories"
          className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#ff7a00] text-black hover:bg-[#e06b00] transition-colors flex-shrink-0"
        >
          All Topics
        </Link>

        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 hover:border-[#ff7a00]/30 transition-all flex-shrink-0"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
