import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'hns0qja9',
  dataset: 'production',
  apiVersion: '2025-01-29',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_TOKEN, // Add API token for authentication
})
