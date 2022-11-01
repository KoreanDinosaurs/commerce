/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'picsum.photos',
      'kream-phinf.pstatic.net',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = nextConfig
