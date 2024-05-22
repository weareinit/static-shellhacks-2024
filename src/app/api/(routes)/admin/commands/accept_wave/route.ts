import { NextResponse } from "next/server";
import { application_status_enums } from "@prisma/client";
import { sendAcceptanceEmails } from "@/app/util/aws";
import { db } from "@/server/db";

export async function POST() {
  const applicants = await db.hacker_Applications.findMany({
    where: { application_status: application_status_enums.in_wave },
    select: { email: true, first_name: true },
  });

  await db.hacker_Applications.updateMany({
    where: { application_status: application_status_enums.in_wave },
    data: { application_status: application_status_enums.accepted },
  });

  await sendAcceptanceEmails(applicants);
  return NextResponse.json({ success: true });
}
