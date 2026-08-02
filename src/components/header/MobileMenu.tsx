'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, Home, Grid, Sparkles, Code, TrendingUp, BookOpen, Info, Mail } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col transition-all duration-300 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg relative overflow-hidden shadow-md border border-white/10 shrink-0 bg-black">
            <Image
              src="/logo.png"
              alt="NexGenTeck Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            NexGen<span className="text-[#ff7a00]">Teck</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close Mobile Menu"
          className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 px-3 mb-2">Main Navigation</h4>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-[#ff7a00]"
          >
            <span className="flex items-center"><Home className="w-4 h-4 mr-3 text-[#ff7a00]" /> Home</span>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </Link>
          <Link
            href="/categories"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-[#ff7a00]"
          >
            <span className="flex items-center"><Grid className="w-4 h-4 mr-3 text-[#ff7a00]" /> All Categories</span>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </Link>
        </div>

        {/* Featured Categories */}
        <div className="space-y-1">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 px-3 mb-2">Topics</h4>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white"
            >
              <span>{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </Link>
          ))}
        </div>

        {/* Pages */}
        <div className="space-y-1 border-t border-white/10 pt-4">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 px-3 mb-2">Company</h4>
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white"
          >
            <span className="flex items-center"><Info className="w-4 h-4 mr-3 text-zinc-400" /> About NexGenTeck</span>
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white"
          >
            <span className="flex items-center"><Mail className="w-4 h-4 mr-3 text-zinc-400" /> Contact Us</span>
          </Link>
          <a
            href="https://www.nexgenteck.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-[#ff7a00]"
          >
            <span>Visit Main Website</span>
            <span className="text-xs text-[#ff7a00]">nexgenteck.com ↗</span>
          </a>
        </div>
      </div>

      {/* Footer Subscribe CTA */}
      <div className="p-4 border-t border-white/10 bg-[#141417]">
        <button
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-black font-bold text-center shadow-lg transition-all"
        >
          Search Articles
        </button>
      </div>
    </div>
  );
}
