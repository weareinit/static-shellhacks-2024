import { NextResponse } from "next/server";

// Mark all API routes as dynamic
export const dynamic = "force-dynamic";

// Return 404 for any API requests in production
export function GET() {
  return new NextResponse(null, { status: 404 });
}

export function POST() {
  return new NextResponse(null, { status: 404 });
}

// Prevent static generation of API routes
export function generateStaticParams() {
  return [];
}
