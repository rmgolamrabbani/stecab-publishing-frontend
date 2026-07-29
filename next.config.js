/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Helpful for static exports or offline image fetching
  },
}

module.exports = nextConfig
