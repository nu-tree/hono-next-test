import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  compiler: {
    removeConsole: false,
  },
  experimental: {
    reactCompiler: true,
    viewTransition: false,
  },
  output: 'standalone',
};

export default nextConfig;
