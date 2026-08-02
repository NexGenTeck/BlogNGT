import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryPills } from '@/components/home/CategoryPills';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { LatestArticles } from '@/components/home/LatestArticles';
import { RightSidebar } from '@/components/sidebar/RightSidebar';
import { AdSlot } from '@/components/ads/AdSlot';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Large Premium Hero Banner */}
      <HeroSection />

      {/* 2. Google AdSense Top Leaderboard Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot type="leaderboard" />
      </div>

      {/* 3. Horizontal Category Pills Filter */}
      <CategoryPills />

      {/* 4. Featured Articles Section */}
      <FeaturedSection posts={featuredPosts} />

      {/* 5. Main Magazine Layout Grid with Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Articles Stream Column */}
          <div className="lg:col-span-8">
            <LatestArticles posts={posts} />
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 sticky top-24">
            <RightSidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
