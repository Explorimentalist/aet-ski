// src/sanity/schemaTypes/link.ts
import { defineField, defineType } from 'sanity'

// Categories from the travel-info page
const linkCategories = [
  'Airlines',
  'Resorts', 
  'Trains',
  'Chalet accommodation',
  'Self-catered Accommodation',
  'Weather',
  'Ski Schools',
  'Ski hire',
  'Aches and pains',
  'Life in resort info',
  'Self catering',
]

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'document',
  icon: () => '🔗',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
      description: 'Name of the service or company',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (rule) => rule.required().uri({
        scheme: ['http', 'https'],
      }),
      description: 'Full website URL (must start with https:// or http://)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Cloudinary public ID (e.g., "british-airways") or full SVG URL',
      placeholder: 'e.g., british-airways or https://example.com/logo.svg',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.max(1000),
      description: 'Optional description of the service',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: linkCategories.map(cat => ({ title: cat, value: cat })),
        layout: 'dropdown',
      },
      description: 'Which section this link appears in on the travel info page',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Optional: Custom sort order within category (lower numbers appear first)',
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      description: 'description',
      url: 'url',
    },
    prepare(selection) {
      const { title, subtitle, url } = selection
      const domain = url ? new URL(url).hostname : ''
      return {
        title: title,
        subtitle: `${subtitle} • ${domain}`,
        media: () => '🔗',
      }
    },
  },
  orderings: [
    {
      title: 'Category, then Name',
      name: 'categoryName',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
