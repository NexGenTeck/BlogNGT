'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  links?: { label: string; url: string }[];
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'What services does NexGenTeck offer?',
  'Recommend articles on AI Automation',
  'How do I contact the NexGenTeck team?',
  'What tech stack do you recommend for Web Apps?',
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Hello! 👋 I am the **NexGenTeck AI Assistant**. How can I help you explore our services, technical solutions, or blog articles today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate smart bot response tailored for NexGenTeck services
    setTimeout(() => {
      const response = generateSmartResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateSmartResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('service') || q.includes('offer') || q.includes('what do you do')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '⚡ **NexGenTeck Core Services:**\n\n' +
          '1. **Autonomous AI Agents & Automation**: Custom LLM workflows, Claude 3.5 & OpenAI integration.\n' +
          '2. **Full-Stack Web Development**: Next.js 15, React 19, TypeScript, microservices.\n' +
          '3. **Technical SEO & Growth Architecture**: Schema optimization, Core Web Vitals engineering.\n' +
          '4. **Enterprise Cloud Infrastructure**: AWS, Docker, Kubernetes, CI/CD pipelines.',
        links: [
          { label: 'Explore AI Automation Posts', url: '/category/ai-automation' },
          { label: 'Web Development Guides', url: '/category/web-development' },
          { label: 'Contact NexGenTeck Team', url: '/contact' },
        ],
        timestamp,
      };
    }

    if (q.includes('ai') || q.includes('automation') || q.includes('claude') || q.includes('agent')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '🤖 **AI & Automation Insights:**\n\n' +
          'We specialize in building enterprise-grade autonomous agents and AI workflows using Next.js 15 Server Actions and Anthropic/OpenAI APIs. Check out our featured articles on AI automation below!',
        links: [
          { label: 'Enterprise AI Agents Guide', url: '/blog/building-enterprise-ai-agents-nextjs-15-claude-openai' },
          { label: 'AI Automation Category', url: '/category/ai-automation' },
        ],
        timestamp,
      };
    }

    if (q.includes('web') || q.includes('next.js') || q.includes('stack') || q.includes('react')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '💻 **Web Development & Engineering Stack:**\n\n' +
          'Our team builds high-performance web applications using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **React 19 Server Components**. Discover our deep-dive architecture tutorials:',
        links: [
          { label: 'Next.js 15 Web Architecture', url: '/category/web-development' },
          { label: 'Developer Tutorials', url: '/category/tutorials' },
        ],
        timestamp,
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('support')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '📬 **Get in Touch with NexGenTeck:**\n\n' +
          'Whether you need custom web engineering, AI workflow integration, or growth strategy consulting, our experts are ready to collaborate!',
        links: [
          { label: 'Go to Contact Page', url: '/contact' },
          { label: 'Main Website (nexgenteck.com)', url: 'https://www.nexgenteck.com' },
        ],
        timestamp,
      };
    }

    if (q.includes('admin') || q.includes('manage') || q.includes('post') || q.includes('publish')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '🔐 **NexGenTeck Blog Admin Portal:**\n\n' +
          'Authorized team members can manage, write, edit, and publish blog articles directly from our Admin Portal!',
        links: [{ label: 'Access Admin Portal', url: '/admin' }],
        timestamp,
      };
    }

    if (q.includes('seo') || q.includes('growth') || q.includes('marketing')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '📈 **Technical SEO & Growth Strategy:**\n\n' +
          'We engineer technical SEO playbooks, schema optimization, and growth strategy guides to help companies outrank competitors.',
        links: [
          { label: 'SEO & Growth Category', url: '/category/seo' },
          { label: 'Digital Marketing Articles', url: '/category/digital-marketing' },
        ],
        timestamp,
      };
    }

    // Default fallback answer
    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: `Thanks for your inquiry about "${query}"! 🚀 NexGenTeck provides high-performance web development, AI automation, and technical growth services. You can explore our categories or get in direct contact with our team below:`,
      links: [
        { label: 'Browse All Categories', url: '/categories' },
        { label: 'Contact NexGenTeck Team', url: '/contact' },
        { label: 'Admin Portal', url: '/admin' },
      ],
      timestamp,
    };
  };

  return (
    <>
      {/* Floating Chat Button Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open NexGenTeck AI Chatbot"
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] text-black font-extrabold text-xs shadow-2xl brand-glow-hover transition-all hover:scale-105 border border-white/20"
          >
            <div className="relative w-6 h-6 rounded-lg overflow-hidden bg-black border border-black/40 shrink-0 shadow-md">
              <Image
                src="/logo.png"
                alt="NexGenTeck Logo"
                fill
                className="object-contain p-0.5"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse z-10" />
            </div>
            <span className="hidden sm:inline tracking-tight">NexGenTeck AI Chat</span>
          </button>
        )}
      </div>

      {/* Expandable Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-[#141417] border border-white/10 rounded-2xl shadow-2xl glass-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="px-4 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl relative overflow-hidden shadow-md border border-white/10 shrink-0 bg-black">
                <Image
                  src="/logo.png"
                  alt="NexGenTeck Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-xs font-black text-white tracking-tight">
                    NexGenTeck <span className="text-[#ff7a00]">AI Assistant</span>
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-zinc-400">Services & Technical Guide</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome-1',
                      sender: 'bot',
                      text: 'Chat history reset! How can I assist you with NexGenTeck services?',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ])
                }
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg relative overflow-hidden bg-black border border-white/10 shrink-0 mt-1 shadow-sm">
                    <Image
                      src="/logo.png"
                      alt="NexGenTeck Logo"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#ff7a00] text-black font-medium'
                      : 'bg-white/5 border border-white/10 text-zinc-200'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Links / Action Buttons */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      {msg.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.url}
                          onClick={() => {
                            if (link.url.startsWith('/')) {
                              setIsOpen(false);
                            }
                          }}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-[#ff7a00]/20 text-[#ff7a00] hover:text-white text-[11px] font-semibold transition-colors"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[9px] text-right ${
                      msg.sender === 'user' ? 'text-black/70' : 'text-zinc-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-white/10 text-zinc-300 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-zinc-400">
                <div className="w-6 h-6 rounded-lg relative overflow-hidden bg-black border border-white/10 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="NexGenTeck Logo"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/5 text-xs flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompts */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] text-zinc-400 border border-white/5 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-black/60 border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about NexGenTeck services, AI, Web Dev..."
              className="flex-1 px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7a00]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9e00] text-black disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
