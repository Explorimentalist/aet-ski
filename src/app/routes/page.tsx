// src/app/routes/page.tsx
import { Metadata } from 'next'
import RoutesPageClient from './RoutesPageClient'

export const metadata: Metadata = {
  title: 'Airport Transfer Routes to French Alps | Geneva, Lyon, Grenoble Comparison',
  description: 'Compare airport transfer routes from Geneva, Lyon, Chambéry & Grenoble to French Alps ski resorts. Distances, transfer times, costs & route recommendations.',
  keywords: [
    'Geneva airport ski transfer routes',
    'Lyon to French Alps distance',  
    'Grenoble airport transfer routes',
    'Chambéry ski resort transfers',
    'airport comparison French Alps',
    'Geneva to Val d\'Isère route',
    'Lyon to Courchevel distance',
    'Grenoble to Tignes transfer',
    'Chambéry to Meribel route',
    'French Alps airport transfer guide',
  ].join(', '),
  alternates: {
    canonical: 'https://www.aet.ski/routes',
  },
  openGraph: {
    title: 'Airport Transfer Routes to French Alps Ski Resorts',
    description: 'Compare transfer routes from Geneva, Lyon, Chambéry & Grenoble airports to ski resorts.',
    url: 'https://www.aet.ski/routes',
  },
}

export default function Page() {
  return <RoutesPageClient />
} 