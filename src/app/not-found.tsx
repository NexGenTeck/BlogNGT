import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowRight, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card">
        <div className="w-16 h-16 rounded-2xl bg-[#ff7a00]/10 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#ff7a00]">404</span>
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The article or page you are looking for might have been moved, renamed, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-black font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-center space-x-2 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
