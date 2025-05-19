import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using Cloudflare Next.js adapter instead of static export
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.arpinomoda.ca',
      }
    ],
  },
  // This is recommended for Cloudflare
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
