'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('flex items-center gap-6 text-primary', className)}>
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
            className="font-serif text-xs text-primary hover:text-primary/80 uppercase font-semibold"
          >
            <Link href={href}>{link?.label}</Link>
          </Button>
        )
      })}
    </nav>
  )
}
