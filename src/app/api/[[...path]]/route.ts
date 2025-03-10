import { NextResponse } from "next/server";

// Mark route as dynamic
export const dynamic = "force-dynamic";

// Return 404 for all API routes in production
export async function GET() {
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
