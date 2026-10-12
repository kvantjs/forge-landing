import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgdb.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
