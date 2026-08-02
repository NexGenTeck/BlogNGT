'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Code2, Cpu } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff7a00]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#ff9e00]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subdomain Branding Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff7a00] animate-ping" />
              <span className="text-xs font-semibold text-zinc-300">
                Official Blog of <span className="text-[#ff7a00]">NexGenTeck.com</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#ff7a00]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Insights That Drive <br />
              <span className="orange-gradient-text">Innovation Forward</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
              Explore expert tutorials, technology trends, AI automation, web development, digital marketing strategies, business growth guides, and practical resources to help professionals and businesses grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#latest-articles"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] hover:opacity-95 text-black font-bold text-sm shadow-xl brand-glow flex items-center space-x-2 transition-all hover:translate-y-[-2px]"
              >
                <span>Explore Latest Posts</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/categories"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm backdrop-blur-md flex items-center space-x-2 transition-all hover:border-[#ff7a00]/40"
              >
                <span>Browse Categories</span>
              </Link>
            </div>

            {/* Feature Highlights Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-[#ff7a00]" />
                <span className="text-xs font-medium text-zinc-400">AI & Engineering</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-[#ff7a00]" />
                <span className="text-xs font-medium text-zinc-400">Next.js 15 & React</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#ff7a00]" />
                <span className="text-xs font-medium text-zinc-400">100% SEO Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Hero Visual Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl glass-card group">
              
              {/* Hero Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
                  alt="NexGenTeck AI Workspace & Technology Hub"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                
                {/* Orange Lighting Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-[#ff7a00]/10 mix-blend-overlay" />
              </div>

              {/* Floating Glass Widget overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#141417]/90 border border-white/10 backdrop-blur-md glass-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-[#ff7a00] animate-pulse" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Featured Blueprint</h4>
                      <p className="text-[11px] text-zinc-400">Enterprise AI Agents & Next.js 15</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#ff7a00] uppercase bg-[#ff7a00]/20 px-2 py-1 rounded">
                    NEW RELEASE
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
