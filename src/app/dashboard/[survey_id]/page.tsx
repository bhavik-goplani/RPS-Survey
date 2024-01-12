import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { CreateSection } from '@/components/section-dashboard/create-section'
import { DataTable } from '@/components/section-dashboard/data-table'
import { Section, columns } from '@/components/section-dashboard/columns'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { survey_id: string } }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

    async function getSections() : Promise<Section[]> {        
        let { data: Section, error } = await supabase
        .from('Section')
        .select('*')
        .eq('survey_id', params.survey_id)
        if (error) console.log('error', error)
        return Section as Section[]
    }

    const data = await getSections()
    return (
        <>
            <div className="container mx-auto py-10">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold tracking-tight">Sections</h1>
                    <CreateSection survey_id={params.survey_id} />
                </div>
                <div className='py-4'>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    )
  }