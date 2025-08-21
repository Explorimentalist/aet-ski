import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';

const geist = Geist({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aet.ski'),
  title: {
    default: 'Private Airport Transfers to French Alps Ski Resorts | AET',
    template: '%s | AET Ski Transfers',
  },
  description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to Val d\'Isère, Courchevel, Val Thorens & all French Alps ski resorts. 15+ years experience.',
  keywords: [
    'private airport transfer French Alps',
    'Geneva to Val d\'Isère transfer', 
    'ski resort transfers',
    'airport shuttle French Alps',
    'Courchevel private transfer',
    'Val Thorens airport transfer',
    'Lyon airport ski transfer',
    'Grenoble airport transfer',
    'Chambéry ski shuttle',
    'Les 3 Vallées transfer',
    'Espace Killy transport',
    'Paradiski transfers',
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
  authors: [{ name: 'AET - Alps en route Transfers' }],
  creator: 'AET Ski Transfers',
  publisher: 'AET - Alps en route Transfers',
  robots: 'index, follow',
  openGraph: {
    title: 'Private Airport Transfers to French Alps Ski Resorts | AET',
    description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to French Alps ski resorts. 15+ years experience.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.aet.ski',
    siteName: 'AET Ski Transfers',
    images: [
      {
        url: '/og-image.jpg', // TODO: Create this image
        width: 1200,
        height: 630,
        alt: 'AET Ski Transfers - Premium Airport Transfers to French Alps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aet_ski', // TODO: Add your Twitter handle
    creator: '@aet_ski',
    title: 'Private Airport Transfers to French Alps Ski Resorts | AET',
    description: 'Premium private transfers from Geneva, Lyon, Chambéry & Grenoble airports to French Alps ski resorts.',
    images: ['/twitter-image.jpg'], // TODO: Create this image
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.aet.ski',
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Add your Google Search Console verification
    // bing: 'your-bing-verification-code', // TODO: Add Bing verification if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
        {/* TODO: Add Google Analytics when you have the tracking ID */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
          `}
        </Script> */}
      </head>
      <body className={`${geist.className} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-background-primary">
          {children}
        </div>
      </body>
    </html>
  );
}
