import { type SchemaTypeDefinition } from 'sanity'
import { testimonialType } from './testimonial'
import { linkType } from './link'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonialType, linkType],
}
