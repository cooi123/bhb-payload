import { useNavbarScroll } from '@/hooks/useNavarbarScroll'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  transparent?: boolean
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, transparent } = props
  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div
      className={clsx(
        'font-serif text-sm md:text-base lg:text-xl leading-none text-primary uppercase whitespace-nowrap font-semibold',
        className,
        transparent? 'text-white' : 'text-primary',
      )}
    >
      BEDFORD&nbsp;HOME&nbsp;BUILDER
    </div>
  )
}
