/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
process.env.SKIP_ENV_VALIDATION = "1";
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  output: "export", // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: "", // No basePath needed with custom domain
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable dynamic routes in production
  experimental: {
    disableOptimizedLoading: true,
  },
  // Required for static export
  trailingSlash: true,
  // Only include the landing page for static export
  distDir: "out",
  // Exclude all pages except the landing page in production
  pageExtensions: process.env.NODE_ENV === "production" ? ["landing.tsx", "landing.ts", "landing.jsx", "landing.js"] : ["tsx", "ts", "jsx", "js"],
  // Ensure static assets are copied
  assetPrefix: "", // No assetPrefix needed with custom domain
  // Configure static file serving
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|ttf|woff2?)$/i,
      type: "asset/resource",
      generator: {
        filename: (pathData) => {
          // Remove 'src' from the path if it exists
          const relativePath = pathData.filename.replace(/^src\//, "");
          return `static/media/${relativePath}`;
        },
        publicPath: "/_next/", // No prefix needed with custom domain
      },
    });
    return config;
  },
};

export default config;
