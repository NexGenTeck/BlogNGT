'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Author } from '@/lib/types';
import { Twitter, Linkedin, Github, User } from 'lucide-react';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#ff7a00]/40 flex-shrink-0 shadow-lg">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">{author.name}</h3>
            <p className="text-xs text-[#ff7a00] font-semibold">{author.role}</p>
          </div>

          <Link
            href={`/author/${author.id}`}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 transition-all self-center sm:self-auto"
          >
            View Articles
          </Link>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
          {author.bio}
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start space-x-3">
          {author.socials.twitter && (
            <a
              href={author.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#ff7a00] transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {author.socials.linkedin && (
            <a
              href={author.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#ff7a00] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {author.socials.github && (
            <a
              href={author.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#ff7a00] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
