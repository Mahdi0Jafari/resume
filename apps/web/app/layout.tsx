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
  metadataBase: new URL('https://mahdijafari.ir'),
  title: {
    default: 'mahdi0jafari | AI-Native Systems Architect',
    template: '%s | mahdi0jafari'
  },
  description: 'Specializing in distributed systems and autonomous agent orchestration. Explore my projects and AI capabilities.',
  keywords: ['Systems Architect', 'Software Engineer', 'Mahdi Jafari', 'AI', 'Next.js', 'FastAPI', 'Agentic Workflow'],
  authors: [{ name: 'Mahdi Jafari', url: 'https://mahdijafari.ir' }],
  creator: 'Mahdi Jafari',
  publisher: 'Mahdi Jafari',
  openGraph: {
    title: 'mahdi0jafari | AI-Native Systems Architect',
    description: 'Specializing in distributed systems and autonomous agent orchestration.',
    url: 'https://mahdijafari.ir',
    siteName: 'mahdi0jafari',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mahdi0jafari | AI-Native Systems Architect',
    description: 'Specializing in distributed systems and autonomous agent orchestration.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahdi Jafari",
              url: "https://mahdijafari.ir",
              jobTitle: "Systems Architect & Software Engineer",
              sameAs: [
                "https://github.com/mahdi0jafari"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  )
}
