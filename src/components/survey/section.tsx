'use client'
import { Button } from "@/components/ui/button"
import * as React from 'react'
import { useSurvey } from '@/components/survey/survey-context'
import { Game } from '@/components/survey/game'
import { useRouter } from "next/navigation"

interface Section {
    section_id: string
    rock_prob: number
    paper_prob: number
    scissor_prob: number
    trial_no: number
}

export function Section({ section_details, onComplete, isLastSection }: { section_details: Section, onComplete: () => void, isLastSection: boolean}) {

    const context = useSurvey()
    const router = useRouter()
    const {section_id, trial_no} = section_details
    const { participant_id } = context
    const [currentTrial, setCurrentTrial] = React.useState(0)
    const [hasUserMadeChoice, setHasUserMadeChoice] = React.useState(false)

    async function handleComplete() {
        if (isLastSection) {
            console.log('Survey Complete Section')
            await saveData()
            router.push(`/participant/${participant_id}/thankyou`)
        }
        else{
            onComplete()
        }
    }

    async function saveData () {
        // Get the data from local storage
        const trialsData = JSON.parse(localStorage.getItem('trials') || '[]')

        if (trialsData != null && trialsData.length > 0) {
            // Send the data to the server
            const res = await fetch('/api/response', { 
                method: 'POST',
                body: JSON.stringify({ participant_id, trialsData }),
                keepalive: true
            });
            trialsData.length = 0
            localStorage.setItem('trials', JSON.stringify(trialsData))
        }
    }

    function handleUserMadeChoice(choiceMade: boolean) {
        setHasUserMadeChoice(choiceMade)
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
                                        onUserMadeChoice={handleUserMadeChoice}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <br />
                    <p>Current Trial: {currentTrial+1}</p>
                    <div className="fixed bottom-0 right-0 m-6">
                        { hasUserMadeChoice && (isLastSection && (currentTrial+1 === trial_no))? (
                            <Button onClick={handleComplete}>
                                Complete Survey
                            </Button>
                        ) : ( hasUserMadeChoice && currentTrial+1 === trial_no)? (
                            <Button onClick={handleComplete}>
                                Next Section
                            </Button>
                        ) : null
                        }
                    </div>
                </div>
            </>
        )
}