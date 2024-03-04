'use client'

import * as React from 'react'
import { Section } from '@/components/survey/section'
import { useSurvey } from '@/components/survey/survey-context'
import { motion } from 'framer-motion';

export function Survey() {
    const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0)
    const context = useSurvey()
    const { survey_id, sections } = context
    const isLastSection = currentSectionIndex === sections.length - 1

    return (
        <motion.div layout>
                {sections.length > 0 && (
                <motion.div key={sections[currentSectionIndex].section_id} layout>
                    <Section 
                        section_details={sections[currentSectionIndex]} 
                        onComplete={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                        isLastSection={isLastSection}
                    />
                </motion.div>
                )}
        </motion.div>
    )
}