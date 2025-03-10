// "use server" - temporarily disabled for static export;
import { application_status_enums, Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

const CHECKED_IN_EVENT_ID = "Check In";

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

    console.log(data.event_id);

    if (eventId == CHECKED_IN_EVENT_ID) {
      await db.hacker_Applications.update({
        where: {
          userId: userId,
        },
        data: {
          application_status: application_status_enums.checked_in,
          check_in_status: true,
        },
      });
    }

    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new NextResponse("User already checked in", { status: 400 });
      }
    }

    return new NextResponse("Error checking in user", { status: 500 });
  }
};
