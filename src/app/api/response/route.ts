import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await req.json();

    const participant_id = body['participant_id'];
    const trials_data = body['trialsData'];    

    for (let i = 0; i < trials_data.length; i++) {
        const { userChoice, computerChoice, result, survey_id, section_id } = trials_data[i]
        const { data, error } = await supabase.from('Response').insert([
            {
                participant_id: participant_id,
                user_choice: userChoice,
                comp_choice: computerChoice,
                winner: result,
                survey_id: survey_id,
                section_id: section_id,
            },
        
        ])
        if (error) {
            console.error('Error inserting data:', error);
            console.log('Partcipant ID:', participant_id)
            console.log('Error Data:', trials_data[i])
        } else {
            console.log('Data inserted successfully');
        }
    }
    return NextResponse.json({})
}