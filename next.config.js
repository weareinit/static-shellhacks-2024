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
  basePath: "/shellhacks-2024", // Replace with your repository name
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exclude auth routes from static export
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
};

export default config;
