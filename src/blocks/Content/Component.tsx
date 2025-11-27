import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'

const backgroundBackgroundClasses: Record<'primary' | 'secondary', string> = {
  primary: 'bg-background text-black',
  secondary: 'bg-secondary text-black',
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { 
    columns, 
    heading, 
    headingAlign = 'left',
    backgroundColor = 'primary',
    customBackgroundColor,
  } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const headingAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const backgroundClasses =
    backgroundColor === 'custom'
      ? 'text-foreground bg-card'
      : cn(
          'text-foreground',
          backgroundBackgroundClasses[backgroundColor as 'primary' | 'secondary'],
        )

  const backgroundStyle =
    backgroundColor === 'custom' && customBackgroundColor
      ? { backgroundColor: customBackgroundColor }
      : undefined

  return (
    <div className={cn(backgroundClasses)} style={backgroundStyle}>
      <div className="container py-16">
        {heading && (
          <h2
            className={cn(
              'text-4xl text-primary mb-8 break-words',
              headingAlignClasses[headingAlign as keyof typeof headingAlignClasses]
            )}
          >
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
      
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, media, mediaPosition = 'above', richText, size, textAlign = 'left' } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {media && mediaPosition === 'above' && (
                  <div className="mb-6">
                    <Media
                      resource={media}
                    />
                  </div>
                )}

                {richText && (
                  <div className="break-words">
                    <RichText 
                      data={richText} 
                      enableGutter={false} 
                      align={textAlign as 'left' | 'center' | 'right'} 
                    />
                  </div>
                )}

                {media && mediaPosition === 'below' && (
                  <div className="mt-6"> 
                    <Media
                      resource={media}
                      imgClassName="border border-border rounded-[0.8rem]"
                    />
                  </div>
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
