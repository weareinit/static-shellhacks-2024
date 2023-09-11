import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, application_status_enums } from "@prisma/client";
import { isGUI } from "src/util/auth0Utils";
import { sendDiscordEmailSchema } from "@/schemas/applicantSchemas";
import { sendDiscordVerificationEmail } from "@/util/aws";
import { prisma } from "@/util/ApiUtils";
import crypto from "crypto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method not allowed: ${req.method}` });
  }

  if (!isGUI(req, res)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  let bodyData;
  try {
    bodyData = sendDiscordEmailSchema.parse(req.body);
  } catch (e) {
    return res.status(400).json({ message: "Could not parse required email and discord_id fields" });
  }

  const applicant = await prisma.hacker_Applications.findFirst({
    where: {
      email: {
        equals: bodyData.email,
        mode: "insensitive",
      },
    },
    select: { email: true, discord_id: true, application_status: true },
  });

  if (applicant === null) {
    return res.status(404).json({ error: "No applicant found with passed in email" });
  } else if (applicant.application_status !== application_status_enums.confirmed && applicant.application_status !== application_status_enums.checked_in) {
    return res.status(400).json({ message: "You must be a confirmed hacker to link your discord and ShellHacks account", ...applicant });
  }

  if (applicant?.discord_id === bodyData?.discord_id) {
    return res.status(200).json({ ...applicant });
  } else if (applicant?.discord_id) {
    return res.status(400).json({ message: "User already has a discord id verified which is not the same as passed", ...applicant });
  }

  const hackerCode = crypto.randomBytes(2).toString("hex").toUpperCase();

  await prisma.hacker_Applications.update({
    where: {
      email: bodyData?.email as string,
    },
    data: { discord_verification_code: hackerCode },
  });

  await sendDiscordVerificationEmail(bodyData.email, hackerCode);
  return res.status(200).json({ ...applicant });
};

export default handler;
