'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useNavbarScroll } from '@/hooks/useNavarbarScroll'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './Nav/MobileNav'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { show, atTop } = useNavbarScroll()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])
  return (
    <header
      className={cn(
        'relative z-20 w-full sticky top-0 text-primary transition-all duration-300 bg-layout',
        {
          '-translate-y-full opacity-0': !show,
          'translate-y-0 opacity-100': show,
          'bg-transparent text-white': atTop && pathname == '/',
        },
      )}
    >
      <div className="container flex items-center justify-between py-2 md:py-4 lg:py-6">
        <Link href="/">
          <Logo loading="eager" priority="high" transparent={atTop && pathname == '/'} />
        </Link>
        <HeaderNav data={data} className="md:flex hidden"  transparent={atTop && pathname == '/'}/>
        <MobileNav data={data} transparent={atTop && pathname == '/'}/>
      </div>
    </header>
  )
}
