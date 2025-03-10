// "use server" - temporarily disabled for static export;
import { db } from "@/server/db";
import { application_status_enums } from "@prisma/client";
import { sendAcceptanceEmails } from "./aws";

export const sendComfirmAttendenceReminderEmail = async () => {
  const acceptedHackers = await db.hacker_Applications.findMany({
    where: {
      application_status: {
        equals: application_status_enums.accepted,
      },
    },
    select: {
      first_name: true,
      email: true,
    },
  });

  await sendAcceptanceEmails(acceptedHackers, true);
};
