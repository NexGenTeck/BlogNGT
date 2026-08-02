'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

export function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: '1',
      name: 'Marcus Vance',
      role: 'DevOps Architect',
      date: 'July 29, 2026',
      content: 'Incredible breakdown of Next.js 15 Server Actions and Claude 3.5 tool calling safety. We implemented the Zod schema validation strategy and cut tool failures by 90%!',
    },
    {
      id: '2',
      name: 'Elena Rostova',
      role: 'Full Stack Engineer',
      date: 'July 30, 2026',
      content: 'The section on human-in-the-loop (HITL) authorization checks was spot on. Highly recommended reading for any tech team building AI products.',
    },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setComments([
        {
          id: String(Date.now()),
          name,
          role: 'Tech Reader',
          date: 'Just now',
          content: message,
        },
        ...comments,
      ]);
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="space-y-8 pt-8 border-t border-white/10">
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-5 h-5 text-[#ff7a00]" />
        <h3 className="text-xl font-bold text-white">
          Reader Discussion ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
        <h4 className="text-sm font-bold text-white">Leave a Comment</h4>
        
        {submitted && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Thank you! Your comment has been published.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name *"
            className="px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email * (will not be published)"
            className="px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
          />
        </div>

        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts or technical insights..."
          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
        />

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-black font-bold text-xs shadow-md flex items-center space-x-2 transition-all"
        >
          <span>Submit Comment</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Existing Comments List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#ff7a00]/20 flex items-center justify-center text-[#ff7a00]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{c.name}</h5>
                  <span className="text-[10px] text-zinc-500">{c.role}</span>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500">{c.date}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed pl-9">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
