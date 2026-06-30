import type { TermsData, TermsSection } from '@/types/terms';
import { client } from '@/sanity/lib/client';

export const TERMS_DOCUMENT_ID = 'terms';

export const publishedTermsQuery = `
  *[_type == "terms" && _id == $documentId][0] {
    _id,
    title,
    "_updatedAt": _updatedAt,
    version,
    sections[] {
      "id": id.current,
      number,
      title,
      content,
      isActive
    }
  }
`;

interface RawTermsDocument {
  _id?: unknown;
  title?: unknown;
  _updatedAt?: unknown;
  version?: unknown;
  sections?: unknown;
}

function isTermsSection(value: unknown): value is TermsSection {
  if (!value || typeof value !== 'object') return false;

  const section = value as Partial<TermsSection>;
  return (
    typeof section.id === 'string' &&
    section.id.length > 0 &&
    typeof section.number === 'number' &&
    Number.isInteger(section.number) &&
    typeof section.title === 'string' &&
    section.title.length > 0 &&
    typeof section.content === 'string' &&
    section.content.length > 0 &&
    typeof section.isActive === 'boolean'
  );
}

export function parseTermsDocument(document: RawTermsDocument | null): TermsData {
  if (!document) {
    throw new Error(`Published Sanity document "${TERMS_DOCUMENT_ID}" was not found.`);
  }

  if (
    document._id !== TERMS_DOCUMENT_ID ||
    typeof document.title !== 'string' ||
    typeof document._updatedAt !== 'string' ||
    typeof document.version !== 'string' ||
    !Array.isArray(document.sections)
  ) {
    throw new Error('The published Terms and Conditions document is incomplete.');
  }

  const sections = document.sections.filter(isTermsSection);
  if (sections.length !== document.sections.length || !sections.some((section) => section.isActive)) {
    throw new Error('The published Terms and Conditions document has invalid or no active sections.');
  }

  const seenIds = new Set<string>();
  const normalizedSections = sections
    .sort((left, right) => left.number - right.number)
    .map((section) => {
      const id = seenIds.has(section.id) ? `${section.id}-${section.number}` : section.id;
      seenIds.add(id);
      return { ...section, id };
    });

  return {
    _id: document._id,
    title: document.title.trim(),
    lastUpdated: document._updatedAt,
    version: document.version,
    sections: normalizedSections,
  };
}

export async function getPublishedTerms(): Promise<TermsData> {
  const document = await client.withConfig({
    useCdn: false,
    perspective: 'published',
  }).fetch<RawTermsDocument | null>(
    publishedTermsQuery,
    { documentId: TERMS_DOCUMENT_ID },
    { cache: 'no-store' },
  );

  return parseTermsDocument(document);
}
