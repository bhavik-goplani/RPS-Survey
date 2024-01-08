import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await req.json();
    console.log(body);
    const name = body['name'];
    const description = body['description'];
    const section_count = body['section_count'];
    
    const { data, error } = await supabase
    .from('Survey')
    .insert([
    { name: name, description: description, section_count: section_count },
    ])
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

export async function DELETE(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const url = new URL(req.url);
    const survey_id = url.searchParams.get('survey_id');
  
    const { data, error } = await supabase
      .from('Survey')
      .delete()
      .match({ survey_id: survey_id });
  
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
    const survey_id = body['survey_id'];
    const name = body['name'];
    const description = body['description'];
    const section_count = body['section_count'];

    const { data, error } = await supabase
    .from('Survey')
    .update({ name: name, description: description, section_count: section_count })
    .eq('survey_id', survey_id)
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