import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient, application_status_enums } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { sendDiscordEmailSchema, sendReminderEmailSchema } from "@/schemas/applicantSchemas";
import { sendAcceptanceEmails, sendConfirmationEmail, sendDiscordVerificationEmail } from "@/util/aws";
import { prisma } from "@/util/ApiUtils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  let bodyData;
  try {
    bodyData = sendDiscordEmailSchema.parse(req.body);
  } catch {
    res.status(400).json({ message: "Could not parse required email and discord_id fields" });
  }

  const applicant = await prisma.hacker_Applications.findFirst({
    where: { email: bodyData?.email },
    select: { email: true, discord_id: true },
  });

  if (applicant === null) {
    res.status(404).json({ error: "No applicant found with passed in email" });
  }

  if (applicant?.discord_id === bodyData?.discord_id) {
    res.status(200).json({ discord_id: applicant?.discord_id });
  } else if (applicant?.discord_id) {
    res.status(400).json({ message: "User already has a discord id verified which is not the same as passed" });
  }

  const hackerCode = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

  await prisma.hacker_Applications.update({
    where: {
      email: bodyData?.email as string,
    },
    data: { discord_verification_code: hackerCode },
  });

  await sendDiscordVerificationEmail(bodyData?.email as string, hackerCode);
  res.status(200);
};

export default withApiAuthRequired(handler);
