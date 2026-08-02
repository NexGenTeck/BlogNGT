import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA Notice & Takedown Policy | NexGenTeck Blog',
  description: 'Digital Millennium Copyright Act (DMCA) policy for NexGenTeck Blog.',
};

export default function DMCAPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-white">DMCA Copyright Policy</h1>
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 text-zinc-300 text-sm">
          <p>NexGenTeck respects the intellectual property rights of others. If you believe any content on `blog.nexgenteck.com` infringes your copyright, please send a written takedown notice to dmca@nexgenteck.com.</p>
        </div>
      </div>
    </div>
  );
}
