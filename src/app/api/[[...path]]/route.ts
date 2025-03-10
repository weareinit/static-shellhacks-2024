import { NextResponse } from "next/server";

// Mark route as dynamic
export const dynamic = "force-dynamic";

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

// Generate empty params to prevent static generation
export function generateStaticParams() {
  return [];
}

// Generate empty metadata to prevent static generation
export function generateMetadata() {
  return {};
}
