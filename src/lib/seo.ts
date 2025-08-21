// src/lib/seo.ts
import { Metadata } from 'next'

export interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  noindex = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://www.aet.ski'
  
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'AET Ski Transfers',
      url: canonical || baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
  }

  return metadata
}

// SEO-optimized content based on your 30 keywords
export const seoContent = {
  home: {
    title: 'Private Airport Transfers to French Alps Ski Resorts | AET',
    description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to Val d\'Isère, Courchevel, Val Thorens & all French Alps ski resorts. 15+ years experience.',
    keywords: [
      'private airport transfer French Alps',
      'Geneva to Val d\'Isère transfer', 
      'ski resort transfers',
      'airport shuttle French Alps',
      'Courchevel private transfer',
      'Val Thorens airport transfer',
      'VIP ski transfer French Alps',
      'luxury airport to ski resort taxi France',
      'family ski transfer Grenoble airport',
      'door-to-door airport ski transfer service',
    ],
  },
  routes: {
    title: 'Airport Transfer Routes to French Alps Ski Resorts | Geneva, Lyon, Grenoble',
    description: 'Comprehensive guide to private transfer routes from Geneva, Lyon, Chambéry & Grenoble airports to ski resorts. Compare distances, times & costs.',
    keywords: [
      'Geneva airport ski transfer routes',
      'Lyon to Courchevel distance',
      'Grenoble airport to ski resorts',
      'Chambery transfer routes',
      'French Alps airport comparison',
      'Geneva to La Plagne private transfer',
      'Lyon airport to Les Arcs taxi',
      'Grenoble to Megeve private transfer',
    ],
  },
  contact: {
    title: 'Contact AET | Book Your French Alps Airport Transfer',
    description: 'Get in touch with AET for private airport transfers to French Alps ski resorts. Book your transfer from Geneva, Lyon, Chambéry or Grenoble.',
    keywords: [
      'book airport transfer French Alps',
      'AET contact',
      'private transfer booking',
      'ski transfer quotes',
      'book private ski transfer to Courchevel',
      'best transfer rates to Val Thorens ski resort',
    ],
  },
  travelInfo: {
    title: 'French Alps Ski Travel Guide | Airlines, Resorts & Transfer Info',
    description: 'Complete travel guide for skiing in French Alps. Airlines, ski resorts, accommodation, weather & everything you need for your ski holiday.',
    keywords: [
      'French Alps ski travel guide',
      'ski resort information',
      'Alpine travel planning',
      'ski holiday guide',
      'winter ski holiday transfer Lyon airport',
      'Christmas ski transfer Geneva Val d\'Isère',
    ],
  },
}

// Airport-resort specific SEO content
export const routeSEOContent = {
  'geneva-to-val-disere': {
    title: 'Private Transfer from Geneva to Val d\'Isère | AET Ski Transfers',
    description: 'Book your premium private transfer from Geneva Airport to Val d\'Isère ski resort. Door-to-door service, professional drivers, 24/7 availability. Get a quote today!',
    keywords: [
      'private transfer Geneva to Val d\'Isère',
      'Geneva airport ski transfer Val d\'Isère',
      'door-to-door airport transfer Val d\'Isère',
      'Geneva to Val d\'Isère taxi',
      'price private transfer Geneva to Val d\'Isère',
    ],
  },
  'geneva-to-courchevel': {
    title: 'Private Transfer from Geneva to Courchevel | AET Ski Transfers',
    description: 'Premium private transfer from Geneva Airport to Courchevel ski resort. Professional service, door-to-door, family-friendly. Book your transfer today!',
    keywords: [
      'private transfer Geneva to Courchevel',
      'Geneva airport to Courchevel 1850',
      'Geneva to Courchevel taxi',
      'book private ski transfer to Courchevel',
    ],
  },
  'lyon-to-courchevel': {
    title: 'Private Transfer from Lyon to Courchevel | AET Ski Transfers',
    description: 'Professional private transfer from Lyon Airport to Courchevel ski resort. Reliable service, competitive rates, door-to-door convenience.',
    keywords: [
      'Lyon airport to Courchevel private transfer',
      'Lyon to Courchevel distance',
      'Lyon airport ski transfer Courchevel',
      'private transfer Lyon to Courchevel',
    ],
  },
  'grenoble-to-tignes': {
    title: 'Private Transfer from Grenoble to Tignes | AET Ski Transfers',
    description: 'Premium private transfer from Grenoble Airport to Tignes ski resort. Professional drivers, door-to-door service, ski equipment friendly.',
    keywords: [
      'Grenoble airport to Tignes private taxi',
      'Grenoble to Tignes private transfer',
      'Grenoble airport ski transfer Tignes',
      'ski equipment friendly private transfer',
    ],
  },
}
