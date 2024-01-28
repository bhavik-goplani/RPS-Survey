import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let user_role;
  if (user) {
      user_role = user.role;
  }
  else {
      user_role = 'none';
  }

  // const isParticipantPath = /^\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\/|$)/.test(req.url);
  console.log(user_role);

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && user_role === 'authenticated' && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (user && user_role === 'participant' && (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL(`/participant/${user.id}`, req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/participant/:path*'],
}