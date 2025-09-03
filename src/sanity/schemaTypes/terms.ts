// src/sanity/schemaTypes/terms.ts
import { defineField, defineType } from 'sanity'

export const termsType = defineType({
  name: 'terms',
  title: 'Terms and Conditions',
  type: 'document',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The main title displayed on the terms page',
      initialValue: 'Terms and conditions',
    }),
    defineField({
      name: 'sections',
      title: 'Terms Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Section ID',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 50,
              },
              validation: (rule) => rule.required(),
              description: 'URL-friendly identifier (auto-generated from title)',
            },
            {
              name: 'number',
              title: 'Section Number',
              type: 'number',
              validation: (rule) => rule.required().positive().integer(),
              description: 'The section number (1, 2, 3, etc.)',
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (rule) => rule.required().min(3).max(200),
              description: 'The title of this section',
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'text',
              validation: (rule) => rule.required().min(10),
              description: 'The full content of this section',
              rows: 10,
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Whether this section should be displayed on the website',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'title',
              number: 'number',
              content: 'content',
              isActive: 'isActive',
            },
            prepare(selection) {
              const { title, number, content, isActive } = selection
              const status = isActive ? '✅' : '❌'
              return {
                title: `${status} ${number}. ${title}`,
                subtitle: content ? `${content.substring(0, 80)}...` : 'No content',
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
      description: 'All sections of the terms and conditions. Drag to reorder.',
      options: {
        layout: 'grid',
        sortable: true,
      },
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When these terms were last updated',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'Version number of these terms (e.g., "1.0", "2.1")',
      initialValue: '1.0',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about changes (not visible on website)',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
      sectionCount: 'sections',
    },
    prepare(selection) {
      const { title, lastUpdated, sectionCount } = selection
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'No date'
      const activeSections = sectionCount ? sectionCount.filter((s: Record<string, unknown>) => s.isActive).length : 0
      const totalSections = sectionCount ? sectionCount.length : 0
      return {
        title: title || 'Terms and Conditions',
        subtitle: `${activeSections}/${totalSections} sections • Updated: ${date}`,
        media: () => '📋',
      }
    },
  },
  orderings: [
    {
      title: 'Last Updated (newest first)',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
    {
      title: 'Version (newest first)',
      name: 'versionDesc',
      by: [{ field: 'version', direction: 'desc' }],
    },
  ],
})
