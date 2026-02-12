/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SECONDME_CLIENT_ID: process.env.NEXT_PUBLIC_SECONDME_CLIENT_ID,
    NEXT_PUBLIC_SECONDME_REDIRECT_URI: process.env.NEXT_PUBLIC_SECONDME_REDIRECT_URI,
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig
