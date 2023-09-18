import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient<Database>({ cookies })

  try {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return NextResponse.redirect(new URL('/dashboard', request.url), {
      status: 302,
    })
  } catch (error) {
    return NextResponse.json({error}, {
      status: 401,
    })
  }
}