import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import CreateSurveyForm from './survey-create-form'

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <div>
            <h1>Welcome to create Survey</h1>
            <CreateSurveyForm session={session}/>
            <button >Create section</button>
            <button >View section</button>
        </div>
    )
  }