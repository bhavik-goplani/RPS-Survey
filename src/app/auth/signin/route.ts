import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body['email'])
  const password = String(body['password'])
  const supabase = createRouteHandlerClient<Database>({ cookies })

  console.log(email, password)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
    console.log(data, error)
  if (!error) {

    return NextResponse.redirect(new URL('/dashboard', request.url), {
      status: 302,
    })
  }
  else {
    console.log(error)
    return NextResponse.json({error}, {
      status: 401,
    })
  }
}