// src/app/contact/page.tsx
import { Metadata } from 'next'
import { Suspense } from 'react'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact AET | Book Your French Alps Airport Transfer',
  description: 'Get in touch with AET for private airport transfers to French Alps ski resorts. Book your transfer from Geneva, Lyon, Chambéry or Grenoble.',
  keywords: [
    'book airport transfer French Alps',
    'AET contact',
    'private transfer booking',
    'ski transfer quotes',
    'book private ski transfer to Courchevel',
    'best transfer rates to Val Thorens ski resort',
    'contact AET ski transfers',
    'French Alps transfer booking',
  ].join(', '),
  alternates: {
    canonical: 'https://www.aet.ski/contact',
  },
  openGraph: {
    title: 'Contact AET | Book Your French Alps Airport Transfer',
    description: 'Get in touch with AET for private airport transfers to French Alps ski resorts.',
    url: 'https://www.aet.ski/contact',
  },
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageClient />
    </Suspense>
  )
} 