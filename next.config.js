/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/website',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/website',
};

module.exports = nextConfig;