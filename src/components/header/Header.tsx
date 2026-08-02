'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Moon, Menu, ChevronDown, ExternalLink } from 'lucide-react';
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
          <div className="flex items-center justify-between">
            {/* Brand Logo matching Main NexGenTeck Website */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff7a00] to-[#ff9e00] flex items-center justify-center font-extrabold text-black text-xl shadow-md group-hover:scale-105 transition-transform">
                  N
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
                    Your Digital Growth Partner
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-zinc-300">
              <Link href="/" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
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
                  className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors flex items-center"
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
                            className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#ff7a00]/10 flex items-center justify-between transition-colors"
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-[#ff7a00]">Explore →</span>
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

              <Link href="/category/ai-automation" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                AI
              </Link>
              <Link href="/category/web-development" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                Web Dev
              </Link>
              <Link href="/category/digital-marketing" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                Digital Marketing
              </Link>
              <Link href="/category/business" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                Business
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                About
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded-lg hover:text-[#ff7a00] hover:bg-white/5 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center space-x-3">
              {/* Back to Main Site Link */}
              <a
                href="https://www.nexgenteck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center text-xs font-medium text-zinc-400 hover:text-[#ff7a00] transition-colors mr-2"
                title="Visit main NexGenTeck company website"
              >
                nexgenteck.com <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              {/* Instant Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search articles"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#ff7a00] border border-white/5 transition-all flex items-center space-x-2"
              >
                <Search className="w-4 h-4 text-[#ff7a00]" />
                <span className="text-xs text-zinc-400 hidden sm:inline">Search...</span>
                <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded hidden md:inline">⌘K</span>
              </button>

              {/* Dark Mode Indicator */}
              <div
                title="Dark Theme Active"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[#ff7a00]"
              >
                <Moon className="w-4 h-4" />
              </div>

              {/* Subscribe CTA Button */}
              <a
                href="#newsletter"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] hover:opacity-95 text-black font-bold text-xs shadow-md brand-glow-hover transition-all"
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
