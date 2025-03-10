import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Only handle API routes in production
  if (process.env.NODE_ENV === "production" && request.nextUrl.pathname.startsWith("/api")) {
    return new NextResponse(null, { status: 404 });
  }
}

// Configure the middleware to run on API routes
export const config = {
  matcher: "/api/:path*",
};
