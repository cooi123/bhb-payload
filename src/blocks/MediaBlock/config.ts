import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      defaultValue: 'single',
      options: [
        { label: 'Single media', value: 'single' },
        { label: 'Media grid', value: 'grid' },
        { label: 'Variable width row', value: 'flex' },
      ],
    },
    {
      name: 'columns',
      label: 'Columns (grid only)',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
      admin: {
        description: 'Use 3 columns for a classic gallery view.',
        condition: (_, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'galleryAspectRatio',
      label: 'Grid Image Aspect Ratio',
      type: 'select',
      defaultValue: '3:2',
      options: [
        { label: 'Square (1:1)', value: '1:1' },
        { label: 'Classic (4:3)', value: '4:3' },
        { label: 'Standard (3:2)', value: '3:2' },
        { label: 'Landscape (16:9)', value: '16:9' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.layout !== 'single',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'single',
      },
    },
    {
      name: 'gallery',
      label: 'Gallery Items',
      type: 'array',
      minRows: 3,
      admin: {
        initCollapsed: true,
        description: 'Add multiple media items for the grid layout.',
        condition: (_, siblingData) => siblingData?.layout !== 'single',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Caption (optional)',
          type: 'text',
        },
      ],
    },
  ],
}
