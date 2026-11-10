import type { NextConfig } from "next";

// GitHub Pages serves the site at /AI-bro-slop. configure-pages exports
// GITHUB_PAGES=true; a root deploy (Vercel) leaves the variable unset.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = "/AI-bro-slop";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        // Pages has no image-optimization server. The default loader is unsupported
        // with a static export. Cache Components enable PPR, which export mode rejects.
        images: {
          unoptimized: true,
        },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  // The dev server binds to 0.0.0.0, so browsers that open 127.0.0.1 are a
  // different host. Without this, Next blocks the dev assets and the page
  // never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
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
