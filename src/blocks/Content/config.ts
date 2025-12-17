import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
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
    label: false,
  },
  {
    name: 'textAlign',
    type: 'select',
    defaultValue: 'left',
    options: [
      {
        label: 'Left',
        value: 'left',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'right',
      },
    ],
    admin: {
      condition: (_data, siblingData) => {
        return Boolean(siblingData?.richText)
      },
    },
  },
  {
    name: 'blockAlign',
    type: 'select',
    defaultValue: 'left',
    options: [
      {
        label: 'Left',
        value: 'left',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'right',
      },
    ],
    admin: {
      condition: (_data, siblingData) => {
        return Boolean(siblingData?.richText)
      },
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'mediaPosition',
    type: 'select',
    defaultValue: 'above',
    options: [
      {
        label: 'Above Text',
        value: 'above',
      },
      {
        label: 'Below Text',
        value: 'below',
      },
    ],
    admin: {
      condition: (_data, siblingData) => {
        return Boolean(siblingData?.media)
      },
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'headingAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.heading)
        },
      },
    },
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
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'propertyTable',
      label: 'Property Table',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Show property table',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'area',
          label: 'Area',
          type: 'text',
          admin: {
            description: 'Displayed as m² unless value already includes units.',
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
        },
        {
          name: 'completionYear',
          label: 'Project completion year',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
        },
        {
          name: 'architect',
          label: 'Architect',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
        },
        {
          name: 'specs',
          label: 'Specs',
          type: 'group',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
          fields: [
            {
              name: 'beds',
              label: 'Beds',
              type: 'number',
              min: 0,
            },
            {
              name: 'baths',
              label: 'Baths',
              type: 'number',
              min: 0,
            },
            {
              name: 'cars',
              label: 'Car spaces',
              type: 'number',
              min: 0,
            },
          ],
        },
        {
          name: 'rows',
          label: 'Custom rows',
          labels: {
            singular: 'Row',
            plural: 'Rows',
          },
          type: 'array',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
            description: 'When rows are provided, they are rendered as-is.',
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              label: 'Value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
