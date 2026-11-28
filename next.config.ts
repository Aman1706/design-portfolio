import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export (to `out/`) for Cloudflare Pages: no Node server.
  output: "export",
  // No image-optimization server in a static export, so images are served as exported.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
