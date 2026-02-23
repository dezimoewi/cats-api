import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "*.thecatapi.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
