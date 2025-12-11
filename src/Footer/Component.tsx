import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-layout text-primary">
      <div className="container pt-4 pb-8 md:py-8 flex flex-col md:flex-row justify-center">
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 justify-evenly items-center">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-primary font-bold" key={i} {...link} />
          })}
        </nav>
      </div>
    </footer>
  )
}
