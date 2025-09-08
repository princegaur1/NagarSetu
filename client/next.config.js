/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'nagarsetuserver.auravena.shop'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nagarsetuserver.auravena.shop',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'nagarsetuserver.auravena.shop',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://nagarsetuserver.auravena.shop/api',
  },
}

module.exports = nextConfig
