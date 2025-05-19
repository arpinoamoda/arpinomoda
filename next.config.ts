import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable automatic static optimization for Cloudflare compatibility
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
