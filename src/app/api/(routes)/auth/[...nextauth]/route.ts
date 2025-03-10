import { NextResponse } from "next/server";

// import NextAuth from "next-auth";

// import { authOptions } from "@/server/auth";

// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

const isProduction = process.env.NODE_ENV === "production";

// Default handlers for production that return 404
const defaultHandlers = {
  GET: () => new NextResponse(null, { status: 404 }),
  POST: () => new NextResponse(null, { status: 404 }),
};

// Only use auth handlers in development
export const { GET, POST } = process.env.NODE_ENV === "production" ? defaultHandlers : await import("@/server/auth").then((m) => m.handlers);

// Generate static params for required auth routes
export function generateStaticParams() {
  return [{ nextauth: ["session"] }, { nextauth: ["signin"] }, { nextauth: ["signout"] }, { nextauth: ["callback"] }, { nextauth: ["credentials"] }];
}

// Generate metadata
export function generateMetadata() {
  return {
    title: "Authentication",
  };
}
