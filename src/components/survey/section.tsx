'use client'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import * as React from 'react'
import { useSurvey } from '@/components/survey/survey-context'
import { Game } from '@/components/survey/game'
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion';

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
    const {trial_no} = section_details
    const { participant_id } = context
    const [currentTrial, setCurrentTrial] = React.useState(0)
    const [hasUserMadeChoice, setHasUserMadeChoice] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function handleComplete() {
        if (isLastSection) {
            setIsLoading(true)
            console.log('Survey Complete Section')
            localStorage.setItem('submission', 'true')
            await saveData()
            setIsLoading(false)
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
                <div>                            
                    {Array.from({ length: trial_no },).map((_, i) => {
                        if (i !== currentTrial) return null
                        return (
                            <motion.div key={i} layout>
                                <Game
                                    onComplete={() => setCurrentTrial(currentTrial + 1)}
                                    section_details={section_details}
                                    isLastTrial={currentTrial === trial_no - 1}
                                    onUserMadeChoice={handleUserMadeChoice}
                                />
                            </motion.div>
                        )
                    })}
                </div>
                <motion.div
                    className="fixed font-semibold tracking-tight bottom-0 left-0 m-6"
                    >
                    <p>Current Trial: {currentTrial+1}</p>
                </motion.div>
                <div className="fixed bottom-0 right-0 m-6">
                    { hasUserMadeChoice && (isLastSection && (currentTrial+1 === trial_no))? (
                        <motion.button 
                            onClick={handleComplete} 
                            disabled={isLoading}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(buttonVariants({ variant: "default", size: "default" }))}
                        >
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Complete Survey
                        </motion.button>
                    ) : ( hasUserMadeChoice && currentTrial+1 === trial_no)? (
                        <motion.button 
                            onClick={handleComplete}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(buttonVariants({ variant: "default", size: "default" }))}
                        >
                            Next Section
                        </motion.button>
                    ) : null
                    }
                </div>
            </>
        )
}