'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })
  console.log(links)

  return (
    <div
      className="relative -mt-[10rem] flex items-end justify-center pb-16 pt-40 text-primary sm:pt-52 md:pb-20 md:pt-80"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center ">
        <div className="md:text-center">
          {richText && <RichText className="mb-6 prose-headings:text-white prose-p:text-white prose-strong:text-white prose-em:text-white prose-a:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    appearance="outline"
                    className="rounded-xl px-4 py-1.5 min-w-[7rem] text-center text-lg border-2 border-white/80 bg-transparent text-white font-medium hover:bg-white/10 hover:text-white"
                    {...link}
                  />
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[55vh] select-none items-center justify-center pt-12 sm:min-h-[65vh] sm:pt-16 md:min-h-[80vh] md:pt-32">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="-z-10 object-cover object-center bg-black" priority resource={media} />
            <div className="absolute inset-0 -z-[5] bg-black/50" />
          </>
        )}
      </div>
    </div>
  )
}
