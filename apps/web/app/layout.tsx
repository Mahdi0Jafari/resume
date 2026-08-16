import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import clsx from 'clsx'
import type { Metadata } from 'next'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://mahdijafari.ir'),
  title: {
    default: 'Mahdi Jafari | AI-Native Systems Architect & Software Engineer',
    template: '%s | Mahdi Jafari'
  },
  description: 'Specializing in distributed systems, high-performance architecture, and autonomous agent orchestration. Explore open-source projects, architecture designs, and AI capabilities.',
  keywords: [
    'Mahdi Jafari',
    'مهدی جعفری',
    'محمدمهدی جعفری',
    'Mohammad Mahdi Jafari',
    'mahdi0jafari',
    'Systems Architect',
    'Distributed Systems',
    'Software Engineer',
    'AI Agents',
    'Agentic Workflow',
    'FastAPI',
    'Next.js',
    'Autonomous Systems'
  ],
  alternates: {
    canonical: 'https://mahdijafari.ir',
  },
  authors: [{ name: 'Mahdi Jafari', url: 'https://mahdijafari.ir' }],
  creator: 'Mahdi Jafari',
  publisher: 'Mahdi Jafari',
  openGraph: {
    title: 'Mahdi Jafari | AI-Native Systems Architect',
    description: 'Specializing in distributed systems and autonomous agent orchestration.',
    url: 'https://mahdijafari.ir',
    siteName: 'Mahdi Jafari Portfolio',
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahdi Jafari | AI-Native Systems Architect',
    description: 'Specializing in distributed systems and autonomous agent orchestration.',
    creator: '@mahdi0jafari',
    site: '@mahdi0jafari',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mahdijafari.ir/#person",
        "name": "Mahdi Jafari",
        "legalName": "Mohammad Mahdi Jafari",
        "alternateName": [
          "مهدی جعفری",
          "محمدمهدی جعفری",
          "Mohammad Mahdi Jafari",
          "Mohammadmahdi Jafari",
          "mahdi0jafari",
          "جفری"
        ],
        "url": "https://mahdijafari.ir",
        "image": "https://mahdijafari.ir/profile.jpg",
        "jobTitle": "AI-Native Systems Architect & Software Engineer",
        "description": "Specializing in distributed systems, autonomous agent orchestration, and scalable cloud architectures.",
        "sameAs": [
          "https://www.wikidata.org/wiki/Q141102823",
          "https://github.com/mahdi0jafari",
          "https://www.linkedin.com/in/mahdi0jafari/",
          "https://x.com/mahdi0jafari",
          "https://t.me/mahdi0jafari"
        ],
        "knowsAbout": [
          {
            "@type": "DefinedTerm",
            "name": "Distributed computing",
            "sameAs": "https://www.wikidata.org/wiki/Q180634"
          },
          {
            "@type": "DefinedTerm",
            "name": "Artificial intelligence",
            "sameAs": "https://www.wikidata.org/wiki/Q11660"
          },
          {
            "@type": "DefinedTerm",
            "name": "Software architecture",
            "sameAs": "https://www.wikidata.org/wiki/Q858547"
          },
          {
            "@type": "DefinedTerm",
            "name": "Next.js",
            "sameAs": "https://www.wikidata.org/wiki/Q104841924"
          },
          {
            "@type": "DefinedTerm",
            "name": "FastAPI",
            "sameAs": "https://www.wikidata.org/wiki/Q108605051"
          },
          {
            "@type": "DefinedTerm",
            "name": "Python",
            "sameAs": "https://www.wikidata.org/wiki/Q28865"
          }
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://mahdijafari.ir/#webpage",
        "url": "https://mahdijafari.ir",
        "name": "Mahdi Jafari Portfolio & Systems Hub",
        "about": { "@id": "https://mahdijafari.ir/#person" },
        "mainEntity": { "@id": "https://mahdijafari.ir/#person" }
      }
    ]
  }

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
            __html: JSON.stringify(jsonLd)
          }}
        />
        {children}
      </body>
    </html>
  )
}
