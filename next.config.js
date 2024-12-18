/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:['maps.googleapis.com']
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build time
  },
}

module.exports = nextConfig
