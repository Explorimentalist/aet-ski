// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/types';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-29',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

// Query helpers
export const routesQuery = `
  *[_type == "route"] {
    _id,
    name,
    from,
    to,
    distance,
    duration,
    price,
    description,
    "imageUrl": image.asset->url,
    coordinates
  }
`;

export const testimonialsQuery = `
  *[_type == "testimonial"] {
    _id,
    author,
    rating,
    content,
    date,
    route->name
  } | order(date desc)
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    contact {
      email,
      phone,
      address
    }
  }
`;

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source).auto('format').fit('max');
} 