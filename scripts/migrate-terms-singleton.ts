import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hns0qja9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-29',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const singletonId = 'terms'

interface TermsDocument {
  _id: string
  _type: 'terms'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title: string
  sections: Array<{
    _key?: string
    _type?: string
    id: {current: string; _type?: string}
    number: number
    title: string
    content: string
    isActive: boolean
  }>
  version: string
  notes?: string
}

function normalizeSectionIds(sections: TermsDocument['sections']) {
  const usedIds = new Set<string>()

  return sections.map((section) => {
    const baseId = section.id.current
    const id = usedIds.has(baseId) ? `${baseId}-${section.number}` : baseId
    usedIds.add(id)

    return {
      ...section,
      id: {...section.id, current: id},
    }
  })
}

async function migrateTermsSingleton() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN is required to migrate the Terms document.')
  }

  const documents = await client.fetch<TermsDocument[]>(
    '*[_type == "terms" && !(_id in path("drafts.**"))] | order(_updatedAt desc)',
  )
  const existingSingleton = documents.find(({_id}) => _id === singletonId)

  if (existingSingleton) {
    console.log(`Terms singleton already exists (${existingSingleton._updatedAt}).`)
    return
  }

  const source = documents[0]
  if (!source) {
    throw new Error('No published Terms and Conditions document was found to migrate.')
  }

  const {_createdAt, _updatedAt, _rev, _id, ...content} = source
  await client.createOrReplace({
    ...content,
    _id: singletonId,
    _type: 'terms',
    sections: normalizeSectionIds(source.sections),
  })

  console.log(`Migrated Terms document ${_id} to singleton "${singletonId}".`)
}

migrateTermsSingleton().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
