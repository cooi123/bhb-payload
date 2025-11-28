'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-3 text-primary">
      {navItems.map(({ link }, i) => {
        const href =
          link?.type === 'reference' &&
          typeof link.reference?.value === 'object' &&
          link.reference.value.slug
            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${
                link.reference.value.slug
              }`
            : link?.url

        if (!href) return null

        return (
          <Button
            asChild
            key={i}
            size="clear"
            variant="link"
            className="text-primary hover:text-primary/80 font-bold"
          >
            <Link href={href}>{link?.label}</Link>
          </Button>
        )
      })}
    </nav>
  )
}
