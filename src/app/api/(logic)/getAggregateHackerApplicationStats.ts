import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export const getAggregateHackerApplicationStats = async () => {
  //   const session = await auth();
  //   if (!session?.user.admin) {
  //     return false;
  //   }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Total number of people registered
  const totalRegistered = await db.hacker_Applications.count();

  // Number of users registered by status
  const registeredByStatus = await db.hacker_Applications.groupBy({
    by: ["application_status"],
    _count: {
      application_status: true,
    },
  });

  // Number of users registered today
  const registeredToday = await db.hacker_Applications.count({
    where: {
      created_at: {
        gte: today,
      },
    },
  });

  // Date the last user registered
  const lastRegisteredUser = await db.hacker_Applications.findFirst({
    orderBy: {
      created_at: "desc",
    },
    select: {
      created_at: true,
    },
  });

  const data = {
    totalRegistered,
    registeredByStatus,
    registeredToday,
    lastRegisteredDate: lastRegisteredUser?.created_at,
  };

  return data;
};
