// "use server" - temporarily disabled for static export;
import { auth } from "@/server/auth";
import { application_status_enums } from "@prisma/client";
import { db } from "@/server/db";

export const changeApplicationStatus = async (
  applicationIds: number[],
  status: application_status_enums,
) => {
  const session = await auth();
  if (!session) return false;

  //if the user is not admin, they can only change their own application status
  if (
    !session.user.admin &&
    (applicationIds.length > 1 || applicationIds[0] !== session.user.hacker_id)
  ) {
    return false;
  }

  //update the application status
  const data = await db.hacker_Applications.updateMany({
    where: {
      id: {
        in: applicationIds,
      },
    },
    data: {
      application_status: status,
    },
  });

  console.log(data);
};
