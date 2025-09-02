import { type SchemaTypeDefinition } from 'sanity'
import { testimonialType } from './testimonial'
import { linkType } from './link'
import { termsType } from './terms'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonialType, linkType, termsType],
}
