import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await req.json();

    const participant_email = body['participant_email'];
    const survey_id = body['survey_id'];
    const participant_id = body['participant_id'];

    const { data, error } = await supabase.from('Participant').insert([
        {
            participant_email: participant_email,
            survey_id: survey_id,
            participant_id: participant_id,
        },
    ]);

    if (error) {
        console.error('Error inserting data:', error);
        // Handle error here
    } else {
        console.log('Data inserted successfully:', data);
        // Handle success here
    }
    
    return NextResponse.redirect(new URL('/dashboard', req.url), 303)
}