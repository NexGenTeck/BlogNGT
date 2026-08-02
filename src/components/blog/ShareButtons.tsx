'use client';

import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-zinc-400 mr-1 flex items-center">
        <Share2 className="w-3.5 h-3.5 mr-1 text-[#ff7a00]" /> Share:
      </span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="p-2 rounded-xl bg-white/5 hover:bg-[#ff7a00] text-zinc-300 hover:text-black border border-white/5 transition-all"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-xl bg-white/5 hover:bg-[#ff7a00] text-zinc-300 hover:text-black border border-white/5 transition-all"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-2 rounded-xl bg-white/5 hover:bg-[#ff7a00] text-zinc-300 hover:text-black border border-white/5 transition-all"
      >
        <Facebook className="w-4 h-4" />
      </a>

      <button
        onClick={handleCopy}
        aria-label="Copy Article Link"
        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition-all flex items-center space-x-1"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
          </>
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
