'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight, Twitter, Linkedin, Github, Youtube, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { AdSlot } from '../ads/AdSlot';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#09090b] border-t border-white/10 pt-16 pb-12 overflow-hidden text-zinc-400">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#ff7a00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Footer Ad Banner */}
        <AdSlot type="footer" className="mb-8" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff7a00] to-[#ff9e00] flex items-center justify-center font-extrabold text-black text-xl shadow-md">
                N
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                NexGen<span className="text-[#ff7a00]">Teck</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              NexGenTeck Blog is your premier source for insights into AI automation, technical SEO, enterprise web development, digital marketing growth, and SaaS scaling strategies.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-zinc-500">
              <span className="flex items-center text-[#ff7a00]">
                <ShieldCheck className="w-4 h-4 mr-1" /> Subdomain of NexGenTeck
              </span>
              <span>•</span>
              <a
                href="https://www.nexgenteck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white"
              >
                www.nexgenteck.com ↗
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] border border-white/5 flex items-center justify-center text-zinc-400 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] border border-white/5 flex items-center justify-center text-zinc-400 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] border border-white/5 flex items-center justify-center text-zinc-400 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] border border-white/5 flex items-center justify-center text-zinc-400 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-[#ff7a00] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#ff7a00] transition-colors">About Us</Link></li>
              <li><Link href="/categories" className="hover:text-[#ff7a00] transition-colors">All Categories</Link></li>
              <li><Link href="/search" className="hover:text-[#ff7a00] transition-colors">Instant Search</Link></li>
              <li><Link href="/write-for-us" className="hover:text-[#ff7a00] transition-colors">Write For Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#ff7a00] transition-colors">Contact Editorial</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-[#ff7a00] transition-colors">XML Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Top Categories</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-[#ff7a00] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Editorial Policies</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy-policy" className="hover:text-[#ff7a00] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#ff7a00] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-[#ff7a00] transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#ff7a00] transition-colors">Disclaimer</Link></li>
              <li><Link href="/dmca" className="hover:text-[#ff7a00] transition-colors">DMCA Notice</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-[#ff7a00] transition-colors">Editorial Guidelines</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Newsletter Box */}
        <div id="newsletter" className="p-6 sm:p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00] mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Join 10,000+ Readers</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Get Weekly Tech & Growth Insights
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Zero spam. Only hand-crafted tutorials, AI breakthroughs, and digital strategy guides.
              </p>
            </div>

            <div>
              {isSubscribed ? (
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00]">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">
                    Thank you for subscribing! You are now on the NexGenTeck VIP list.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email address"
                    className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] hover:opacity-95 text-black font-bold text-xs shadow-md brand-glow flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NexGenTeck. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Official Blog of <a href="https://www.nexgenteck.com" className="text-zinc-400 hover:text-[#ff7a00] font-medium">NexGenTeck Digital Growth Agency</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
