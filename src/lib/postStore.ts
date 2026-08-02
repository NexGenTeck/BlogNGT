import { Post } from './types';
import { POSTS as INITIAL_POSTS } from './posts';

const STORAGE_KEY = 'nexgenteck_custom_posts_v1';
const DELETED_KEY = 'nexgenteck_deleted_slugs_v1';

export function getStoredPosts(): Post[] {
  if (typeof window === 'undefined') {
    return INITIAL_POSTS;
  }

  try {
    const customPostsRaw = localStorage.getItem(STORAGE_KEY);
    const deletedSlugsRaw = localStorage.getItem(DELETED_KEY);

    const customPosts: Post[] = customPostsRaw ? JSON.parse(customPostsRaw) : [];
    const deletedSlugs: string[] = deletedSlugsRaw ? JSON.parse(deletedSlugsRaw) : [];

    // Filter out deleted posts from initial static posts
    const activeInitialPosts = INITIAL_POSTS.filter((p) => !deletedSlugs.includes(p.slug));

    // Override/Merge custom posts (custom posts take priority if matching slug exists)
    const map = new Map<string, Post>();
    activeInitialPosts.forEach((p) => map.set(p.slug, p));
    customPosts.forEach((p) => map.set(p.slug, p));

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (err) {
    console.error('Error accessing local storage posts:', err);
    return INITIAL_POSTS;
  }
}

export function savePostToStorage(post: Post): Post[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;

  try {
    const customPostsRaw = localStorage.getItem(STORAGE_KEY);
    const customPosts: Post[] = customPostsRaw ? JSON.parse(customPostsRaw) : [];

    const existingIndex = customPosts.findIndex((p) => p.slug === post.slug);
    if (existingIndex >= 0) {
      customPosts[existingIndex] = post;
    } else {
      customPosts.unshift(post);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customPosts));

    // Remove from deleted list if it was previously marked deleted
    const deletedSlugsRaw = localStorage.getItem(DELETED_KEY);
    if (deletedSlugsRaw) {
      const deletedSlugs: string[] = JSON.parse(deletedSlugsRaw);
      const updatedDeleted = deletedSlugs.filter((s) => s !== post.slug);
      localStorage.setItem(DELETED_KEY, JSON.stringify(updatedDeleted));
    }

    // Trigger custom event for real-time updates across open tabs/components
    window.dispatchEvent(new Event('nexgenteck_posts_updated'));
  } catch (err) {
    console.error('Error saving post to storage:', err);
  }

  return getStoredPosts();
}

export function deletePostFromStorage(slug: string): Post[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;

  try {
    const customPostsRaw = localStorage.getItem(STORAGE_KEY);
    const customPosts: Post[] = customPostsRaw ? JSON.parse(customPostsRaw) : [];
    const updatedCustom = customPosts.filter((p) => p.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustom));

    const deletedSlugsRaw = localStorage.getItem(DELETED_KEY);
    const deletedSlugs: string[] = deletedSlugsRaw ? JSON.parse(deletedSlugsRaw) : [];
    if (!deletedSlugs.includes(slug)) {
      deletedSlugs.push(slug);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deletedSlugs));
    }

    window.dispatchEvent(new Event('nexgenteck_posts_updated'));
  } catch (err) {
    console.error('Error deleting post from storage:', err);
  }

  return getStoredPosts();
}
