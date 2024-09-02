import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { getUserEventsData } from "@/app/api/(logic)/getUserEventsData";
import { checkInUserToEvent } from "@/app/api/(logic)/checkInUserToEvent";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

/*
 * Route to get the events that a user has checked into
 */
export const GET = auth(async (request, { params }) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = request.auth.user.admin ? (params?.id as string) : request.auth.user.id;

  return await getUserEventsData(id);
});

/*
 * Route to check in a user to an event
 */
export const POST = auth(async (request, { params }) => {
  if (!request.auth || !request.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = params?.id as string;

  const { eventId } = (await request.json()) as { eventId: string };

  return await checkInUserToEvent(id, eventId);
});
