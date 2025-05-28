import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      {
        hostname: process.env.BLOR_HOSTNAME as string,
      },
    ],
  },
};

export default nextConfig;
