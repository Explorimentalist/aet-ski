// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.aet.ski'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',  // Sanity CMS
          '/admin/',   // Admin sections
          '/test-*',   // Test pages
          '/api/',     // API routes
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
