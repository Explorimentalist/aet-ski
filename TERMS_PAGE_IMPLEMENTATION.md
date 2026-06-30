# Terms and Conditions: CMS and Delivery

## Content ownership

The published Terms and Conditions live in the Sanity `production` dataset as one
singleton document:

- Schema type: `terms`
- Document ID: `terms`
- Studio location: `/studio` → **Terms and Conditions**
- Public page: `/terms`

The Studio intentionally removes create, duplicate, delete, and unpublish actions for
this document. Editors update its sections and press **Publish**. There is no second
Terms document to choose from.

## Delivery architecture

`src/app/terms/page.tsx` is a dynamic server-rendered page. On every request it calls
`getPublishedTerms()` in `src/lib/terms.ts`, which:

1. Selects the exact published document with `_id == "terms"`.
2. Bypasses the Sanity CDN.
3. disables the Next.js data cache.
4. validates that all required fields and at least one active section exist.
5. passes the same validated data to the page and browser-side PDF generator.

This means a newly published edit appears on the next `/terms` request and in the PDF
generated from that page. Browser CORS configuration is no longer involved.

The implementation deliberately does not contain fallback legal wording. If current
published content cannot be loaded or is invalid, the route displays an unavailable
state rather than silently serving obsolete contractual terms.

## Why updates previously failed

The old page fetched Sanity directly from the visitor's browser. Sanity rejected both
production origins with `403 CORS Origin not allowed`. The page caught the error and
quietly displayed a hardcoded copy of the Terms. The PDF used that same hardcoded
state, so both surfaces appeared healthy but remained stale.

The old GROQ query also used `*[_type == "terms"][0]`, so creating multiple documents
made the selected document undefined. An editor could publish one document while the
website happened to read another.

## Editing checklist

1. Open `/studio`.
2. Select **Terms and Conditions**.
3. Edit section content, title, ordering, active state, or version.
4. Ensure every Section ID and Section Number is unique.
5. Press **Publish**.
6. Reload `/terms`.
7. Generate the PDF from the page and confirm the same revision is present.

`lastUpdated` comes from Sanity's system `_updatedAt` value; editors do not maintain it.

## Migration and recovery

The idempotent migration command copies the newest legacy Terms document to the
canonical singleton without changing legal wording:

```bash
npm run migrate:terms-singleton
```

It requires `SANITY_API_TOKEN` in `.env.local`. It also normalizes duplicate section
slugs so page navigation anchors remain unique. If the singleton already exists, the
script exits without overwriting it.

## Verification

Run:

```bash
npm test -- --runInBand src/lib/terms.test.ts
npm run build
```

The focused tests cover validation, section ordering, duplicate anchor protection, and
the fail-closed behavior that prevents stale legal fallback content from returning.
