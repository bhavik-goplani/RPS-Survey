'use client'

import * as React from 'react'
import { Section } from '@/components/survey/section'
import { useSurvey } from '@/components/survey/survey-context'

export function Survey() {
    const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0)
    const context = useSurvey()
    const { survey_id, sections } = context
    const isLastSection = currentSectionIndex === sections.length - 1

    return (
        <>
            <div className="container mx-auto py-10">
                {survey_id ? (
                    <h1 className="text-2xl font-semibold tracking-tight">Survey {survey_id}</h1>
                ) : (
                    <h1 className="text-2xl font-semibold tracking-tight">Survey Loading...</h1>
                )}
                {sections.length > 0 && (
                <div key={sections[currentSectionIndex].section_id}>
                    <Section 
                        section_details={sections[currentSectionIndex]} 
                        onComplete={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                        isLastSection={isLastSection}
                    />
                </div>
                )}
            </div>
        </>
    )
}