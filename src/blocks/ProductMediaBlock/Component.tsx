import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'

import type { Media as MediaType, Page, Post } from '@/payload-types'

import { Media } from '../../components/Media'

type ProductItem = {
  media?: MediaType | number | string | null
  title?: string | null
  comingSoon?: boolean | null
  link?: {
    type?: 'custom' | 'reference' | null
    url?: string | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: Page | Post | string | number
    } | null
  } | null
}

type Props = {
  columns?: '2' | '3' | '4' | null
  galleryAspectRatio?: '1:1' | '3:2' | '4:3' | '16:9' | null
  products?: ProductItem[]
  className?: string
  enableGutter?: boolean
  imgClassName?: string
}

export const ProductMediaBlock: React.FC<Props> = (props) => {
  const {
    className,
    columns = '3',
    galleryAspectRatio = '3:2',
    enableGutter = true,
    imgClassName,
    products,
  } = props

  const aspectRatioValue = React.useMemo(() => {
    if (!galleryAspectRatio) return undefined
    const [w, h] = galleryAspectRatio.split(':').map(Number)
    if (!w || !h) return undefined
    return `${w} / ${h}`
  }, [galleryAspectRatio])

  const columnClass =
    (columns &&
      {
        '2': 'lg:grid-cols-2',
        '3': 'lg:grid-cols-3',
        '4': 'lg:grid-cols-4',
      }[columns]) ||
    'lg:grid-cols-3'

  if (!Array.isArray(products) || products.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 py-16', columnClass)}>
        {products.map((item, index) => {
          if (!item?.media) return null

          // Calculate href from link
          const href =
            item.link?.type === 'reference' &&
            typeof item.link?.reference?.value === 'object' &&
            item.link.reference.value.slug
              ? `${item.link.reference.relationTo !== 'pages' ? `/${item.link.reference.relationTo}` : ''}/${
                  item.link.reference.value.slug
                }`
              : item.link?.url

          const newTabProps = item.link?.newTab
            ? { rel: 'noopener noreferrer', target: '_blank' }
            : {}

          const hasLink = Boolean(href) && !item.comingSoon
          const isComingSoon = item.comingSoon === true

          return (
            <div key={index}>
              <div
                className={cn(
                  'relative overflow-hidden group',
                  hasLink && 'cursor-pointer',
                  !isComingSoon && 'hover:scale-105 transition-all duration-300',
                  isComingSoon && 'opacity-75',
                )}
                style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : undefined}
              >
                <Media
                  resource={item.media}
                  fill
                  pictureClassName="block h-full w-full"
                  imgClassName={cn(
                    'object-cover transition-all duration-300',
                    isComingSoon ? 'grayscale' : 'group-hover:scale-110',
                    imgClassName,
                  )}
                  size="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Gray overlay for coming soon, black overlay on hover for available */}
                <div
                  className={cn(
                    'absolute inset-0 transition-all duration-300 pointer-events-none',
                    isComingSoon
                      ? 'bg-gray-900/50'
                      : 'bg-black/20 group-hover:bg-black/40',
                  )}
                />
                {/* Product title overlay */}
                {item.title && (
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 pointer-events-none',
                      isComingSoon ? 'bg-black/30' : 'bg-black/0 group-hover:bg-black/40',
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-medium text-white text-2xl">{item.title}</span>
                      {isComingSoon ? (
                        <span className="text-white/90 text-sm font-semibold uppercase tracking-wider">
                          Coming Soon
                        </span>
                      ) : (
                        hasLink && (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm">
                            Learn more →
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
                {/* Clickable link overlay - only if not coming soon */}
                {hasLink && href && (
                  <Link
                    href={href}
                    className="absolute inset-0 z-10"
                    {...newTabProps}
                    aria-label={item.title || 'View product'}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

