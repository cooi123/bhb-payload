import React from 'react'

import type { SectionBlock as SectionBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = SectionBlockProps & {
  disableInnerContainer?: boolean
  enableGutter?: boolean
}

const mediaLayouts: Record<
  NonNullable<SectionBlockProps['mediaLayout']>,
  'imageLeft' | 'imageRight' | 'imageFill'
> = {
  imageLeft: 'imageLeft',
  imageRight: 'imageRight',
  imageFill: 'imageFill',
}

const backgroundBackgroundClasses: Record<'primary' | 'secondary', string> = {
  primary: 'bg-background text-black',
  secondary: 'bg-[#D3D3D3] text-black',
}

const heightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'min-h-[20rem]',
  medium: 'min-h-[26rem]',
  large: 'min-h-[34rem]',
  full: 'h-auto',
}

const mediaHeightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'h-[14rem] sm:h-[16rem] lg:h-full',
  medium: 'h-[16rem] sm:h-[20rem] lg:h-full',
  large: 'h-[18rem] sm:h-[24rem] lg:h-full',
  full: 'h-auto',
}

const mediaFillHeightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'h-[14rem] sm:h-[16rem] md:h-full',
  medium: 'h-[16rem] sm:h-[20rem] md:h-full',
  large: 'h-[18rem] sm:h-[24rem] md:h-full',
  full: 'h-auto',
}

export const SectionBlock: React.FC<Props> = (props) => {
  const {
    backgroundColor = 'primary',
    customBackgroundColor,
    buttonLink,
    content,
    contentPosition = 'left',
    disableInnerContainer,
    enableGutter = true,
    heading,
    media,
    mediaLayout = 'imageLeft',
    sectionHeight = 'medium',
  } = props

  const hasButton =
    buttonLink &&
    ((buttonLink.type === 'custom' && buttonLink.url) ||
      (buttonLink.type === 'reference' && buttonLink.reference))

  const renderMedia = (variant: 'default' | 'fill' = 'default') => {
    const isFullHeight = sectionHeight === 'full'
    const mediaHeightClass =
      variant === 'fill' ? mediaFillHeightClasses[sectionHeight] : mediaHeightClasses[sectionHeight]

    return media ? (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          mediaHeightClass,
        )}
      >
        <Media
          fill={!isFullHeight}
          className={cn('w-full', isFullHeight ? 'h-auto' : 'h-full')}
          pictureClassName={cn('block w-full', isFullHeight ? 'h-auto' : 'h-full')}
          imgClassName={cn(
            'w-full transition-transform duration-300',
            'hover:scale-[1.02]',
            isFullHeight ? 'h-auto object-contain' : 'h-full object-cover object-center',
          )}
          resource={media}
        />
      </div>
    ) : null
  }

  const layout = mediaLayouts[mediaLayout]

  const renderContent = (align: 'left' | 'right' = 'left') => (
    <div
      className={cn(
        'flex h-full flex-col gap-4',
        align === 'right' && 'items-end text-right',
      )}
    >
      {heading && (
        <h2
          className={cn(
            'section-heading text-primary',
            align === 'right' && 'text-right',
          )}
        >
          {heading}
        </h2>
      )}
      <div
        className={cn(
          'flex flex-1 flex-col justify-end gap-4',
          align === 'right' && 'items-end',
        )}
      >
        {content && (
          <RichText
            data={content}
            enableGutter={false}
            align={align}
            className="text-lg font-extralight leading-relaxed sm:text-xl lg:text-2xl xl:text-3xl"
          />
        )}
        {hasButton && (
          <CMSLink
            {...buttonLink}
            className={cn(
              'h-auto w-fit rounded-xl border border-primary bg-transparent px-10 py-1.5 text-primary font-medium hover:bg-primary/10 hover:text-primary md:px-12',
              align === 'left' ? 'self-start' : 'self-end',
            )}
            appearance={buttonLink?.appearance ?? 'default'}
            size="lg"
          />
        )}
      </div>
    </div>
  )

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
    <div
      className={cn(
        {
          container: enableGutter && !disableInnerContainer,
        },
        sectionHeight === 'full' ? 'h-auto' : heightClasses[sectionHeight],
      )}
    >
      <div
        className={cn(
          {
            'md:p-12': layout !== 'imageFill',
            relative: layout === 'imageFill',
          },
          backgroundClasses,
        )}
        style={backgroundStyle}
      >
        {layout === 'imageFill' ? (
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 items-stretch',
              sectionHeight === 'full' ? 'h-auto' : heightClasses[sectionHeight],
            )}
          >
            {contentPosition === 'left' ? (
              <>
                <div className="min-w-0 order-1 px-6 py-8 md:order-1 md:h-full md:px-10">
                  {renderContent('left')}
                </div>
                <div className="order-2 md:order-2">{renderMedia('fill')}</div>
              </>
            ) : (
              <>
                <div className="order-2 md:order-1">{renderMedia('fill')}</div>
                <div className="min-w-0 order-1 px-6 py-8 md:order-2 md:h-full md:px-10">
                  {renderContent('right')}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className={cn(
              'grid lg:grid-cols-2 items-stretch gap-10',
              sectionHeight === 'full' ? 'h-auto' : heightClasses[sectionHeight],
            )}
          >
            {layout === 'imageLeft' && <div className="order-2 lg:order-1">{renderMedia()}</div>}
            <div className="order-1 min-w-0 h-full px-6 py-8 lg:order-2 lg:px-0 lg:py-0">
              {layout === 'imageLeft' ? renderContent('right') : renderContent('left')}
            </div>
            {layout === 'imageRight' && <div className="order-2 lg:order-3">{renderMedia()}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
