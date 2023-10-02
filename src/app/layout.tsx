import './styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NavBar } from '@/components/nav-bar'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>RPS Survey</title>
        </head>
        <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            <div className="curved-gradient"></div>
              {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    )
  }