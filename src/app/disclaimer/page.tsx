import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | NexGenTeck Blog',
  description: 'Disclaimer policy for NexGenTeck Blog.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-white">Disclaimer</h1>
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 text-zinc-300 text-sm">
          <p>The information on NexGenTeck Blog is for general educational and technical guidance only. Always test code in staging environments before deploying to production systems.</p>
        </div>
      </div>
    </div>
  );
}
