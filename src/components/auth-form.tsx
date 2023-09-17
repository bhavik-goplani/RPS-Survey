'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useTheme } from "next-themes"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const { theme } = useTheme();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme={theme === 'dark' || theme === 'system' ? 'dark' : 'light'}
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}