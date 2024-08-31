"use server";
import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

const CHECKED_IN_EVENT_ID = "CheckedIn";

export const checkInUserToEvent = async (userId: string, eventId: string) => {
  try {
    const user_checkedin = await db.eventsTracker.findFirst({
      where: {
        user_id: userId,
        event_id: CHECKED_IN_EVENT_ID,
      },
    });

    if (!user_checkedin && eventId !== CHECKED_IN_EVENT_ID) {
      return new NextResponse("User has not checked in for the hackathon", { status: 400 });
    }

    const data = await db.eventsTracker.create({
      data: {
        user_id: userId,
        event_id: eventId,
      },
    });

    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new NextResponse("User already checked in", { status: 400 });
      }
    }

    console.error(e);
    return new NextResponse("Error checking in user", { status: 500 });
  }
};
