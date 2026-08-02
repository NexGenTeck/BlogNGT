import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | NexGenTeck Blog',
  description: 'Privacy Policy for the NexGenTeck Blog subdomain (blog.nexgenteck.com).',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-bold text-[#ff7a00]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: July 2026 • Applies to blog.nexgenteck.com</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-6 text-zinc-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p>
            When you visit NexGenTeck Blog (`blog.nexgenteck.com`), we collect minimal non-personally identifiable analytical information such as browser type, operating system, referring URL, and pages visited to optimize website speed and reading experience.
          </p>

          <h2 className="text-xl font-bold text-white">2. Newsletter Subscriptions</h2>
          <p>
            If you voluntarily subscribe to our email newsletter, we store your email address securely solely to deliver weekly technical articles. We never sell, rent, or lease subscriber lists to third parties. You may unsubscribe at any time using the link in any newsletter.
          </p>

          <h2 className="text-xl font-bold text-white">3. Cookies & Advertising</h2>
          <p>
            This website utilizes cookies for performance analytics and non-intrusive Google AdSense advertising. Google uses cookies to serve ads based on prior visits to our website or other websites.
          </p>

          <h2 className="text-xl font-bold text-white">4. Contact Us</h2>
          <p>
            For privacy inquiries or data requests, contact our compliance team at privacy@nexgenteck.com.
          </p>
        </div>
      </div>
    </div>
  );
}
