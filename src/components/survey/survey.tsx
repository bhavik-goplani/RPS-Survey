'use client'

import * as React from 'react'
import { Section } from '@/components/survey/section'

export function Survey({ participant_id }: { participant_id: string }) {

    const [survey_id, setSurveyID] = React.useState('')
    const [sections, setSections] = React.useState<Section[]>([])
    const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0)

    interface Section {
        section_id: string
    }

    React.useEffect(() => {
        async function getSurveyID() {
            const res = await fetch(`/api/participant?participant_id=${participant_id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setSurveyID(data[0].survey_id)
            }
            else {
                console.log(res)
            }
        }
        if (participant_id !== '') {
            getSurveyID()
        }
    }, [participant_id])

    React.useEffect(() => {
        async function getSections() {
            const res = await fetch(`/api/section?survey_id=${survey_id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json()
                setSections(data)
            }
            else {
                console.log(res)
            }
        }

        if (survey_id !== '') {
            getSections()
        }
    }, [survey_id])


    if (survey_id === '') {
        return (
            <>
                <div className="container mx-auto py-10">
                    <div className='flex justify-between'>
                        <h1 className="text-2xl font-semibold tracking-tight">Survey Loading...</h1>
                        
                    </div>
                </div>
            </>
        )
    }
    const isLastSection = currentSectionIndex === sections.length - 1
    return (
        <>
            <div className="container mx-auto py-10">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold tracking-tight">Survey {survey_id}</h1>
                </div>
                {sections.length > 0 && (
                <div key={sections[currentSectionIndex].section_id}>
                    <Section 
                        section_id={sections[currentSectionIndex].section_id} 
                        onComplete={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                        isLastSection={isLastSection}    
                    />
                </div>
                )}
            </div>
        </>
    )
}