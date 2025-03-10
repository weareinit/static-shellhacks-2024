import { NextResponse } from "next/server";

// Mark route as dynamic
export const dynamic = "force-dynamic";

// Return 404 for all API routes in production
export function GET() {
  return new NextResponse(null, { status: 404 });
}

export function POST() {
  return new NextResponse(null, { status: 404 });
}

// Prevent static generation
export function generateStaticParams() {
  return [];
}
