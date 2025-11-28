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
  secondary: 'bg-secondary text-black',
}



const heightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'min-h-[20rem]',
  medium: 'min-h-[26rem]',
  large: 'min-h-[34rem]',
  full: 'h-auto',
}

const mediaHeightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'h-[25rem]',
  medium: 'h-[30rem]',
  large: 'h-[40rem]',
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

  const mediaHeightClass = mediaHeightClasses[sectionHeight]

  const hasButton =
    buttonLink &&
    ((buttonLink.type === 'custom' && buttonLink.url) ||
      (buttonLink.type === 'reference' && buttonLink.reference))




  const renderMedia = (variant: 'default' | 'fill' = 'default') => {
    const isFullHeight = sectionHeight === 'full'
    return media ? (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          variant === 'fill' 
            ? (isFullHeight ? 'h-auto' : mediaHeightClass)
            : mediaHeightClass,
        )}
      >
        <Media
          className={cn('w-full', isFullHeight ? 'h-auto' : 'h-full')}
          imgClassName={cn(
            'w-full transition-transform duration-300',
            'hover:scale-[1.02]',
            isFullHeight ? 'h-auto object-contain' : 'h-full object-cover',
          )}
          resource={media}
        />
      </div>
    ) : null
  }

  const layout = mediaLayouts[mediaLayout]

  const renderContent = () => {
    const isImageFill = layout === 'imageFill'
    const textAlignClass = isImageFill 
      ? (contentPosition === 'left' ? 'text-left' : 'text-right')
      : (layout === 'imageLeft' ? 'text-right' : 'text-left')
    const buttonAlignClass = isImageFill
      ? (contentPosition === 'left' ? 'self-start' : 'self-end')
      : (layout === 'imageLeft' ? 'self-end' : 'self-start')
    const contentAlign = isImageFill
      ? (contentPosition === 'left' ? 'left' : 'right')
      : (layout === 'imageLeft' ? 'right' : 'left')
    
    return (
      <div className={cn(
        'flex flex-col h-full justify-between min-w-0 max-w-full overflow-x-hidden', 
        textAlignClass,
        {
          'p-8 md:p-12': isImageFill,
        }
      )}>
        <div className="flex flex-col gap-4 min-w-0 max-w-full">
          {heading && <h2 className="text-primary break-words heading">{heading}</h2>}
        </div>
        <div className="flex flex-col gap-4 min-w-0 w-full max-w-full overflow-x-hidden">
          {content && <RichText data={content} enableGutter={false} align={contentAlign as 'left' | 'right'} className="break-words overflow-wrap-anywhere w-full" />}
        {hasButton && (
          <div className="mt-8">
            <CMSLink 
              {...buttonLink} 
              appearance={buttonLink?.appearance ?? 'default'} 
              size="default" 
              className={cn('w-fit bg-transparent border border-primary text-primary hover:bg-primary/10', buttonAlignClass)} 
            />
          </div>
        )}
        </div>
      </div>
    )
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
            'p-8 md:p-12': layout !== 'imageFill',
            'relative': layout === 'imageFill',
          },
          backgroundClasses
        )}
        style={backgroundStyle}
      >
        {layout === 'imageFill' ? (
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 items-stretch',
            sectionHeight === 'full' ? 'h-auto' : heightClasses[sectionHeight]
          )}>
            {contentPosition === 'left' ? (
              <>
                <div className="min-w-0 order-2 md:order-1">{renderContent()}</div>
                <div className="order-1 md:order-2">{renderMedia('fill')}</div>
              </>
            ) : (
              <>
                <div className="order-1 md:order-1">{renderMedia('fill')}</div>
                <div className="min-w-0 order-2 md:order-2">{renderContent()}</div>
              </>
            )}
          </div>
        ) : (
          <div
            className={cn(
              'grid lg:grid-cols-2 items-stretch gap-10',
              sectionHeight === 'full' ? 'h-auto' : heightClasses[sectionHeight]
            )}
          >
            {layout === 'imageLeft' && renderMedia()}
            <div className="min-w-0">{renderContent()}</div>
            {layout === 'imageRight' && renderMedia()}
          </div>
        )}
      </div>
    </div>
  )
}
