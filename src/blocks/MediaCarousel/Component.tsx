'use client'
import React, { useEffect, useRef, useState } from 'react'

import type { Media as PayloadMedia } from '@/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import Autoplay from 'embla-carousel-autoplay'
import { SquareArrowOutUpRight } from 'lucide-react'
import { CMSLink } from '@/components/Link'

type CarouselSlide = {
  id?: string | number
  media?: PayloadMedia | number | string | null
  caption?: string | null
  description?: string | null
  linkUrl?: string | null
}

type MediaCarouselBlockProps = {
  blockName?: string | null
  blockType?: 'mediaCarousel'
  heading?: string | null
  description?: any
  slides?: CarouselSlide[] | null
  slideAspectRatio?: '16:9' | '4:3' | '1:1'
  slideSize?: 'small' | 'medium' | 'large'
  loopSlides?: boolean
  buttonLink?: any
}

type Props = MediaCarouselBlockProps & {
  disableInnerContainer?: boolean
  enableGutter?: boolean
}

const aspectRatioClasses: Record<
  NonNullable<MediaCarouselBlockProps['slideAspectRatio']>,
  string
> = {
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
}

const slideWidthClasses: Record<
  NonNullable<MediaCarouselBlockProps['slideSize']>,
  string
> = {
  small: 'basis-full md:basis-1/3 lg:basis-1/4',
  medium: 'basis-full md:basis-2/3 lg:basis-1/3',
  large: 'basis-full md:basis-5/6 lg:basis-1/2',
}

export const MediaCarouselBlock: React.FC<Props> = (props) => {
  const {
    description,
    heading,
    slides,
    slideAspectRatio = '16:9',
    slideSize = 'medium',
    loopSlides = true,
    buttonLink,
    disableInnerContainer,
    enableGutter = true,
  } = props

  const aspectClass = aspectRatioClasses[slideAspectRatio] ?? aspectRatioClasses['16:9']
  const slideWidthClass = slideWidthClasses[slideSize] ?? slideWidthClasses.medium
  const autoplayPlugin = useRef<ReturnType<typeof Autoplay> | null>(
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  )
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const hasButtonLink =
    buttonLink &&
    ((buttonLink.type === 'custom' && buttonLink.url) ||
      (buttonLink.type === 'reference' && buttonLink.reference))
  const buttonText = buttonLink?.label ?? 'View All'

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api])

  if (!slides || slides.length === 0) {
    return null
  }
  console.log('buttonLink', buttonLink)
  return (
    <section
      className={cn(
        'space-y-8 py-12',
        {
          container: enableGutter && !disableInnerContainer,
        },
      )}
    >
      <div className="space-y-4">
        {heading && <h2 className="text-3xl font-semibold text-primary">{heading}</h2>}
        {description && (
          <RichText
            data={description}
            enableGutter={false}
            className="max-w-3xl text-muted-foreground"
          />
        )}
      </div>
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            loop: loopSlides && slides.length > 1,
            dragFree: true,
          }}
          plugins={autoplayPlugin.current ? [autoplayPlugin.current] : undefined}
          setApi={setApi}
        >
          <CarouselContent className="justify-center">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className={cn(slideWidthClass)}
              >
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    {slide.linkUrl ? (
                      <a
                        href={slide.linkUrl}
                        target="_self"
                        className={cn(
                          'relative block w-full overflow-hidden rounded-2xl border border-border bg-background',
                          aspectClass,
                        )}
                      >
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
                        <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <SquareArrowOutUpRight className="h-5 w-5" />
                          <p className="text-sm font-semibold uppercase tracking-widest">learn more</p>
                        </div>
                        {slide.media && (
                          <Media
                            resource={slide.media}
                            className="h-full w-full"
                            imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        )}
                      </a>
                    ) : (
                      <div
                        className={cn(
                          'relative block w-full overflow-hidden bg-background',
                          aspectClass,
                        )}
                      >
                        {slide.media && (
                          <Media
                            resource={slide.media}
                            className="h-full w-full"
                            imgClassName="h-full w-full object-cover"
                            
                          />
                        )}
                      </div>
                    )}
                  </div>
                  {(slide.caption || slide.description) && (
                    <div className="space-y-1">
                      {slide.caption && (
                        <p className="text-base font-semibold text-foreground">{slide.caption}</p>
                      )}
                      {slide.description && (
                        <p className="text-sm text-muted-foreground">{slide.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <p className="mt-3 text-center text-xs text-muted-foreground xl:hidden">Swipe to explore</p>
          {count > 1 && (
            <div className="flex justify-center gap-2 py-3 text-center text-xs text-muted-foreground sm:gap-3 xl:mt-4">
              {Array.from({ length: count }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'inline-block h-2 w-2 rounded-full transition-colors',
                    index === current ? 'bg-foreground/70' : 'bg-muted',
                  )}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
      {hasButtonLink && (
        <div className="flex justify-center pt-6">
          <CMSLink
            {...buttonLink}
            appearance={buttonLink?.appearance ?? 'default'}
            size="lg"
            className={cn('min-w-[12rem] justify-center', buttonLink?.className)}
          >
          </CMSLink>
        </div>
      )}
    </section>
  )
}
