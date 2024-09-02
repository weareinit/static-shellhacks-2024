"use server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const getUserEventsData = async (userId: string) => {
  const session = await auth();

  //if the user is not admin, they cannot proceed
  if (!session || !session.user.admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  //update the application status
  const events = await db.eventsTracker.findMany({
    where: {
      user_id: userId,
    },
    // include: {
    //   user: {
    //     include: {
    //       hacker_application: {
    //         select: {
    //           first_name: true,
    //           application_status: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  const user = await db.hacker_Applications.findFirst({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json({ events, user }, { status: 200 });
};
