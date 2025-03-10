import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// For static export, we'll have a minimal middleware
export function middleware(request: NextRequest) {
  // In production static export, we don't need middleware functionality
  if (process.env.NODE_ENV === "production") {
    // Allow the landing page and static assets to be served
    return NextResponse.next();
  }
}

// Configure the middleware to run only on specific routes
export const config = {
  matcher: [
    // Only match routes that are actually needed for the landing page
    "/((?!_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
