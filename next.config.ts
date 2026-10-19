import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
