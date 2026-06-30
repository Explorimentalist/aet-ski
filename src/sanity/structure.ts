import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Terms and Conditions')
        .icon(() => '📋')
        .child(
          S.document()
            .schemaType('terms')
            .documentId('terms')
            .title('Terms and Conditions'),
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'terms'),
    ])
