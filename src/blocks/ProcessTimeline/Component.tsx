import React from 'react'

import { ProcessTimeline, type Phase } from '@/components/ProcessTimeline'
import ProcessFlow from '@/components/ProcessFlow'

type ProcessTimelineBlockProps = {
  phases?:
    | {
        title?: string | null
        details?:
          | {
              detail?: string | null
            }[]
          | null
      }[]
    | null
}

export const ProcessTimelineBlock: React.FC<ProcessTimelineBlockProps> = (props) => {
  const { phases } = props

  const normalizedPhases: Phase[] =
    phases?.map((phase) => ({
      title: phase.title ?? '',
      details:
        phase.details
          ?.map((d) => d?.detail?.trim())
          .filter((d): d is string => Boolean(d)) || [],
    })) || []

  if (!normalizedPhases.length) return null

  return (
    <section className="py-16">
      <div className="hidden sm:block">
        <ProcessFlow steps={normalizedPhases} />
      </div>
      <div >
        <ProcessTimeline phases={normalizedPhases} />
      </div>
    </section>
  )
}

export default ProcessTimelineBlock


