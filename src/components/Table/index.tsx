import { cn } from '@/utilities/ui'
import { Bath, BedDouble, Car } from 'lucide-react'
import React from 'react'

type TableRow = {
  label: string
  value: React.ReactNode
}

type PropertySpecs = {
  baths?: number
  beds?: number
  cars?: number
}

export type PropertyTableProps = {
  area?: number | string
  architect?: string
  className?: string
  completionYear?: number | string
  /**
   * Supply rows directly if you need a fully custom layout.
   * When omitted, rows are built from the strongly typed props.
   */
  rows?: TableRow[]
  specs?: PropertySpecs
}

const SpecsRow: React.FC<{ specs: PropertySpecs }> = ({ specs }) => {
  const { baths, beds, cars } = specs
  const iconClass = 'h-5 w-5 stroke-[1.5]'

  return (
    <div className="flex flex-wrap items-center gap-4">
      {typeof beds === 'number' && (
        <span className="flex items-center gap-1">
          <BedDouble className={iconClass} aria-hidden />
          <span>{beds}</span>
        </span>
      )}
      {typeof baths === 'number' && (
        <span className="flex items-center gap-1">
          <Bath className={iconClass} aria-hidden />
          <span>{baths}</span>
        </span>
      )}
      {typeof cars === 'number' && (
        <span className="flex items-center gap-1">
          <Car className={iconClass} aria-hidden />
          <span>{cars}</span>
        </span>
      )}
    </div>
  )
}

const formatArea = (area: PropertyTableProps['area']) => {
  if (area === undefined || area === null) return null
  if (typeof area === 'string' && area.toLowerCase().includes('m')) return area

  return (
    <span className="inline-flex items-baseline gap-1">
      <span>{area}</span>
      <sup className="text-[10px] leading-none">m²</sup>
    </span>
  )
}

export const PropertyTable: React.FC<PropertyTableProps> = ({
  area,
  architect,
  className,
  completionYear,
  rows,
  specs,
}) => {
  const hasSpecs = !!specs && ['baths', 'beds', 'cars'].some((key) => specs[key as keyof PropertySpecs] !== undefined)

  const derivedRows =
    rows ??
    ([
      area !== undefined && { label: 'Area', value: formatArea(area) },
      completionYear !== undefined && { label: 'Project Completion', value: completionYear },
      architect && { label: 'Architect', value: architect },
      hasSpecs && specs && { label: 'Spec', value: <SpecsRow specs={specs} /> },
    ].filter(Boolean) as TableRow[])

  return (
    <table
      className={cn(
        'w-full border border-border border-collapse bg-card text-foreground text-base',
        className,
      )}
    >
      <tbody className="divide-y divide-border">
        {derivedRows.map(({ label, value }) => (
          <tr key={label}>
            <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-foreground">{label}</th>
            <td className="px-3 py-3">
              <div className="flex items-center gap-2 text-foreground">{value}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PropertyTable

