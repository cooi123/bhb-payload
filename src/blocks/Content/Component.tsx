import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'
import PropertyTable, { type PropertyTableProps } from '@/components/Table'

const backgroundBackgroundClasses: Record<'primary' | 'secondary', string> = {
  primary: 'bg-background text-black',
  secondary: 'bg-secondary text-black',
}

type PropertyTableField = {
  enabled?: boolean | null
  area?: PropertyTableProps['area']
  completionYear?: PropertyTableProps['completionYear']
  architect?: PropertyTableProps['architect']
  specs?: PropertyTableProps['specs']
  rows?: Array<{
    label?: string | null
    value?: string | null
  }>
} | null

type ContentBlockPropsWithTable = ContentBlockProps & { propertyTable?: PropertyTableField }

export const ContentBlock: React.FC<ContentBlockPropsWithTable> = (props) => {
  const { 
    columns, 
    heading, 
    headingAlign = 'left',
    backgroundColor = 'primary',
    customBackgroundColor,
    propertyTable,
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

  const tableProps: PropertyTableProps | null =
    propertyTable && propertyTable.enabled
      ? {
          area: propertyTable.area ?? undefined,
          architect: propertyTable.architect ?? undefined,
          completionYear: propertyTable.completionYear ?? undefined,
          specs: propertyTable.specs
            ? {
                baths: propertyTable.specs.baths ?? undefined,
                beds: propertyTable.specs.beds ?? undefined,
                cars: propertyTable.specs.cars ?? undefined,
              }
            : undefined,
          rows:
            propertyTable.rows && propertyTable.rows.length > 0
              ? propertyTable.rows
                  .filter((row) => row.label && row.value)
                  .map((row) => ({
                    label: row.label as string,
                    value: row.value as string,
                  }))
              : undefined,
        }
      : null

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
                      <Media resource={media} />
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

          {tableProps && (
            <div className="col-span-4 lg:col-span-12">
              <PropertyTable {...tableProps} className='bg-background border-none' />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
