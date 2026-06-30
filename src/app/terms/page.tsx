import type { Metadata } from 'next';
import TermsPageClient from './TermsPageClient';
import { getPublishedTerms } from '@/lib/terms';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for Alps en route Transfers services.',
  alternates: {
    canonical: '/terms',
  },
};

export default async function TermsPage() {
  const termsData = await getPublishedTerms();

  return <TermsPageClient termsData={termsData} />;
}
