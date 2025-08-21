// src/app/page.tsx
import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Private Airport Transfers to French Alps Ski Resorts',
  description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to Val d\'Isère, Courchevel, Val Thorens & all French Alps ski resorts. 15+ years experience.',
  keywords: [
    'private airport transfer French Alps',
    'Geneva to Val d\'Isère transfer',
    'Lyon to Courchevel transfer', 
    'ski resort transfers',
    'French Alps private transport',
    'airport transfer Tignes Val Thorens',
    'VIP ski transfer French Alps',
    'luxury airport to ski resort taxi France',
    'family ski transfer Grenoble airport',
    'door-to-door airport ski transfer service',
    'ski equipment friendly private transfer',
    'Christmas ski transfer Geneva Val d\'Isère',
    'winter ski holiday transfer Lyon airport',
    'last-minute airport ski transfers Alps',
    'price private transfer Geneva to Tignes',
    'book private ski transfer to Courchevel',
    'best transfer rates to Val Thorens ski resort',
  ].join(', '),
  alternates: {
    canonical: 'https://www.aet.ski',
  },
  openGraph: {
    title: 'Private Airport Transfers to French Alps Ski Resorts',
    description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to French Alps ski resorts.',
    url: 'https://www.aet.ski',
  },
}

export default function Page() {
  return <HomePageClient />
}
