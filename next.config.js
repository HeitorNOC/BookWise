/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx', 'tsx'],
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
