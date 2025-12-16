import React from 'react'
export interface Phase {
    title: string;
    details: string[];
}

export const ProcessTimeline = ({ phases }: { phases: Phase[] }) => {
    return (
        <div className="w-full max-w-7xl mx-auto p-10 rounded-lg">
            <div className="flex flex-col">
                {phases.map((phase, index) => {
                    const isLast = index === phases.length - 1;

                    return (
                        <div key={index} className="flex gap-6">
                            {/* LEFT COLUMN: The Timeline Line & Dot */}
                            <div className="flex flex-col items-center">
                                {/* The Red Dot */}
                                <div className="w-3 h-3 rounded-full bg-red-900 shrink-0 z-10 my-2" />

                                {/* The Vertical Line (Separator) */}
                                {/* We hide the line for the last item if you want it to stop at the dot, 
                    or keep it if you want a continuous line running down page. */}
                                {!isLast && (
                                    <div className="w-[1px] bg-neutral-300 flex-grow mt-2" />
                                )}
                            </div>

                            {/* RIGHT COLUMN: The Content */}
                            {/* Grid layout to split Title (left) and Details (right) */}
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 w-full pb-16">

                                {/* Phase Title */}
                                <h3 className="text-3xl font-serif font-bold text-red-900 leading-tight">
                                    {phase.title}
                                </h3>

                                {/* Bullet List */}
                                <ul className="flex flex-col gap-2 pt-1">
                                    {phase.details.map((detail, i) => (
                                        <li key={i} className="flex items-start text-neutral-800 text-lg">
                                            <span className="mr-2 mt-2 w-1 h-1 rounded-full bg-neutral-800 shrink-0" />
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}