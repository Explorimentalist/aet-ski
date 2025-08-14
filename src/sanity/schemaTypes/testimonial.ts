// src/sanity/schemaTypes/testimonial.ts
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
      description: 'Name of the person providing the testimonial',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      description: 'Star rating from 1 to 5',
      initialValue: 5,
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: (rule) => rule.required().min(10).max(500),
      description: 'The testimonial text describing the quality of service',
      rows: 4,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Date when the testimonial was received',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'route',
      title: 'Related Route',
      type: 'string',
      description: 'Optional: Which route/service this testimonial relates to',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'content',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} ${stars}`,
        subtitle: subtitle ? `${subtitle.substring(0, 80)}...` : 'No content',
      }
    },
  },
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Rating (highest first)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})
