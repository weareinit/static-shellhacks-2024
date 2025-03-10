import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { getUserEventsData } from "@/app/api/(logic)/getUserEventsData";
import { checkInUserToEvent } from "@/app/api/(logic)/checkInUserToEvent";

// Static configuration for production builds
export const dynamic = process.env.NODE_ENV === "production" ? "error" : "force-dynamic";

// Return 404 in production
export function GET() {
  return new NextResponse(null, { status: 404 });
}

export function POST() {
  return new NextResponse(null, { status: 404 });
}

// Generate static params for build
export function generateStaticParams() {
  // For static export, we need to provide some IDs
  // These will only be used for static generation
  return [{ id: "placeholder" }];
}

// Generate metadata
export function generateMetadata() {
  return {
    title: "Hacker Events API",
  };
}

/*
 * Route to get the events that a user has checked into
 */
export const GET_AUTH = auth(async (request, { params }) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = request.auth.user.admin ? (params?.id as string) : request.auth.user.id;

  return await getUserEventsData(id);
});

/*
 * Route to check in a user to an event
 */
export const POST_AUTH = auth(async (request, { params }) => {
  if (!request.auth || !request.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = params?.id as string;

  const { eventId } = (await request.json()) as { eventId: string };

  return await checkInUserToEvent(id, eventId);
});
