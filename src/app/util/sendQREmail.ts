// "use server" - temporarily disabled for static export;
import { db } from "@/server/db";
import { application_status_enums } from "@prisma/client";
import { sendEmailWithQRCode } from "./aws";

export const sendQREmail = async () => {
  const applicants = await db.hacker_Applications.findMany({
    where: {
      application_status: {
        equals: application_status_enums.accepted,
      },
    },
    select: {
      first_name: true,
      email: true,
      userId: true
    },
  });

  sendEmailWithQRCode(applicants)
};

