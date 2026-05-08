import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  transpilePackages: ["@ev-platform/api-client", "@ev-platform/types", "@ev-platform/utils"],
};

export default nextConfig;
