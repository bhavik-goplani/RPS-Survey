import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Survey, columns } from '@/components/survey-dashboard/columns'
import { DataTable } from '@/components/ui/data-table'


export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    async function getSurveys() : Promise<Survey[]> {        
        let { data: Survey, error } = await supabase
        .from('Survey')
        .select('*')
        console.log(Survey)
        if (error) console.log('error', error)
        return Survey as Survey[]
    }

    const data = await getSurveys()
    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
  }