import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mahdi Jafari Portfolio',
    short_name: 'Mahdi Jafari',
    description: 'AI-Native Systems Architect and Software Engineer',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
