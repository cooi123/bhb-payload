'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

const heightClasses = {
  '1/2': 'min-h-[66svh]',
  '1/3': 'min-h-[45svh]',
  '1/4': 'min-h-[30svh]',
} as const

const alignmentClasses = {
  left: {
    container: 'justify-start text-left',
    content: 'mr-auto',
    links: 'justify-start',
  },
  center: {
    container: 'justify-center text-center',
    content: 'mx-auto',
    links: 'justify-center',
  },
  right: {
    container: 'justify-end text-right',
    content: 'ml-auto',
    links: 'justify-end',
  },
} as const

export const FullImpactHero: React.FC<Page['hero']> = ({
  height,
  links,
  media,
  richText,
  textAlignment,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroHeightClass = height ? heightClasses[height] : heightClasses['1/3']
  const heroAlignment = textAlignment ? alignmentClasses[textAlignment] : alignmentClasses.left

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className={`relative -mt-24 flex ${heroHeightClass} items-end overflow-hidden text-white md:-mt-32`}
      data-theme="dark"
    >
      <div className={`container relative z-10 flex ${heroAlignment.container} pb-10 md:pb-14 lg:pb-16`}>
        <div className={`max-w-3xl ${heroAlignment.content}`}>
          {richText && (
            <RichText
              align={textAlignment || 'left'}
              className="prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-em:text-white prose-a:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className={`mt-6 flex flex-wrap gap-3 ${heroAlignment.links}`}>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/80 bg-transparent px-4 py-1.5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={link.url || ''}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {media && typeof media === 'object' && (
        <>
          <Media fill imgClassName="-z-20 object-cover" priority resource={media} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
        </>
      )}
    </div>
  )
}
