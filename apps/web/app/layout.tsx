import './globals.css'
import './ecosystem-cards.css'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mahdijafari.ir'),
  title: {
    default: 'Mahdi Jafari | AI-Native Systems Architect',
    template: '%s | Mahdi Jafari'
  },
  description: 'AI-Native Systems Architect specializing in distributed systems, multi-agent orchestration, and high-performance production ecosystems.',
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
    'Next.js 15',
    'LangGraph',
    'Khonshu',
    'Najvagram',
    'Lyraz',
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
    description: 'AI-Native Systems Architect specializing in distributed systems and autonomous agent orchestration.',
    url: 'https://mahdijafari.ir',
    siteName: 'Mahdi Jafari',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: 'https://mahdijafari.ir/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mahdi Jafari | AI-Native Systems Architect & Software Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahdi Jafari | AI-Native Systems Architect',
    description: 'AI-Native Systems Architect specializing in distributed systems and autonomous agent orchestration.',
    creator: '@mahdi0jafari',
    site: '@mahdi0jafari',
    images: ['https://mahdijafari.ir/opengraph-image']
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
          "mahdi0jafari"
        ],
        "url": "https://mahdijafari.ir",
        "image": "https://mahdijafari.ir/profile.jpg",
        "jobTitle": "AI-Native Systems Architect & Software Engineer",
        "description": "Specializing in distributed systems, autonomous agent orchestration, and scalable high-performance production ecosystems.",
        "sameAs": [
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
        "@type": "WebSite",
        "@id": "https://mahdijafari.ir/#website",
        "url": "https://mahdijafari.ir",
        "name": "Mahdi Jafari | AI-Native Systems Architect",
        "description": "Official engineering hub and production ecosystem of Mahdi Jafari.",
        "publisher": { "@id": "https://mahdijafari.ir/#person" }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://mahdijafari.ir/#webpage",
        "url": "https://mahdijafari.ir",
        "name": "Mahdi Jafari Portfolio & Systems Hub",
        "isPartOf": { "@id": "https://mahdijafari.ir/#website" },
        "about": { "@id": "https://mahdijafari.ir/#person" },
        "mainEntity": { "@id": "https://mahdijafari.ir/#person" }
      },
      {
        "@type": "ItemList",
        "@id": "https://mahdijafari.ir/#ecosystem",
        "name": "Live Production Ecosystem",
        "description": "Engineered live production products designed and built by Mahdi Jafari.",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Khonshu",
              "operatingSystem": "Web",
              "applicationCategory": "FinanceApplication",
              "url": "https://khonshu.ir/",
              "description": "Real-time algorithmic quantitative trading terminal with sub-20ms WebSocket streaming and automated risk execution.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Najvagram",
              "operatingSystem": "Web",
              "applicationCategory": "CommunicationApplication",
              "url": "https://najvagram.ir/",
              "description": "E2EE anonymous messaging platform with train-compartment metaphor and ephemeral access keys.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Lyraz",
              "operatingSystem": "Web",
              "applicationCategory": "MultimediaApplication",
              "url": "https://lyraz.ir/landing",
              "description": "Collaborative sound grid with real-time live lyrics synchronization and Telegram bot integration.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "DoneSpace",
              "operatingSystem": "Web",
              "applicationCategory": "ProductivityApplication",
              "url": "https://donespace.ir/",
              "description": "Shared household management and chore-tracking OS with Google Calendar synchronization.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "m0j",
              "operatingSystem": "Web",
              "applicationCategory": "UtilitiesApplication",
              "url": "https://m0j.ir/",
              "description": "8-domain systemic life architecture and identity progression matrix.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "AnkiSynth AI",
              "operatingSystem": "Web",
              "applicationCategory": "EducationalApplication",
              "url": "https://mahdi0jafari.github.io/AnkiSynth/",
              "description": "AI knowledge forge transforming research papers into atomic spaced-repetition Anki decks.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Fanus",
              "operatingSystem": "Web",
              "applicationCategory": "SocialNetworkingApplication",
              "url": "https://fanus-space.ir/",
              "description": "Emotional digital sanctuary and night-time thought archive with candlelight aesthetic.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "CoWorkMap",
              "operatingSystem": "Web",
              "applicationCategory": "TravelApplication",
              "url": "http://coworkmap.ir/",
              "description": "Interactive geospatial directory and reservation system for 340+ coworking hubs in Iran.",
              "creator": { "@id": "https://mahdijafari.ir/#person" }
            }
          }
        ]
      }
    ]
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Lalezar&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Roboto+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700;800&family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" />
      </head>
      <body className={clsx(
        inter.variable, 
        jetbrainsMono.variable,
        spaceGrotesk.variable,
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
