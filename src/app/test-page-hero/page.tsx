 // src/app/test-page-hero/page.tsx
'use client';

import { PageHero } from '@/components/PageHero';
import { Navigation } from '@/components/Navigation';

export default function TestPageHero() {
  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Page Hero Component - Routes Example */}
      <PageHero
        heading="Routes"
        description="Deciding which airport to fly into can often be a simple case of choosing the most convenient flight from your local airport in the UK. You may find that the cost of the flight is the deciding factor but it's also important to understand the geography of where you'll arrive as well."
        imageSrc="https://via.placeholder.com/1271x706/CFE0F6/F5F5F5?text=Routes+Map"
        imageAlt="Map showing routes from various airports to ski resorts in the French Alps"
      />

      {/* Page Hero Component - Helpful Links Example */}
      <PageHero
        heading="Helpful Links"
        description="Discover useful resources and information to make your ski holiday planning easier. From travel tips to resort information, we've compiled everything you need to know."
        imageSrc="https://via.placeholder.com/1271x706/CFE0F6/F5F5F5?text=Helpful+Links+Image"
        imageAlt="Collection of helpful travel resources and links"
      />

      {/* Additional content to show the component in context */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Additional Content
          </h2>
          <p className="text-text-secondary">
            This demonstrates how the PageHero component integrates with the rest of the page content.
          </p>
        </div>
      </section>
    </main>
  );
}