// src/app/routes/geneva-to-val-disere/page.tsx
import { Metadata } from 'next'
import GenevaToValDisereClient from './GenevaToValDisereClient'

export const metadata: Metadata = {
  title: 'Private Transfer from Geneva to Val d\'Isère | AET Ski Transfers',
  description: 'Book your premium private transfer from Geneva Airport to Val d\'Isère ski resort. Door-to-door service, professional drivers, 24/7 availability. Get a quote today!',
  keywords: [
    'private transfer Geneva to Val d\'Isère',
    'Geneva airport ski transfer Val d\'Isère',
    'door-to-door airport transfer Val d\'Isère',
    'Geneva to Val d\'Isère taxi',
    'price private transfer Geneva to Val d\'Isère',
    'Val d\'Isère airport transfer Geneva',
    'ski transfer Geneva Val d\'Isère',
    'private taxi Geneva airport to Val d\'Isère',
  ].join(', '),
  alternates: {
    canonical: 'https://www.aet.ski/routes/geneva-to-val-disere',
  },
  openGraph: {
    title: 'Private Transfer from Geneva to Val d\'Isère | AET Ski Transfers',
    description: 'Premium private transfer from Geneva Airport to Val d\'Isère ski resort. Professional service, door-to-door, family-friendly.',
    url: 'https://www.aet.ski/routes/geneva-to-val-disere',
  },
}

export default function GenevaToValDisere() {
  return <GenevaToValDisereClient />
}
