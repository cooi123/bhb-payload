import type { StaticImageData } from 'next/image'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { Media as MediaType, MediaBlock as MediaBlockBase } from '@/payload-types'

type MediaBlockProps = Omit<MediaBlockBase, 'layout'>

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  layout?: 'single' | 'grid' | 'flex' | 'masonry' | null
  columns?: string | null
  masonryOrientation?: 'vertical' | 'horizontal' | null
  galleryAspectRatio?: '1:1' | '3:2' | '4:3' | '16:9'
  gallery?: {
    media?: MediaType | number | string | null
    orientation?: 'auto' | 'horizontal' | 'vertical' | null
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
    masonryOrientation = 'vertical',
    galleryAspectRatio = '3:2',
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption: DefaultTypedEditorState | null | undefined
  if (media && typeof media === 'object') caption = media.caption

  const aspectRatioValue = React.useMemo(() => {
    const [w, h] = galleryAspectRatio.split(':').map(Number)
    if (!w || !h) return undefined
    return `${w} / ${h}`
  }, [galleryAspectRatio])

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 py-16">
          {gallery.map((item, index) => {
            if (!item?.media) return null

            const mediaObj = typeof item.media === 'object' ? item.media : null
            const w = mediaObj?.width ?? 3
            const h = mediaObj?.height ?? 2
            const ratio = w / h

            // Map natural aspect ratio to a 6-column span
            const colSpan =
              ratio >= 1.6
                ? 'lg:col-span-4' // wide landscape
                : ratio >= 1.0
                  ? 'lg:col-span-3' // mild landscape / square
                  : ratio >= 0.65
                    ? 'lg:col-span-2' // mild portrait
                    : 'lg:col-span-2' // tall portrait

            // Use the image's natural aspect ratio so the row height is set by the tallest item
            const aspectRatioStyle = { aspectRatio: `${w} / ${h}` }

            return (
              <div key={index} className={cn('flex flex-col gap-2', colSpan)}>
                <div
                  className="relative overflow-hidden hover:scale-105 transition-all duration-300"
                  style={aspectRatioStyle}
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

  if (layout === 'masonry' && Array.isArray(gallery) && gallery.length) {
    const wrapper = (children: React.ReactNode) => (
      <div className={cn({ container: enableGutter }, className)}>
        {children}
      </div>
    )

    // Horizontal masonry — justified rows: fixed row height, widths scale by aspect ratio
    if (masonryOrientation === 'horizontal') {
      return wrapper(
        <div className="flex flex-wrap gap-2 py-16">
          {gallery.map((item, index) => {
            if (!item?.media) return null

            const mediaObj = typeof item.media === 'object' ? item.media : null
            const nativeW = mediaObj?.width ?? 3
            const nativeH = mediaObj?.height ?? 2
            const ratio =
              item.orientation === 'horizontal'
                ? 3 / 2
                : item.orientation === 'vertical'
                  ? 2 / 3
                  : nativeW / nativeH

            return (
              <div
                key={index}
                className="relative overflow-hidden hover:brightness-95 transition-all duration-300 h-[220px] sm:h-[260px] lg:h-[300px] grow"
                style={{ flexBasis: `${ratio * 300}px` }}
              >
                <Media
                  resource={item.media}
                  fill
                  pictureClassName="block h-full w-full"
                  imgClassName={cn('object-cover', imgClassName)}
                  size="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {item.caption ? (
                  <p className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 text-xs text-white">
                    {item.caption}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>,
      )
    }

    // Vertical masonry — CSS columns (Pinterest-style)
    const masonryColClass =
      (columns &&
        {
          '2': 'sm:columns-2',
          '3': 'sm:columns-2 lg:columns-3',
          '4': 'sm:columns-2 lg:columns-4',
        }[columns]) ||
      'sm:columns-2 lg:columns-3'

    return wrapper(
      <div className={cn('columns-1 gap-4 py-16', masonryColClass)}>
        {gallery.map((item, index) => {
          if (!item?.media) return null

          const mediaObj = typeof item.media === 'object' ? item.media : null
          const nativeW = mediaObj?.width ?? 3
          const nativeH = mediaObj?.height ?? 2
          const displayRatio =
            item.orientation === 'horizontal'
              ? '3 / 2'
              : item.orientation === 'vertical'
                ? '2 / 3'
                : `${nativeW} / ${nativeH}`

          return (
            <div key={index} className="break-inside-avoid mb-4">
              <div
                className="relative overflow-hidden hover:brightness-95 transition-all duration-300"
                style={{ aspectRatio: displayRatio }}
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
                <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
              ) : null}
            </div>
          )
        })}
      </div>,
    )
  }

  if (layout === 'grid' && Array.isArray(gallery) && gallery.length) {
    const columnClass =
      (columns &&
        {
          '2': 'lg:grid-cols-2',
          '3': 'lg:grid-cols-3',
          '4': 'lg:grid-cols-4',
        }[columns]) ||
      'lg:grid-cols-3'

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
          {gallery.map((item, index) => {
            if (!item?.media) return null

            return (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className="relative overflow-hidden hover:scale-105 transition-all duration-300"
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
          imgClassName={cn(imgClassName)}
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
