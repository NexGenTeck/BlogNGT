'use client';

import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="p-5 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-3 sticky top-24">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-wider text-white">
        <List className="w-4 h-4 text-[#ff7a00]" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-2 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
              <a
                href={`#${item.id}`}
                className={`group flex items-center justify-between py-1 px-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#ff7a00]/15 text-[#ff7a00] font-bold border-l-2 border-[#ff7a00]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="line-clamp-1">{item.title}</span>
                <ChevronRight className={`w-3 h-3 flex-shrink-0 ml-1 transition-transform ${isActive ? 'text-[#ff7a00] translate-x-0.5' : 'text-zinc-600 opacity-0 group-hover:opacity-100'}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
