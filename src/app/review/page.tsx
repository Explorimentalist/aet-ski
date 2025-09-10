// src/app/review/page.tsx
import { Metadata } from 'next'
import ReviewPageClient from './ReviewPageClient'

export const metadata: Metadata = {
  title: 'Leave a Review | AET Ski Transfers',
  description: 'Share your experience with AET private airport transfers to and from the French Alps. Your feedback helps us improve our service.',
  keywords: [
    'AET reviews',
    'leave a review',
    'ski transfer feedback',
    'French Alps transfer review',
    'Geneva airport transfer review',
  ].join(', '),
  alternates: {
    canonical: 'https://www.aet.ski/review',
  },
  openGraph: {
    title: 'Leave a Review | AET Ski Transfers',
    description: 'Tell us how your transfer went and help others choose AET with confidence.',
    url: 'https://www.aet.ski/review',
  },
}

export default function Page() {
  return <ReviewPageClient />
}

