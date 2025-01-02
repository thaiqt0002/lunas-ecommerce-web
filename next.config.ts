import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.image.lunas.vn',
      },
    ],
  },
}

export default nextConfig
