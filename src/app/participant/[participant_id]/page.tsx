'use client'
import { Survey } from '@/components/survey/survey'
import { SurveyContext } from '@/components/survey/survey-context'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export default function Page({ params }: { params: { participant_id: string } }) {
    
    const participant_id = params.participant_id
    const [context, setContext] = React.useState<SurveyContext>({
        participant_id: params.participant_id,
        survey_id: '',
        sections: [
            {
                section_id: '',
                rock_prob: 0,
                paper_prob: 0,
                scissor_prob: 0,
                trial_no: 0,
            },
        ],
    })

    interface Section {
        section_id: string
        rock_prob: number
        paper_prob: number
        scissor_prob: number
        trial_no: number
    }

    interface SurveyContext {
        participant_id: string
        survey_id: string
        sections: Section[]
    }

    async function getSurveyID(participant_id:string) {
        const res = await fetch(`/api/participant?participant_id=${participant_id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const data = await res.json()
            return data[0].survey_id
        }
        else {
            console.log(res)
            return 'error'
        }
    }

    async function getSections(survey_id:string) {
        const res = await fetch(`/api/section?survey_id=${survey_id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const data = await res.json()
            return data
        }
        else {
            console.log(res)
            return 'error'
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            if (participant_id !== '') {
                const survey_id = await getSurveyID(participant_id)
                const sections = await getSections(survey_id)

                setContext((prevContext: SurveyContext) => ({...prevContext, sections, survey_id}))
            }
        }

        fetchData()
    }, [participant_id])

    React.useEffect(() => {
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
    
        const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
            e.preventDefault();
    
            // Save the data before the page is unloaded
            await saveData();
        };
    
        // Save the data every minute
        const intervalId = setInterval(saveData, 60 * 1000);
    
        // Add the beforeunload event listener
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Clean up the interval and the event listener when the component is unmounted
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [participant_id]);

    return (
        <> 
            <SurveyContext.Provider value={{ ...context }}>
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-semibold tracking-tight">Welcome to the Survey!</h1>
                <Survey/>
            </div>
            </SurveyContext.Provider>
        </>
    )
  }