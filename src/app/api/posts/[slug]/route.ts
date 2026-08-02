import { NextResponse } from 'next/server';
import { POSTS } from '@/lib/posts';

let serverPosts = [...POSTS];

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const postIndex = serverPosts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const updatedPost = {
      ...serverPosts[postIndex],
      ...body,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    serverPosts[postIndex] = updatedPost;
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const initialLength = serverPosts.length;
    serverPosts = serverPosts.filter((p) => p.slug !== slug);

    if (serverPosts.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
