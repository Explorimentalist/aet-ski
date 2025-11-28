// src/app/product-demo/page.tsx
import { Metadata } from 'next';
import ProductDemoPageClient from './ProductDemoPageClient';

export const metadata: Metadata = {
  title: 'Product Demo | AET Ski Transfers',
  description: 'Explore the full multi-step booking experience with live animations and launch the quote form when you are ready.',
};

export default function ProductDemoPage() {
  return <ProductDemoPageClient />;
}
