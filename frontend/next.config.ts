import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable Strict Mode
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
