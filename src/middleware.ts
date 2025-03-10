import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Handle all dynamic routes in production
export function middleware(request: NextRequest) {
  // Only handle dynamic routes in production
  if (process.env.NODE_ENV === "production") {
    const { pathname } = request.nextUrl;

    // Handle API routes
    if (pathname.startsWith("/api")) {
      return new NextResponse(null, { status: 404 });
    }

    // Handle other dynamic routes
    if (pathname.includes("[") || pathname.includes("]")) {
      return new NextResponse(null, { status: 404 });
    }
  }
}

// Configure the middleware to run on all routes
export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
    // Match all dynamic routes
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
