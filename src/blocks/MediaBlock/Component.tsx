import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { Media as MediaType, MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  layout?: 'single' | 'grid' | 'flex'
  columns?: string
  galleryAspectRatio?: '1:1' | '3:2' | '4:3' | '16:9'
  gallery?: {
    media?: MediaType | number | string | null
    caption?: string | null
  }[]
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    layout = 'single',
    gallery,
    columns = '3',
    galleryAspectRatio = '3:2',
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  const aspectRatioValue = React.useMemo(() => {
    const [w, h] = galleryAspectRatio.split(':').map(Number)
    if (!w || !h) return undefined
    return `${w} / ${h}`
  }, [galleryAspectRatio])

  const spanSequence = React.useMemo(
    () =>
      [
        ['lg:col-span-3', 'lg:col-span-3'], // 2-up
        ['lg:col-span-2', 'lg:col-span-4'], // 2-up alt
        ['lg:col-span-4', 'lg:col-span-2'], // 2-up flipped
        ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'], // 3-up even
        ['lg:col-span-1', 'lg:col-span-2', 'lg:col-span-3'], // mixed widths
      ].flat(),
    [],
  )

  const getSpanClass = (index: number) => spanSequence[index % spanSequence.length]

  if (layout === 'flex' && Array.isArray(gallery) && gallery.length) {
    return (
      <div
        className={cn(
          {
            container: enableGutter,
          },
          className,
        )}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {gallery.map((item, index) => {
            if (!item?.media) return null

            return (
              <div key={index} className={cn('flex flex-col gap-2', getSpanClass(index))}>
                <div className="relative h-[220px] overflow-hidden border border-border sm:h-[240px] lg:h-[280px]">
                  <Media
                    resource={item.media}
                    fill
                    pictureClassName="block h-full w-full"
                    imgClassName={cn('object-cover', imgClassName)}
                    size="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                {item.caption ? (
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (layout === 'grid' && Array.isArray(gallery) && gallery.length) {
    const columnClass =
      {
        '2': 'lg:grid-cols-2',
        '3': 'lg:grid-cols-3',
        '4': 'lg:grid-cols-4',
      }[columns] || 'lg:grid-cols-3'

    return (
      <div
        className={cn(
          {
            container: enableGutter,
          },
          className,
        )}
      >
        <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', columnClass)}>
          {gallery.map((item, index) => {
            if (!item?.media) return null

            return (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className="relative overflow-hidden border border-border"
                  style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : undefined}
                >
                  <Media
                    resource={item.media}
                    fill
                    pictureClassName="block h-full w-full"
                    imgClassName={cn('object-cover', imgClassName)}
                    size="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                {item.caption ? (
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
