import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy | NexGenTeck Blog',
  description: 'Editorial standards and review process at NexGenTeck Blog.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-white">Editorial Guidelines</h1>
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 text-zinc-300 text-sm">
          <p>Our commitment to tech readers:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Every article undergoes technical peer review prior to publication.</li>
            <li>Code benchmarks are executed on isolated cloud environments.</li>
            <li>No AI-generated spam content; all posts are hand-crafted by human experts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
