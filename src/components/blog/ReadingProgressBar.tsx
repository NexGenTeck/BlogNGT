'use client';

import React, { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] shadow-[0_0_10px_#ff7a00] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
