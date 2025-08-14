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
  *[_type == "testimonial"] | order(date desc) {
    _id,
    author,
    rating,
    content,
    date,
    route
  }
`;

// Links by category
export const linksByCategoryQuery = (category: string) => `
  *[_type == "link" && category == "${category}"] | order(name asc) {
    _id,
    name,
    url,
    // "logo" can be a Cloudinary public ID or full URL
    logo,
    description
  }
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

// Fetch helpers
export async function fetchTestimonials() {
  const results = await sanityClient.fetch(testimonialsQuery);
  return (results || []).map((doc: { _id: string; author: string; rating: number; content: string; date: string; route?: string }) => ({
    id: doc._id,
    author: doc.author,
    rating: doc.rating,
    content: doc.content,
    date: doc.date,
    route: doc.route,
  }));
}

export async function fetchLinksByCategory(category: string) {
  const query = linksByCategoryQuery(category);
  const results = await sanityClient.fetch(query);
  return (results || []).map((doc: { _id: string; name: string; url: string; logo?: string; description?: string }) => ({
    id: doc._id,
    companyName: doc.name,
    url: doc.url,
    logo: doc.logo,
    description: doc.description,
  }));
}