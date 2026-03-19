/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'najvagram.ir',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
