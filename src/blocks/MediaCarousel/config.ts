import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const MediaCarouselBlock: Block = {
  slug: 'mediaCarousel',
  interfaceName: 'MediaCarouselBlock',
  labels: {
    singular: 'Media Carousel',
    plural: 'Media Carousels',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'slideAspectRatio',
      label: 'Slide Aspect Ratio',
      type: 'select',
      defaultValue: '16:9',
      required: true,
      options: [
        { label: 'Landscape (16:9)', value: '16:9' },
        { label: 'Classic (4:3)', value: '4:3' },
        { label: 'Square (1:1)', value: '1:1' },
      ],
    },
    {
      name: 'slideSize',
      label: 'Slide Width',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'loopSlides',
      label: 'Loop Slides',
      type: 'checkbox',
      defaultValue: true,
    },
    link({
      overrides: {
        name: 'buttonLink',
        label: 'Bottom Button Link',
        admin: {
          description: 'Optional: display a button beneath the carousel.',
        },
      },
    }),
    {
      name: 'slides',
      label: 'Slides',
      type: 'array',
      minRows: 1,
      required: true,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Supporting Copy',
          type: 'textarea',
        },
        {
          name: 'linkUrl',
          label: 'Slide Link URL',
          type: 'text',
          admin: {
            description: 'Optional: when provided the slide opens this link instead of the media preview.',
          },
        },
      ],
    },
  ],
}
