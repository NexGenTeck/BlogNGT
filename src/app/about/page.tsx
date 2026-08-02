import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { AUTHORS } from '@/lib/authors';
import { ShieldCheck, Sparkles, Zap, Award, Target, Users } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'About NexGenTeck Blog - Your Digital Growth Partner',
  description: 'Learn about the NexGenTeck editorial mission, lead authors, and technology benchmarks.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* About Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Subdomain of NexGenTeck.com</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Empowering Tech Leaders with <br />
            <span className="orange-gradient-text">Practical Digital Insights</span>
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            NexGenTeck Blog is an engineering and growth publication dedicated to building enterprise AI automation, high-performance Next.js web applications, and data-driven SEO growth playbooks.
          </p>
        </div>

        <AdSlot type="leaderboard" />

        {/* Mission & Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff7a00]/10 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Mission</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Bridge the gap between modern technology research and business execution through production-ready code guides and growth blueprints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff7a00]/10 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Engineering Excellence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every tutorial is tested against 100/100 Core Web Vitals performance benchmarks and enterprise safety standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff7a00]/10 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Uncompromising Quality</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zero fluff. Only real-world benchmarks, architectural diagrams, and actionable code snippets written by senior engineers.
            </p>
          </div>
        </div>

        {/* Editorial Team */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Meet Our Lead Authors</h2>
            <p className="text-xs text-zinc-400">Industry veterans behind our technical research & growth playbooks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AUTHORS.map((author) => (
              <div key={author.id} className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff7a00] mx-auto shadow-xl">
                  <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{author.name}</h3>
                  <p className="text-xs font-semibold text-[#ff7a00]">{author.role}</p>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{author.bio}</p>
                <Link
                  href={`/author/${author.id}`}
                  className="inline-block text-xs font-bold text-[#ff7a00] hover:underline"
                >
                  View Authored Posts →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
