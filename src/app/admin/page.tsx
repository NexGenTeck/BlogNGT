'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  User,
  Key,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  FileText,
  Search,
  LogOut,
  Sparkles,
  BarChart3,
  X,
  AlertTriangle,
  Folder,
  Tag,
  Calendar,
  Clock,
  Globe,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Post } from '@/lib/types';
import { AUTHORS } from '@/lib/authors';
import { CATEGORIES } from '@/lib/categories';
import { getStoredPosts, savePostToStorage, deletePostFromStorage } from '@/lib/postStore';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('admin@nexgenteck.com');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // Posts & Filter state
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteTargetSlug, setDeleteTargetSlug] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'ai-automation',
    authorId: AUTHORS[0].id,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tagsStr: 'AI Automation, Tech, Guide',
    readingTime: '5 min read',
    isFeatured: false,
    isPopular: false,
    isTrending: false,
    isDraft: false,
    metaTitle: '',
    metaDescription: '',
  });

  // Check auth session on load
  useEffect(() => {
    const session = localStorage.getItem('nexgenteck_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
    }
    loadPosts();
  }, []);

  const loadPosts = () => {
    const loaded = getStoredPosts();
    setPosts(loaded);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@nexgenteck.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('nexgenteck_admin_session', 'active');
      showNotification('success', 'Successfully authenticated as Admin.');
    } else {
      setAuthError('Invalid credentials. Default: admin@nexgenteck.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nexgenteck_admin_session');
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Open modal for new post creation
  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'ai-automation',
      authorId: AUTHORS[0].id,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      tagsStr: 'AI Automation, Tech, Guide',
      readingTime: '5 min read',
      isFeatured: false,
      isPopular: false,
      isTrending: false,
      isDraft: false,
      metaTitle: '',
      metaDescription: '',
    });
    setIsModalOpen(true);
  };

  // Open modal for editing post
  const handleOpenEditModal = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      authorId: post.author.id,
      coverImage: post.coverImage,
      tagsStr: post.tags.join(', '),
      readingTime: post.readingTime || '5 min read',
      isFeatured: !!post.isFeatured,
      isPopular: !!post.isPopular,
      isTrending: !!post.isTrending,
      isDraft: !!post.isDraft,
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
    });
    setIsModalOpen(true);
  };

  // Auto-generate slug when title changes in create mode
  const handleTitleChange = (val: string) => {
    const updatedForm = { ...formData, title: val };
    if (!editingPost) {
      updatedForm.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setFormData(updatedForm);
  };

  // Save post submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showNotification('error', 'Title and Content are required.');
      return;
    }

    const selectedAuthor = AUTHORS.find((a) => a.id === formData.authorId) || AUTHORS[0];
    const tags = formData.tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const postToSave: Post = {
      slug,
      title: formData.title,
      excerpt: formData.excerpt || formData.title,
      content: formData.content,
      category: formData.category,
      author: selectedAuthor,
      coverImage: formData.coverImage,
      tags: tags.length > 0 ? tags : ['Tech'],
      publishedAt: editingPost ? editingPost.publishedAt : new Date().toISOString().split('T')[0],
      updatedAt: editingPost ? new Date().toISOString().split('T')[0] : undefined,
      readingTime: formData.readingTime || '5 min read',
      isFeatured: formData.isFeatured,
      isPopular: formData.isPopular,
      isTrending: formData.isTrending,
      isDraft: formData.isDraft,
      views: editingPost ? (editingPost.views || 1) : 1,
      metaTitle: formData.metaTitle || `${formData.title} | NexGenTeck`,
      metaDescription: formData.metaDescription || formData.excerpt,
    };

    savePostToStorage(postToSave);
    loadPosts();
    setIsModalOpen(false);
    showNotification('success', editingPost ? 'Blog post updated successfully!' : 'New blog post published successfully!');
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (!deleteTargetSlug) return;
    deletePostFromStorage(deleteTargetSlug);
    loadPosts();
    setDeleteTargetSlug(null);
    showNotification('success', 'Blog post permanently removed.');
  };

  // Stats calculation
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => !p.isDraft).length;
  const draftPosts = posts.filter((p) => p.isDraft).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && !p.isDraft) ||
      (statusFilter === 'draft' && p.isDraft);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ----------------------------------------------------
  // LOGIN SCREEN UI
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-[#000000] max-w-md bg-[#141417] border border-white/10 rounded-2xl p-8 shadow-2xl glass-card relative overflow-hidden">
          {/* Subtle ambient backlight */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#ff7a00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#ff9e00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl relative overflow-hidden shadow-xl border border-white/10 mx-auto mb-4 bg-black">
              <Image
                src="/logo.png"
                alt="NexGenTeck Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              NexGen<span className="text-[#ff7a00]">Teck</span> Admin Portal
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Enter your authorization credentials to manage blog posts
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Admin Email / User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexgenteck.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7a00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7a00] transition-colors"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400 space-y-1">
              <div className="font-semibold text-white flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff7a00] mr-1.5" /> Demo Login Info:
              </div>
              <p>Email: <code className="text-[#ff7a00]">admin@nexgenteck.com</code></p>
              <p>Password: <code className="text-[#ff7a00]">admin123</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] text-black font-extrabold text-sm shadow-lg brand-glow-hover transition-all flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-[#ff7a00] transition-colors inline-flex items-center"
            >
              ← Back to Main Blog Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD UI
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 ${
            notification.type === 'success'
              ? 'bg-[#ff7a00] text-black'
              : 'bg-red-500 text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-[#ff7a00]/20 text-[#ff7a00] border border-[#ff7a00]/30 text-[10px] font-extrabold uppercase tracking-widest">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-zinc-400">Authenticated Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Blog Post Management
          </h1>
          <p className="text-xs text-zinc-400">
            Publish, update, and manage all articles on NexGenTeck Blog
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] text-black font-extrabold text-xs shadow-md brand-glow-hover transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 border border-white/10 transition-colors text-xs font-semibold flex items-center space-x-1.5"
            title="Logout of Admin session"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#141417] border border-white/10 rounded-2xl p-4 glass-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Posts</span>
            <FileText className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalPosts}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Stored articles</div>
        </div>

        <div className="bg-[#141417] border border-white/10 rounded-2xl p-4 glass-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{publishedPosts}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Live on site</div>
        </div>

        <div className="bg-[#141417] border border-white/10 rounded-2xl p-4 glass-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{draftPosts}</div>
          <div className="text-[10px] text-amber-400 mt-1">Unpublished</div>
        </div>

        <div className="bg-[#141417] border border-white/10 rounded-2xl p-4 glass-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Views</span>
            <BarChart3 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Reader engagements</div>
        </div>
      </div>

      {/* Table Toolbar & Search Filters */}
      <div className="bg-[#141417] border border-white/10 rounded-2xl p-4 glass-card space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title, slug, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7a00] transition-colors"
            />
          </div>

          {/* Category Filter & Status Filter */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#ff7a00]"
            >
              <option value="all">All Categories ({posts.length})</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#ff7a00]"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
            </select>
          </div>
        </div>

        {/* Blog Posts Data Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Article Title & Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-9 rounded-lg relative overflow-hidden shrink-0 border border-white/10 bg-zinc-800">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-white truncate text-xs hover:text-[#ff7a00]">
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              {post.title}
                            </Link>
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate font-mono mt-0.5">
                            /{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-medium">
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.author?.avatar || AUTHORS[0].avatar}
                          alt={post.author?.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-zinc-300 text-xs">{post.author?.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-400 text-[11px]">
                      {post.publishedAt}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                      {post.views || 0}
                    </td>

                    <td className="py-3.5 px-4">
                      {post.isDraft ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                          Draft
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                          Published
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="View Live Article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(post)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#ff7a00]/20 text-zinc-400 hover:text-[#ff7a00] transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetSlug(post.slug)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* CREATE & EDIT POST MODAL */}
      {/* ---------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141417] border border-white/10 rounded-2xl w-full max-w-3xl p-6 shadow-2xl glass-card relative max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-black text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#ff7a00]" />
                <span>{editingPost ? 'Edit Blog Article' : 'Create New Blog Article'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Master Next.js 15 Server Actions"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="master-nextjs-15-server-actions"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Article Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short engaging summary for article cards and SEO snippets..."
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              {/* Category, Author & Reading Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Author *
                  </label>
                  <select
                    value={formData.authorId}
                    onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  >
                    {AUTHORS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    placeholder="6 min read"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              {/* Cover Image & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tagsStr}
                    onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    placeholder="Next.js, AI, Automation"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              {/* Main Content (Markdown format) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Article Body Content (Markdown Supported) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="## Introduction&#10;&#10;Write your article content here in Markdown format..."
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              {/* Status & Visibility Flags */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDraft}
                    onChange={(e) => setFormData({ ...formData, isDraft: e.target.checked })}
                    className="rounded bg-black border-white/20 text-[#ff7a00] focus:ring-0"
                  />
                  <span>Save as Draft</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded bg-black border-white/20 text-[#ff7a00] focus:ring-0"
                  />
                  <span>Featured Post</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="rounded bg-black border-white/20 text-[#ff7a00] focus:ring-0"
                  />
                  <span>Popular Post</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded bg-black border-white/20 text-[#ff7a00] focus:ring-0"
                  />
                  <span>Trending Post</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] text-black font-extrabold text-xs shadow-md brand-glow-hover transition-all"
                >
                  {editingPost ? 'Update Post' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ---------------------------------------------------- */}
      {deleteTargetSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141417] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl glass-card space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Blog Article?</h3>
            <p className="text-xs text-zinc-400">
              Are you sure you want to remove article <code className="text-[#ff7a00]">/{deleteTargetSlug}</code>? This action will remove it from the blog feed.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteTargetSlug(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-lg"
              >
                Yes, Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
