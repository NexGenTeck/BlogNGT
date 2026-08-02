'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-xs font-semibold text-[#ff7a00]">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact <span className="orange-gradient-text">NexGenTeck Editorial</span>
          </h1>
          <p className="text-sm text-zinc-300">
            Have a technical inquiry, guest article proposal, partnership idea, or feedback? Send us a message.
          </p>
        </div>

        <AdSlot type="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-6">
              <h3 className="text-xl font-bold text-white">Company Information</h3>
              
              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-[#ff7a00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Main Corporate Website</h4>
                    <a href="https://www.nexgenteck.com" target="_blank" rel="noopener noreferrer" className="text-[#ff7a00] hover:underline">
                      https://www.nexgenteck.com ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#ff7a00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Editorial & Support Email</h4>
                    <p className="text-zinc-400">blog@nexgenteck.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#ff7a00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Global Headquarters</h4>
                    <p className="text-zinc-400">NexGenTeck Digital Technology Hub</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[11px] text-zinc-500">
                  Response time: We typically respond to editorial inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#141417] border border-white/10 glass-card space-y-4">
              <h3 className="text-xl font-bold text-white">Send Us a Message</h3>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message has been sent to our editorial team.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Guest post submission / Feedback / Partnership"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] hover:opacity-95 text-black font-bold text-sm shadow-md brand-glow flex items-center justify-center space-x-2 transition-all"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
