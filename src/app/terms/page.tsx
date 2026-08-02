import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | NexGenTeck Blog',
  description: 'Terms of Service and conditions of use for NexGenTeck Blog.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-bold text-[#ff7a00]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Terms of Use</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs text-zinc-400">Effective Date: July 2026</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-6 text-zinc-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using NexGenTeck Blog (`blog.nexgenteck.com`), you agree to comply with and be bound by these Terms & Conditions.
          </p>

          <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
          <p>
            All content, including tutorials, code snippets, graphics, branding, and text, is owned by NexGenTeck. Code snippets published in articles are granted under the MIT License for educational and commercial development use.
          </p>

          <h2 className="text-xl font-bold text-white">3. Disclaimer of Warranties</h2>
          <p>
            Articles and code examples are provided &quot;as is&quot; for informational purposes. While we rigorously test our benchmarks, NexGenTeck is not liable for system outages resulting from code implementations.
          </p>
        </div>
      </div>
    </div>
  );
}
