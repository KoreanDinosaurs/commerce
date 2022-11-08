/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
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
