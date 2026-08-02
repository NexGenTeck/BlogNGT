'use client';

import React from 'react';

interface AdSlotProps {
  type: 'leaderboard' | 'sidebar' | 'in-article' | 'between-posts' | 'footer';
  className?: string;
  client?: string;
  slot?: string;
}

export function AdSlot({ type, className = '', client = 'ca-pub-XXXXXXXXXXXXXXXX', slot }: AdSlotProps) {
  // Dimension definitions according to Google AdSense best practices
  const getSlotStyles = () => {
    switch (type) {
      case 'leaderboard':
        return 'w-full max-w-[728px] h-[90px] mx-auto';
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[336px] mx-auto';
      case 'in-article':
        return 'w-full min-h-[120px] my-8';
      case 'between-posts':
        return 'w-full min-h-[100px] my-6';
      case 'footer':
        return 'w-full max-w-[970px] h-[90px] mx-auto';
      default:
        return 'w-full min-h-[90px]';
    }
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-[#141417]/80 p-3 flex flex-col items-center justify-center text-center transition-all ${getSlotStyles()} ${className}`}
    >
      <div className="absolute top-1.5 right-2 text-[10px] uppercase tracking-wider font-semibold text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
        ADVERTISEMENT
      </div>
      
      {/* Placeholder container for production AdSense script insertion */}
      <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center space-x-2 text-zinc-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-[#ff7a00] animate-pulse"></span>
          <span>Google AdSense Slot ({type.toUpperCase()})</span>
        </div>
        <p className="text-[11px] text-zinc-500 max-w-sm">
          AdSense Ready • Non-intrusive Layout • Optimized CLS
        </p>
      </div>

      {/* Actual AdSense script tag (uncomment when publisher ID is active) */}
      {/* 
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot || "1234567890"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </aside>
  );
}
