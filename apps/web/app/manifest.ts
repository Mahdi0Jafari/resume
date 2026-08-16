import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mahdi Jafari Portfolio',
    short_name: 'Mahdi Jafari',
    description: 'AI-Native Systems Architect and Software Engineer',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#00F0FF',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
