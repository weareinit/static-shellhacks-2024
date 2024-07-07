"use server";
import { auth } from "@/server/auth";
import { application_status_enums } from "@prisma/client";
import { db } from "@/server/db";
import { sendAcceptanceEmails } from "@/app/util/aws";

export const adminAcceptWave = async () => {
  const session = await auth();
  if (!session || !session.user.admin) return false;

  const acceptedHackers = await db.hacker_Applications.findMany({
    where: {
      application_status: {
        equals: application_status_enums.in_wave,
      },
    },
    select: {
      first_name: true,
      email: true,
    },
  });

  try {
    //perform the mutation
    await db.hacker_Applications.updateMany({
      where: {
        application_status: {
          equals: application_status_enums.in_wave,
        },
      },
      data: {
        application_status: application_status_enums.accepted,
      },
    });

    //send the accepted email
    await sendAcceptanceEmails(acceptedHackers, false);
  } catch (e) {
    throw e;
  }
};
