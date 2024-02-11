'use client'
import { Button } from "@/components/ui/button"
import * as React from 'react'
import { useSurvey } from '@/components/survey/survey-context'
import { Game } from '@/components/survey/game'

interface Section {
    section_id: string
    rock_prob: number
    paper_prob: number
    scissor_prob: number
    trial_no: number
}

export function Section({ section_details, onComplete, isLastSection }: { section_details: Section, onComplete: () => void, isLastSection: boolean}) {

    const context = useSurvey()
    const {section_id, trial_no} = section_details
    const [currentTrial, setCurrentTrial] = React.useState(0)

    function handleComplete() {
        if (isLastSection) {
            console.log('Survey Complete')
        }
        else{
            onComplete()
        }
    }

        return (
            <>
                <div className="container mx-auto py-10">
                    <h3 className="text-2xl font-semibold tracking-tight">Section - {section_id}</h3>
                    <br />
                    <div>                            
                        {Array.from({ length: trial_no },).map((_, i) => {
                            if (i !== currentTrial) return null
                            return (
                                <div key={i}>
                                    <Game
                                        onComplete={() => setCurrentTrial(currentTrial + 1)}
                                        section_details={section_details}
                                        isLastTrial={currentTrial === trial_no - 1}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="fixed bottom-0 right-0 m-6">
                        { isLastSection ? (
                            <Button onClick={handleComplete}>
                                Complete Survey
                            </Button>
                        ) : (
                            <Button onClick={handleComplete}>
                                Next Survey
                            </Button>
                        )
                        }
                    </div>
                </div>
            </>
        )
}