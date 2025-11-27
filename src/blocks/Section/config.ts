import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const SectionBlock: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  labels: {
    plural: 'Sections',
    singular: 'Section',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    link({
      overrides: {
        name: 'buttonLink',
        label: 'Button Link',
      },
    }),
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Custom', value: 'custom' },
      ],
      required: true,
    },
    {
      name: 'customBackgroundColor',
      type: 'text',
      admin: {
        condition: (_, { backgroundColor }) => backgroundColor === 'custom',
        description: 'Provide any valid CSS color value (e.g. #E4E4E7).',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaLayout',
      type: 'select',
      defaultValue: 'imageLeft',
      options: [
        { label: 'Image on the left', value: 'imageLeft' },
        { label: 'Image on the right', value: 'imageRight' },
        { label: 'Image full height', value: 'imageFill' },
      ],
      required: true,
    },
    {
      name: 'contentPosition',
      type: 'select',
      label: 'Content Position',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, { mediaLayout }) => mediaLayout === 'imageFill',
        description: 'Position of content when using full height image layout.',
      },
      required: true,
    },
    {
      name: 'sectionHeight',
      type: 'select',
      label: 'Section Height',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full', value: 'full' },
      ],
      admin: {
        description: 'Controls the minimum height of the media/content container. Full uses the natural image height.',
      },
      required: true,
    },
  ],
}
