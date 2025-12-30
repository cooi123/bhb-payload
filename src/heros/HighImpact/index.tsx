'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10rem] flex items-end pb-20 pt-40 justify-center text-primary"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center ">
        <div className="md:text-center">
          {richText && <RichText className="mb-6 prose-headings:text-white prose-p:text-white prose-strong:text-white prose-em:text-white prose-a:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <Button
                    key={i}
                    variant="default"
                    className="rounded-full px-6 py-2 min-w-[8rem] text-center border-2 font-bold hover:shadow-lg"
                  >
                    <Link href={link.url || ''} className="block w-full">
                      {link.label}
                    </Link>
                  </Button>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none items-center justify-center">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="-z-10 object-cover bg-black" priority resource={media} />
            <div className="absolute inset-0 -z-[5] bg-black/50" />
          </>
        )}
      </div>
    </div>
  )
}
