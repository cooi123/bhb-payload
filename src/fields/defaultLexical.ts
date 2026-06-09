import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  HorizontalRuleFeature,
  TextStateFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    IndentFeature(),
    HorizontalRuleFeature(),
    TextStateFeature({
      state: {
        fontFamily: {
          montserrat: {
            label: 'Montserrat',
            css: { 'font-family': 'Montserrat, sans-serif' },
          },
          playfair: {
            label: 'Playfair Display',
            css: { 'font-family': '"Playfair Display", serif' },
          },
          lato: {
            label: 'Lato',
            css: { 'font-family': 'Lato, sans-serif' },
          },
          'open-sans': {
            label: 'Open Sans',
            css: { 'font-family': '"Open Sans", sans-serif' },
          },
          merriweather: {
            label: 'Merriweather',
            css: { 'font-family': 'Merriweather, serif' },
          },
          georgia: {
            label: 'Georgia',
            css: { 'font-family': 'Georgia, serif' },
          },
          arial: {
            label: 'Arial',
            css: { 'font-family': 'Arial, sans-serif' },
          },
          'courier-new': {
            label: 'Courier New',
            css: { 'font-family': '"Courier New", monospace' },
          },
        },
        paragraphStyle: {
          p1: {
            label: 'Paragraph 1 — Large',
            css: { 'font-size': '1.25rem', 'line-height': '1.875rem' },
          },
          p2: {
            label: 'Paragraph 2 — Medium',
            css: { 'font-size': '1.125rem', 'line-height': '1.75rem' },
          },
          p3: {
            label: 'Paragraph 3 — Body',
            css: { 'font-size': '1rem', 'line-height': '1.625rem' },
          },
          p4: {
            label: 'Paragraph 4 — Caption',
            css: { 'font-size': '0.875rem', 'line-height': '1.375rem' },
          },
        },
      },
    }),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
