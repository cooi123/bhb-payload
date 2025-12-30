import { useNavbarScroll } from '@/hooks/useNavarbarScroll'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const { atTop } = useNavbarScroll()

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div
      className={clsx(
        'font-serif text-sm md:text-base lg:text-xl leading-none text-primary uppercase whitespace-nowrap font-semibold',
        className,
        atTop ? 'text-white' : 'text-primary',
      )}
    >
      BEDFORD&nbsp;HOME&nbsp;BUILDER
    </div>
  )
}
