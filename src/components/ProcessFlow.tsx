import * as React from 'react'
import { Phase } from './ProcessTimeline'

export type ProcessFlowProps = {
  steps: Phase[]
  className?: string
}

/**
 * Horizontal flow of numbered steps with arrows between them.
 * Example:
 * <ProcessFlow
 *   steps={[
 *     { number: 1, label: 'Planning' },
 *     { number: 2, label: 'Design' },
 *   ]}
 * />
 */
export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, className }) => {

  return (
    <div
      className={['w-full overflow-x-auto', className]
        .filter(Boolean)
        .join(' ')}
    >
       <div className="w-full max-w-7xl mx-auto p-8 rounded-lg sm:px-0">
      <div className="flex items-start justify-between w-full">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Step Item */}
              <div className="flex flex-col items-center gap-4 z-10">
                {/* Circle */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-neutral-800 bg-white shadow-sm">
                  <span className="text-2xl font-serif font-bold text-red-900">
                    {index + 1}
                  </span>
                </div>
                
                {/* Label */}
                <span className="text-lg font-bold text-red-900 font-serif">
                  {step.title}
                </span>
              </div>

              {/* Connector Arrow (Rendered between steps) */}
              {!isLast && (
                <div className="flex-1 flex items-center justify-center pt-8 px-4">
                  <div className="w-full h-px bg-neutral-800 relative">
                   
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
    </div>
  )
}

export default ProcessFlow