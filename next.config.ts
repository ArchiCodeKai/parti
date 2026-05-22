import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [],
  },
  // 排除 design-reference 不進 build
  webpack: (config) => {
    config.module.rules.push({
      test: /design-reference/,
      use: "null-loader",
    });
    return config;
  },
};

export default nextConfig;
