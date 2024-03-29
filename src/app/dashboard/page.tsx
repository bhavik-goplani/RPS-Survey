import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Survey, columns } from '@/components/survey-dashboard/columns'
import { DataTable } from '@/components/survey-dashboard/data-table'
import { CreateSurvey } from "@/components/survey-dashboard/create-survey"

export const dynamic = 'force-dynamic'

export default async function Home() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    
    async function getSurveys() : Promise<Survey[]> {        
        let { data: Survey, error } = await supabase
        .from('Survey')
        .select('*')
        if (error) console.log('error', error)
        return Survey as Survey[]
    }

    const data = await getSurveys()
    return (
        <>
            <div className="container mx-auto py-10">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold tracking-tight">Surveys</h1>
                    <CreateSurvey />
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
  }