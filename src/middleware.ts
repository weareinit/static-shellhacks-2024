import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "./server/auth";

const AUTHENTICATED_ROUTES = ["/hackers/", "/admin"];
const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //log the request
  console.log(`${request.mode}: ${pathname}`);

  if (AUTHENTICATED_ROUTES.some((route) => pathname.startsWith(route))) {
    const session = await getServerAuthSession();
    if (!session) {
      //don't know if we want to return an error here or redirect
      return NextResponse.redirect("/api/auth/signin");
    }

    // if the hacker tries to access a different hacker's data
    if (pathname.startsWith("/hackers/")) {
      //is the / character allowed in email addresses?
      const email = pathname.split("/")[2];
      if (email && session.user.email !== email) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    // check for admin privileges on admin routes
    if (
      ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
      !session.user.admin
    ) {
      return NextResponse.redirect("/api/auth/signin");
    }
  }
}

export const config = {
  matcher: "/api/:path*", // Match any request that starts with /api
};
