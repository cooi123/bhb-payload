import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',
  interfaceName: 'ContactUsBlock',
  labels: {
    plural: 'Contact Us Blocks',
    singular: 'Contact Us Block',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Got an Idea?',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'Contact Us Today',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'formHeading',
          type: 'text',
          label: 'Form Heading',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'contactInfoHeading',
          type: 'text',
          label: 'Contact Info Heading',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Contact Form',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      required: true,
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Map Embed URL',
      admin: {
        description: 'Paste the Google Maps embed URL here. You can get this by going to Google Maps, clicking Share > Embed a map, and copying the src URL from the iframe code.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
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
      label: 'Custom Background Color',
      admin: {
        condition: (_, { backgroundColor }) => backgroundColor === 'custom',
        description: 'Provide any valid CSS color value (e.g. #E4E4E7).',
      },
    },
  ],
  graphQL: {
    singularName: 'ContactUsBlock',
  },
}

