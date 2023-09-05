import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../types/database.types'
import SurveyButtons from './survey-buttons'

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    return (
        <SurveyButtons session={session}/>
    )
  }