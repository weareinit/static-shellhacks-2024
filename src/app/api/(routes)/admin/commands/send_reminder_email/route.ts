import { type NextRequest, NextResponse } from "next/server";
import { application_status_enums } from "@prisma/client";
import { sendReminderEmailSchema } from "@/app/schemas/applicantSchemas";
import { sendAcceptanceEmails } from "@/app/util/aws";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

export const POST = auth(async (request) => {
  if (!request.auth || !request.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const emailType = sendReminderEmailSchema.parse(request.body);

  const applicants = await db.hacker_Applications.findMany({
    where: { application_status: emailType },
    select: { email: true, first_name: true },
  });

  try {
    if (emailType === application_status_enums.accepted) {
      await sendAcceptanceEmails(applicants, true);
    } else if (emailType === application_status_enums.confirmed) {
      //not sure what we'd do here?
    }
  } catch (e) {
    return NextResponse.json({
      error: "Internal Error. Could not send reminder email",
      status: 500,
    });
  }
  return NextResponse.json({ success: true }, { status: 200 });
});
