// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aet.ski'
  const lastModified = new Date()

  // Core pages
  const routes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/routes`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/travel-info`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // High-value keyword routes for specific airport-resort combinations
  const keywordRoutes = [
    'geneva-to-val-disere',
    'geneva-to-val-thorens',
    'geneva-to-courchevel',
    'geneva-to-meribel',
    'geneva-to-la-plagne',
    'geneva-to-les-arcs',
    'geneva-to-tignes',
    'lyon-to-courchevel',
    'lyon-to-val-thorens',
    'lyon-to-les-arcs',
    'lyon-to-la-plagne',
    'grenoble-to-tignes',
    'grenoble-to-alpe-huez',
    'grenoble-to-les-deux-alpes',
    'chambery-to-meribel',
    'chambery-to-courchevel',
  ].map(route => ({
    url: `${baseUrl}/routes/${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...keywordRoutes]
}
