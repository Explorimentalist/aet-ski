import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import '@/styles/globals.css';

const geist = Geist({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AET - Alpine Airport Transfers',
  description: 'Reliable airport transfers to the French Alps. More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski.',
  keywords: 'airport transfers, French Alps, ski transfers, Geneva airport, Lyon airport, Chambery airport, Grenoble airport',
  authors: [{ name: 'AET - Alps en route Transfers' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AET - Alpine Airport Transfers',
    description: 'Reliable airport transfers to the French Alps',
    type: 'website',
    locale: 'en_GB',
    siteName: 'AET Ski',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AET - Alpine Airport Transfers',
    description: 'Reliable airport transfers to the French Alps',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Custom fonts temporarily disabled - using system fonts */}
      </head>
      <body className={`${geist.className} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-background-primary">
          {children}
        </div>
      </body>
    </html>
  );
}
