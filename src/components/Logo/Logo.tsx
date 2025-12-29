import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div
      className={clsx(
        'font-serif text-xl leading-none text-primary uppercase whitespace-nowrap font-semibold',
        className,
      )}
    >
      BEDFORD&nbsp;HOME&nbsp;BUILDER
    </div>
  )
}
