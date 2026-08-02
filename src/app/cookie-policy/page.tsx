import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | NexGenTeck Blog',
  description: 'Cookie Policy for NexGenTeck Blog.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-white">Cookie Policy</h1>
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4 text-zinc-300 text-sm">
          <p>NexGenTeck Blog uses cookies to improve reading performance, analyze traffic, and display personalized AdSense advertisements.</p>
          <h2 className="text-lg font-bold text-white">Managing Cookies</h2>
          <p>You can adjust your browser settings to decline cookies at any time. Essential session preferences will remain active.</p>
        </div>
      </div>
    </div>
  );
}
