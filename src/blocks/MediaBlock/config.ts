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
        { label: 'Masonry', value: 'masonry' },
      ],
    },
    {
      name: 'masonryOrientation',
      label: 'Masonry Direction',
      type: 'select',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical (Pinterest-style columns)', value: 'vertical' },
        { label: 'Horizontal (justified rows)', value: 'horizontal' },
      ],
      admin: {
        description:
          'Vertical flows images top-to-bottom in columns. Horizontal fills rows with images at equal height.',
        condition: (_, siblingData) => siblingData?.layout === 'masonry',
      },
    },
    {
      name: 'columns',
      label: 'Columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns for grid or masonry layout.',
        condition: (_, siblingData) =>
          siblingData?.layout === 'grid' || siblingData?.layout === 'masonry',
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
        condition: (_, siblingData) =>
          siblingData?.layout === 'grid' || siblingData?.layout === 'flex',
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
          name: 'orientation',
          label: 'Display orientation',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (use image dimensions)', value: 'auto' },
            { label: 'Force landscape', value: 'horizontal' },
            { label: 'Force portrait', value: 'vertical' },
          ],
          admin: {
            description: 'Override the natural crop for this image. Only affects masonry and variable row layouts.',
          },
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
