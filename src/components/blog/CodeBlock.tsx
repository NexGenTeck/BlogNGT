'use client';

import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden bg-[#0e0e11] border border-white/10 shadow-2xl glass-card">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-[#ff7a00]" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all border border-white/5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
