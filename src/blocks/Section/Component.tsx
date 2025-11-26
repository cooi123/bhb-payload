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

const mediaBorderClassNames: Record<'primary' | 'secondary', string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
}

const heightClasses: Record<NonNullable<SectionBlockProps['sectionHeight']>, string> = {
  small: 'min-h-[20rem]',
  medium: 'min-h-[26rem]',
  large: 'min-h-[34rem]',
}

export const SectionBlock: React.FC<Props> = (props) => {
  const {
    backgroundColor = 'primary',
    customBackgroundColor,
    buttonLink,
    content,
    disableInnerContainer,
    enableGutter = true,
    heading,
    media,
    mediaLayout = 'imageLeft',
    sectionHeight = 'medium',
  } = props

  const mediaHeightClass = heightClasses[sectionHeight]

  const hasButton =
    buttonLink &&
    ((buttonLink.type === 'custom' && buttonLink.url) ||
      (buttonLink.type === 'reference' && buttonLink.reference))

  const mediaBorderClass =
    backgroundColor === 'custom'
      ? 'border-border'
      : mediaBorderClassNames[backgroundColor as 'primary' | 'secondary']

  const mediaBorderStyle =
    backgroundColor === 'custom' && customBackgroundColor
      ? { borderColor: customBackgroundColor }
      : undefined

  const renderMedia = (variant: 'default' | 'fill' = 'default') =>
    media ? (
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl border-2',
          mediaHeightClass,
          {
            'h-full': variant === 'fill',
          },
          mediaBorderClass,
        )}
        style={mediaBorderStyle}
      >
        <Media
          className={cn('w-full', mediaHeightClass, {
            'h-full': variant === 'fill',
          })}
          imgClassName={cn(
            'w-full object-cover transition-transform duration-300',
            'hover:scale-[1.02]',
            {
              'h-full': variant === 'fill',
            },
          )}
          resource={media}
        />
      </div>
    ) : null

  const renderContent = () => (
    <div className="flex flex-col gap-4">
      {heading && <h2 className="text-3xl font-medium text-primary">{heading}</h2>}
      {content && <RichText data={content} enableGutter={false} />}
      {hasButton && (
        <CMSLink
          {...buttonLink}
          appearance={buttonLink?.appearance ?? 'default'}
          size="lg"
        />
      )}
    </div>
  )

  const layout = mediaLayouts[mediaLayout]

  const backgroundClasses =
    backgroundColor === 'custom'
      ? 'text-foreground bg-card'
      : cn('text-foreground', backgroundBackgroundClasses[backgroundColor as 'primary' | 'secondary'])

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
        'my-16',
        heightClasses[sectionHeight],
      )}
    >
      <div
        className={cn(
          'border shadow-sm p-8 md:p-12',
          backgroundClasses,
        )}
        style={backgroundStyle}
      >
        <div
          className={cn('grid gap-10 lg:grid-cols-2', heightClasses[sectionHeight], {
            'items-center': layout !== 'imageFill',
            'items-stretch': layout === 'imageFill',
          })}
        >
          {(layout === 'imageLeft' || layout === 'imageFill') &&
            renderMedia(layout === 'imageFill' ? 'fill' : 'default')}
          {renderContent()}
          {layout === 'imageRight' && renderMedia()}
        </div>
      </div>
    </div>
  )
}

