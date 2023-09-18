import './styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <title>RPS Survey</title>
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex justify-end">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }