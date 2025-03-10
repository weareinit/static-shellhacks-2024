// "use server" - temporarily disabled for static export;
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const getEventCheckInCounts = async () => {
  const session = await auth();

  if (!session || !session.user.admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const checkInsData = await db.eventsTracker.groupBy({
    by: ["event_id"],
    _count: {
      id: true,
    },
  });

  const totalCheckIns = checkInsData.reduce((sum, event) => sum + event._count.id, 0);

  const checkInsPerEvent = checkInsData.map((event) => ({
    event_id: event.event_id,
    checkInCount: event._count.id,
  }));

  return NextResponse.json(
    {
      totalCheckIns,
      checkInsPerEvent,
    },
    { status: 200 },
  );
};
