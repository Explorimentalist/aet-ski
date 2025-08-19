// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/types';

// Sanity configuration - hardcoded for managed studio compatibility
const projectId = 'hns0qja9';
const dataset = 'production';
const apiVersion = '2025-01-29';
const useCdn = process.env.NODE_ENV === 'production';
const token = process.env.SANITY_API_TOKEN;

// Flag to check if Sanity is properly configured
export const isSanityConfigured = Boolean(projectId);

// Create Sanity client only if projectId is available
export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
}) : null;

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

// Image URL builder with null check
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImage) {
  if (!builder) {
    // Return a placeholder or fallback URL when Sanity is not configured
    return { url: () => '/placeholder-image.jpg' };
  }
  return builder.image(source).auto('format').fit('max');
} 

// Fetch helpers with fallbacks
export async function fetchTestimonials() {
  if (!sanityClient) {
    console.warn('Sanity not configured, returning empty testimonials array');
    return [];
  }
  
  try {
    const results = await sanityClient.fetch(testimonialsQuery);
    return (results || []).map((doc: { _id: string; author: string; rating: number; content: string; date: string; route?: string }) => ({
      id: doc._id,
      author: doc.author,
      rating: doc.rating,
      content: doc.content,
      date: doc.date,
      route: doc.route,
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchLinksByCategory(category: string) {
  if (!sanityClient) {
    console.warn('Sanity not configured, returning empty links array for category:', category);
    return [];
  }

  try {
    const query = linksByCategoryQuery(category);
    const results = await sanityClient.fetch(query);
    return (results || []).map((doc: { _id: string; name: string; url: string; logo?: string; description?: string }) => ({
      id: doc._id,
      companyName: doc.name,
      url: doc.url,
      logo: doc.logo,
      description: doc.description,
    }));
  } catch (error) {
    console.error('Error fetching links for category:', category, error);
    return [];
  }
}