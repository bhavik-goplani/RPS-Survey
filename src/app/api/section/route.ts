import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const body = await req.json();
  console.log(body);

  const rockProb = body['rockProbability'];
  const paperProb = body['paperProbability'];
  const scissorsProb = body['scissorsProbability'];
  const trialNo = body['trialNumber'];

  const { data, error } = await supabase.from('Section').insert([
    {
      rock_prob: rockProb,
      paper_prob: paperProb,
      scissor_prob: scissorsProb,
      trial_no: trialNo,
      survey_id: "c303e25d-9459-44b9-8f0c-7e4eab5dce4f", // Replace with the actual survey_id
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

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data, error } = await supabase.from('Section').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    // Handle error here
  } else {
    console.log('Data retrieved successfully:', data);
    // Handle success here
    // send data to frontend
    console.log(data);
    return NextResponse.json(data)
  }
}