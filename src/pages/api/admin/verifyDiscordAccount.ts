import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/util/ApiUtils";
import { isGUI } from "@/util/auth0Utils";
import { sendDiscordLinkedSuccessEmail } from "@/util/aws";

const bodySchema = z.object({ email: z.string().nonempty(), verification_code: z.string().nonempty(), discord_id: z.string().nonempty(), discord_username: z.string().nonempty() });
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isGUI(req, res)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let bodyData;
  try {
    bodyData = bodySchema.parse(req.body);
  } catch {
    return res.status(400).json({ message: "Could not parse required verification code and discord id for route" });
  }

  const applicant = await prisma.hacker_Applications.findFirst({
    where: {
      email: {
        equals: bodyData.email,
        mode: "insensitive",
      },
    },
    select: { email: true, discord_id: true, application_status: true, first_name: true, last_name: true, discord_verification_code: true },
  });

  if (applicant === null) {
    return res.status(404).json({ message: "Could not find applicant with provided email" });
  }

  if (applicant.discord_verification_code?.toLowerCase() === bodyData.verification_code.toLowerCase()) {
    await prisma.hacker_Applications.updateMany({
      where: {
        email: {
          equals: bodyData.email,
          mode: "insensitive",
        },
      },
      data: {
        discord_id: bodyData.discord_id,
        discord: bodyData.discord_username,
      },
    });

    await sendDiscordLinkedSuccessEmail(bodyData.email, bodyData.discord_username, applicant.first_name);

    return res.status(200).json({
      discord_id: bodyData.discord_id,
      first_name: applicant.first_name,
      last_name: applicant.last_name,
    });
  }

  return res.status(400).json({ message: "Verification codes do not match" });
}

export default handler;
