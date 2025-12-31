import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ProductMediaBlock: Block = {
  slug: 'productMediaBlock',
  dbName: 'prod_media',
  interfaceName: 'ProductMediaBlock',
  fields: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'select',
      dbName: 'cols',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
      admin: {
        description: 'Use 3 columns for a classic gallery view.',
      },
    },
    {
      name: 'galleryAspectRatio',
      label: 'Image Aspect Ratio',
      type: 'select',
      dbName: 'aspect',
      defaultValue: '3:2',
      options: [
        { label: 'Square (1:1)', value: '1:1' },
        { label: 'Classic (4:3)', value: '4:3' },
        { label: 'Standard (3:2)', value: '3:2' },
        { label: 'Landscape (16:9)', value: '16:9' },
      ],
    },
    {
      name: 'products',
      label: 'Products',
      type: 'array',
      dbName: 'items',
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: 'Add product items to showcase.',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          label: 'Product Title',
          type: 'text',
          required: true,
        },
        {
          name: 'comingSoon',
          label: 'Coming Soon',
          type: 'checkbox',
          defaultValue: false,
        },
        link({ disableLabel: true, appearances: false }),
      ],
    },
  ],
}

