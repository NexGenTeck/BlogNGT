import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PenTool, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Write For Us - Guest Post Guidelines | NexGenTeck Blog',
  description: 'Contribute technical tutorials, AI blueprints, and growth case studies to the NexGenTeck Blog.',
};

export default function WriteForUsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00]">
            <PenTool className="w-3.5 h-3.5" />
            <span>Contributor Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Write For NexGenTeck</h1>
          <p className="text-sm text-zinc-300">Share your engineering expertise with 10,000+ technology leaders and developers.</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-6 text-zinc-300 text-sm">
          <h2 className="text-xl font-bold text-white">What We Look For</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-[#ff7a00] flex-shrink-0 mt-1" />
              <span>In-depth developer guides (Next.js 15, TypeScript, Cloud Architecture, AI Automation).</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-[#ff7a00] flex-shrink-0 mt-1" />
              <span>Original technical case studies with verified benchmark data.</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-[#ff7a00] flex-shrink-0 mt-1" />
              <span>1,200+ words, original code snippets, and zero AI fluff.</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <p className="text-xs text-zinc-400">Ready to submit a pitch or outline?</p>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#ff7a00] text-black font-bold text-xs hover:bg-[#e06b00] transition-colors flex items-center space-x-2"
            >
              <span>Submit Pitch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
