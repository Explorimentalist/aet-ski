jest.mock('@/sanity/lib/client', () => ({client: {}}));

import { parseTermsDocument, TERMS_DOCUMENT_ID } from './terms';

const validDocument = {
  _id: TERMS_DOCUMENT_ID,
  title: 'Terms and conditions ',
  _updatedAt: '2026-06-24T12:55:13Z',
  version: '1.0',
  sections: [
    {
      id: 'bookings',
      number: 2,
      title: 'Bookings',
      content: 'Published booking terms.',
    },
    {
      id: 'definitions',
      number: 1,
      title: 'Definitions',
      content: 'Published definitions.',
    },
  ],
};

describe('parseTermsDocument', () => {
  it('validates, trims, and orders published Sanity content', () => {
    const terms = parseTermsDocument(validDocument);

    expect(terms.title).toBe('Terms and conditions');
    expect(terms.lastUpdated).toBe(validDocument._updatedAt);
    expect(terms.sections.map((section) => section.number)).toEqual([1, 2]);
  });

  it('makes duplicate section slugs safe for navigation anchors', () => {
    const terms = parseTermsDocument({
      ...validDocument,
      sections: [
        validDocument.sections[0],
        { ...validDocument.sections[1], id: 'bookings', number: 3 },
      ],
    });

    expect(terms.sections.map((section) => section.id)).toEqual(['bookings', 'bookings-3']);
  });

  it('fails closed instead of displaying stale legal fallback text', () => {
    expect(() => parseTermsDocument(null)).toThrow('was not found');
    expect(() =>
      parseTermsDocument({
        ...validDocument,
        sections: [],
      }),
    ).toThrow('invalid or no sections');
  });
});
