import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React from 'react'

import RichText from '@/components/RichText'

type TextBoxBlockProps = {
  blockType?: 'textBox'
  heading?: string | null
  textAlign?: 'left' | 'center' | 'right' | null
  content: DefaultTypedEditorState
}

export const TextBoxBlock: React.FC<TextBoxBlockProps> = ({ heading, textAlign, content }) => {
  const align = textAlign || 'left'
  return (
    <section className="bg-card py-8 md:py-10">
      <div className="px-6 md:px-10 lg:px-14 xl:px-20">
        {heading && (
          <h2
            className={`section-heading text-primary mb-6 ${
              align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
            }`}
          >
            {heading}
          </h2>
        )}
        <RichText data={content} align={align} enableGutter={false} className="max-w-none" />
      </div>
    </section>
  )
}
