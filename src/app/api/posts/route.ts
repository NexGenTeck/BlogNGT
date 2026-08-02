import { NextResponse } from 'next/server';
import { POSTS } from '@/lib/posts';
import { Post } from '@/lib/types';

// In-memory posts array for server-side operations
let serverPosts: Post[] = [...POSTS];

export async function GET() {
  return NextResponse.json({ success: true, posts: serverPosts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, coverImage, tags, isFeatured, isPopular, isTrending, isDraft } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newPost: Post = {
      slug,
      title,
      excerpt: excerpt || title,
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : ['Tech']),
      author: author || {
        id: 'admin',
        name: 'NexGenTeck Editorial Team',
        role: 'Admin Editor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Official editorial account of NexGenTeck.',
        socials: { website: 'https://www.nexgenteck.com' },
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: `${Math.max(1, Math.ceil(content.split(' ').length / 200))} min read`,
      isFeatured: !!isFeatured,
      isPopular: !!isPopular,
      isTrending: !!isTrending,
      isDraft: !!isDraft,
      views: 1,
      metaTitle: `${title} | NexGenTeck Blog`,
      metaDescription: excerpt || title,
    };

    serverPosts.unshift(newPost);
    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
