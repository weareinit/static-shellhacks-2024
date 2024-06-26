"use server";
import { auth } from "@/server/auth";
import { application_status_enums } from "@prisma/client";
import { db } from "@/server/db";

export const adminAcceptWave = async () => {
  const session = await auth();
  if (!session || !session.user.admin) return false;

  const data = await db.hacker_Applications.updateMany({
    where: {
      application_status: {
        equals: application_status_enums.in_wave,
      },
    },
    data: {
      application_status: application_status_enums.accepted,
    },
  });

  return data;
};
