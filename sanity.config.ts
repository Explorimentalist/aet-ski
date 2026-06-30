'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'hns0qja9',
  dataset: 'production',
  apiVersion: '2025-01-29',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: (previousActions, context) =>
      context.schemaType === 'terms'
        ? previousActions.filter(
            ({action}) => !['delete', 'duplicate', 'unpublish'].includes(action ?? ''),
          )
        : previousActions,
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter(({templateId}) => templateId !== 'terms'),
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: '2025-01-29'}),
  ],
})
