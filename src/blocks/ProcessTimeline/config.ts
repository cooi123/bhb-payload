import type { Block } from 'payload'

export const ProcessTimelineBlock: Block = {
  slug: 'processTimeline',
  interfaceName: 'ProcessTimelineBlock',
  fields: [
    {
      name: 'phases',
      label: 'Phases',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Phase',
        plural: 'Phases',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'details',
          label: 'Details',
          type: 'array',
          minRows: 1,
          labels: {
            singular: 'Detail',
            plural: 'Details',
          },
          fields: [
            {
              name: 'detail',
              label: 'Detail',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}


