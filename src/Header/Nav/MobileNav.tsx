'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary hover:text-primary/80"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="w-full">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Logo loading="eager" priority="high" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 mt-8">
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
              <SheetClose key={i} asChild>
                <Button
                  asChild
                  size="clear"
                  variant="link"
                  className="font-serif text-sm text-primary hover:text-primary/80 uppercase font-semibold justify-start p-0 h-auto"
                >
                  <Link href={href}>{link?.label}</Link>
                </Button>
              </SheetClose>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
