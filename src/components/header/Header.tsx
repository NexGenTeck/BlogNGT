'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, ChevronDown, Lock } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { MobileMenu } from './MobileMenu';
import { CATEGORIES } from '@/lib/categories';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'glass-header py-3 shadow-2xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-xl relative overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-white/10 shrink-0 bg-black">
                  <Image
                    src="/logo.png"
                    alt="NexGenTeck Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xl font-extrabold text-white tracking-tight">
                      NexGen<span className="text-[#ff7a00]">Teck</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#ff7a00]/20 text-[#ff7a00] border border-[#ff7a00]/30">
                      BLOG
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 tracking-wide font-medium hidden sm:block">
                    Your Digital Backbone
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Main Navigation Menu (Home, Categories, About, Contact) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-medium text-sm text-zinc-300">
              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl hover:text-[#ff7a00] hover:bg-white/5 transition-colors"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoryHovered(true)}
                onMouseLeave={() => setIsCategoryHovered(false)}
              >
                <Link
                  href="/categories"
                  className="px-3.5 py-2 rounded-xl hover:text-[#ff7a00] hover:bg-white/5 transition-colors flex items-center"
                >
                  Categories <ChevronDown className="w-3.5 h-3.5 ml-1 text-zinc-400" />
                </Link>

                {isCategoryHovered && (
                  <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-[#141417] border border-white/10 rounded-xl p-2 shadow-2xl glass-card">
                      <div className="grid grid-cols-1 gap-1">
                        {CATEGORIES.slice(0, 8).map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="px-2.5 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#ff7a00]/10 flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className="w-6 h-6 rounded-md relative overflow-hidden border border-white/10 shrink-0 bg-zinc-800">
                                <Image
                                  src={cat.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80'}
                                  alt={cat.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>{cat.name}</span>
                            </div>
                            <span className="text-[10px] text-[#ff7a00] group-hover:translate-x-0.5 transition-transform">Explore →</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/5 text-center">
                        <Link
                          href="/categories"
                          className="text-xs text-[#ff7a00] hover:underline font-semibold"
                        >
                          View All Categories
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="px-3.5 py-2 rounded-xl hover:text-[#ff7a00] hover:bg-white/5 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-3.5 py-2 rounded-xl hover:text-[#ff7a00] hover:bg-white/5 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right: Prominent Long Search Bar, Admin Link, Subscribe Button */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* Long & Prominent Search Input Box */}
              <div
                onClick={() => setIsSearchOpen(true)}
                className="relative hidden sm:flex items-center w-48 md:w-64 lg:w-72 cursor-pointer group"
              >
                <Search className="w-4 h-4 text-[#ff7a00] absolute left-3.5 pointer-events-none group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search articles, guides, tech..."
                  className="w-full pl-10 pr-10 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-400 cursor-pointer focus:outline-none transition-all"
                />
                <span className="absolute right-3 text-[10px] font-mono text-zinc-400 bg-white/10 px-1.5 py-0.5 rounded border border-white/5">
                  ⌘K
                </span>
              </div>

              {/* Mobile Search Button Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search articles"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#ff7a00] border border-white/5 transition-all sm:hidden"
              >
                <Search className="w-4 h-4 text-[#ff7a00]" />
              </button>

              {/* Admin Portal Link */}
              <Link
                href="/admin"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-[#ff7a00]/10 text-zinc-300 hover:text-[#ff7a00] border border-white/5 transition-all flex items-center space-x-1.5 shrink-0"
                title="Admin Portal"
              >
                <Lock className="w-4 h-4 text-[#ff7a00]" />
                <span className="text-xs font-semibold hidden md:inline">Admin</span>
              </Link>

              {/* Subscribe CTA Button */}
              <a
                href="#newsletter"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] hover:opacity-95 text-black font-bold text-xs shadow-md brand-glow-hover transition-all shrink-0"
              >
                Subscribe
              </a>

              {/* Mobile Menu Trigger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Instant Search Modal Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
