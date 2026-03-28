import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="pt-10 md:pt-16">
      <div className="px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10">
          <div className="order-1 max-w-xl md:order-1">
            {richText && <RichText data={richText} enableGutter={false} />}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-4 md:mt-6">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {media && typeof media === 'object' && (
            <div className="order-2 w-full self-start md:order-2">
              <Media
                className="w-full"
                imgClassName="h-48 w-full object-cover object-center sm:h-56 md:h-[19rem] lg:h-[21rem]"
                priority
                resource={media}
              />
              {media?.caption && (
                <div className="mt-3 pr-4 md:pr-0">
                  <RichText data={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
