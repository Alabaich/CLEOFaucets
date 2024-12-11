// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next",

};

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add Firebase Storage domain here
  },
};

export default nextConfig;
