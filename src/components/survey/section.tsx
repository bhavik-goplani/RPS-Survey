'use client'
import { Button } from "@/components/ui/button"

export function Section({ section_id, onComplete, isLastSection }: { section_id: string, onComplete: () => void, isLastSection: boolean}) {


    function handleComplete() {
        if (isLastSection) {
            console.log('Survey Complete')
        }
        else{
            onComplete()
        }
    }

        if (isLastSection) {
            return (
                <>
                    <div className="container mx-auto py-10">
                        <div className='flex justify-between'>
                            <br />
                            <h1 className="text-2xl font-semibold tracking-tight">Section - {section_id}</h1>
                            <Button onClick={handleComplete}>
                                Complete Survey
                            </Button>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="container mx-auto py-10">
                    <div className='flex justify-between'>
                        <br />
                        <h1 className="text-2xl font-semibold tracking-tight">Section - {section_id}</h1>
                        <Button onClick={handleComplete}>
                            Next Survey
                        </Button>
                    </div>
                </div>
            </>
        )
}