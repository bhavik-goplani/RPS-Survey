import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const body = await req.json();

  const rock_prob = body['rockProbability'];
  const paper_prob = body['paperProbability'];
  const scissor_prob = body['scissorsProbability'];
  const trial_no = body['trialNumber'];
  const survey_id = body['survey_id'];

  const { data, error } = await supabase.from('Section').insert([
    {
      rock_prob: rock_prob,
      paper_prob: paper_prob,
      scissor_prob: scissor_prob,
      trial_no: trial_no,
      survey_id: survey_id,
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

export async function DELETE(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const url = new URL(req.url);
  const section_id = url.searchParams.get('section_id');

  const { data, error } = await supabase
    .from('Section')
    .delete()
    .match({ section_id: section_id });

  if (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({error}, {
      status: 401,
    })
  }

  return NextResponse.redirect(new URL('/dashboard', req.url), 303);
}

export async function PUT(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const body = await req.json();

  const rock_prob = body['rockProbability'];
  const paper_prob = body['paperProbability'];
  const scissor_prob = body['scissorsProbability'];
  const trial_no = body['trialNumber'];
  const section_id = body['section_id'];

  const { data, error } = await supabase
  .from('Section')
  .update({ 
    rock_prob: rock_prob,
    paper_prob: paper_prob,
    scissor_prob: scissor_prob,
    trial_no: trial_no, 
  })
  .eq('section_id', section_id)
  .select()
  
  if (error) {
      console.error('Error inserting data:', error);
      // Handle error here
    } else {
      console.log('Data inserted successfully:', data);
      // Handle success here
    }
  
  return NextResponse.redirect(new URL('/dashboard', req.url), 303)
}