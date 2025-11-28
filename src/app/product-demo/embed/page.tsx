import { Metadata } from 'next';
import ProductDemoPageClient from '../ProductDemoPageClient';

export const metadata: Metadata = {
  title: 'Product Demo Embed | AET Ski Transfers',
  description: 'Embeddable product demo experience for AET Ski Transfers.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductDemoEmbedPage() {
  return <ProductDemoPageClient />;
}
