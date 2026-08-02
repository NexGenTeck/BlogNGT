import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAuthorById } from '@/lib/authors';
import { getPostsByAuthor } from '@/lib/posts';
import { LatestArticles } from '@/components/home/LatestArticles';
import { RightSidebar } from '@/components/sidebar/RightSidebar';
import { Twitter, Linkedin, Github, UserCheck, Home, ChevronRight } from 'lucide-react';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorById(slug);

  if (!author) return { title: 'Author Not Found | NexGenTeck Blog' };

  return {
    title: `${author.name} - Author Profile | NexGenTeck Blog`,
    description: author.bio,
  };
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorById(slug);

  if (!author) notFound();

  const posts = getPostsByAuthor(author.id);

  return (
    <div className="py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#ff7a00] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-[#ff7a00] font-bold">{author.name}</span>
        </nav>

        {/* Author Profile Header Box */}
        <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff7a00]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#ff7a00] shadow-2xl flex-shrink-0">
            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-bold text-[#ff7a00]">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verified Author</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white">{author.name}</h1>
            <p className="text-sm font-semibold text-[#ff7a00]">{author.role}</p>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
              {author.bio}
            </p>

            <div className="pt-2 flex items-center justify-center md:justify-start space-x-4">
              {author.socials.twitter && (
                <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-[#ff7a00] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {author.socials.linkedin && (
                <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-[#ff7a00] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {author.socials.github && (
                <a href={author.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-[#ff7a00] transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              )}
              <span className="text-xs text-zinc-500 font-semibold px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                {posts.length} {posts.length === 1 ? 'Article Published' : 'Articles Published'}
              </span>
            </div>
          </div>
        </div>

        {/* Authored Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <div className="lg:col-span-8">
            <LatestArticles posts={posts} />
          </div>
          <div className="lg:col-span-4 sticky top-24">
            <RightSidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
