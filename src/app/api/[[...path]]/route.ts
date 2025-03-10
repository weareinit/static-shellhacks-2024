import { NextResponse } from "next/server";

// Static configuration for production builds
export const dynamic = process.env.NODE_ENV === "production" ? "error" : "force-dynamic";

// Handle all API routes
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");

  // Handle root path
  if (!path || path === "/") {
    return NextResponse.json("Hello World");
  }

  // Return 404 for all other API routes in production
  return new NextResponse(null, { status: 404 });
}

export async function POST() {
  return new NextResponse(null, { status: 404 });
}

// Generate static params for build
export function generateStaticParams() {
  return [
    { path: [] }, // /api
    { path: ["placeholder"] }, // /api/placeholder
  ];
}

// Generate metadata
export function generateMetadata() {
  return {
    title: "API Routes",
  };
}
