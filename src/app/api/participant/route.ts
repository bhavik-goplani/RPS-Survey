import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await req.json();

    const participant_email = body['participant_email'];
    const survey_id = body['survey_id'];

    // Generate a secure random password for the use
    function generatePassword(length = 10) {
        return crypto.randomBytes(length).toString('hex');
    }
    const password = generatePassword();

    

    const { data:Userdata, error:Usererror } = await supabase.rpc('create_user', {
        email: participant_email,
        password: password,
    });

    // get participant_id from create_user function
    if (Usererror) {
        console.error('Error inserting user:', Usererror);
        // Handle error here
    }
    else {
        console.log('User created successfully:', Userdata);
        // Handle success here
    }

    const participant_id = Userdata;

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
    
    return NextResponse.json({ password: password, participant_id: participant_id })
}

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const url = new URL(req.url);
    const participant_id = url.searchParams.get('participant_id');
    const { data, error } = await supabase.from('Participant').select('survey_id').eq('participant_id', participant_id);

    if (error) {
        console.error('Error fetching data:', error);
        // Handle error here
    } else {
        console.log('Data retrieved successfully:', data);
        // Handle success here
        return NextResponse.json(data)
    }
}

export async function DELETE(req: NextRequest) {
    // Delete the user from the auth table to remove their access to the survey
    // DO NOT DELETE THE PARTICIPANT FROM THE PARTICIPANT TABLE
    const supabase = createRouteHandlerClient({ cookies })
    const url = new URL(req.url);
    const participant_id = url.searchParams.get('participant_id');

    if (!participant_id) {
        return NextResponse.json({error: 'participant_id is required'}, {
            status: 400,
        })
    }
    else {
        const { data, error } = await supabase.rpc('delete_user', { p_user_id: participant_id })
        if (error) {
            console.error('Error deleting user:', error);
            return NextResponse.json({error}, {
                status: 401,
            })
        }
        else {
            console.log('User deleted successfully:', data);
            return NextResponse.json(data)
        }
    }
}