'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename, focalX, focalY } = resource

    const objectPosition =
      focalX != null || focalY != null
        ? `${focalX ?? 50}% ${focalY ?? 50}%`
        : undefined

    return (
      <video
        autoPlay
        className={cn(
          fill && 'absolute inset-0 h-full w-full object-cover',
          videoClassName,
        )}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        style={objectPosition ? { objectPosition } : undefined}
      >
        <source src={getMediaUrl(`/media/${filename}`)} />
      </video>
    )
  }

  return null
}
