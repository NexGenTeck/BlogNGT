import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLdSchema';

export const metadata: Metadata = {
  title: 'NexGenTeck Blog - Your Digital Growth Partner',
  description: 'Explore expert tutorials, technology trends, AI automation, web development, technical SEO, digital marketing strategies, and business growth guides.',
  keywords: ['NexGenTeck', 'AI Automation', 'Web Development', 'Next.js', 'Technical SEO', 'Digital Marketing', 'Business Growth'],
  authors: [{ name: 'NexGenTeck Team', url: 'https://www.nexgenteck.com' }],
  metadataBase: new URL('https://blog.nexgenteck.com'),
  alternates: {
    canonical: 'https://blog.nexgenteck.com',
  },
  openGraph: {
    title: 'NexGenTeck Blog - Insights That Drive Innovation Forward',
    description: 'Explore expert tutorials, AI automation, web engineering benchmarks, and growth playbooks.',
    url: 'https://blog.nexgenteck.com',
    siteName: 'NexGenTeck Blog',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NexGenTeck Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGenTeck Blog - Your Digital Growth Partner',
    description: 'Explore expert tutorials, AI automation, web engineering benchmarks, and growth playbooks.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-[#0b0b0b] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-[#ff7a00]/30 selection:text-white relative">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
