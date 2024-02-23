import './styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NavBar } from '@/components/navbar/nav-bar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    let userRole = '';
    if (user) {
        userRole = user.role as string;
    }

    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>RPS Survey</title>
        </head>
        <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar session={session} userRole={userRole}/>
            <div className="curved-gradient"></div>
              {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    )
  }