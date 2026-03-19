import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata = {
  title: 'mahdi0jafari | AI-Native Systems Architect',
  description: 'Specializing in distributed systems and autonomous agent orchestration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={clsx(
        inter.variable, 
        jetbrainsMono.variable,
        "antialiased selection:bg-brand-accent selection:text-brand-background px-4 py-6 md:px-12 md:py-12 max-w-[1400px] mx-auto font-sans"
      )}>
        {children}
      </body>
    </html>
  )
}
