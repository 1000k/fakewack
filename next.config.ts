import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      {
        protocol: 'https',
        hostname: process.env.BLOR_HOSTNAME,
        port: '',
      },
    ],
  },
};

export default nextConfig;
