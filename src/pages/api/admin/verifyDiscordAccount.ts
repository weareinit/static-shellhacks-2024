import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/util/ApiUtils";
import { isGUI } from "@/util/auth0Utils";

const bodySchema = z.object({ email: z.string().nonempty(), verification_code: z.string().nonempty(), discord_id: z.string().nonempty() });
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isGUI(req, res)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  let bodyData;
  try {
    bodyData = bodySchema.parse(req.body);
  } catch {
    res.status(400).json({ message: "Could not parse required verification code and discord id for route" });
  }

  let applicant = await prisma.hacker_Applications.findFirst({
    where: {
      email: bodyData?.email,
    },
  });

  if (applicant === null) {
    res.status(404).json({ message: "Could not find applicant with provided email" });
  }

  if (applicant?.discord_verification_code === bodyData?.verification_code) {
    await prisma.hacker_Applications.update({
      where: {
        email: bodyData?.email,
      },
      data: {
        discord_id: bodyData?.discord_id,
      },
    });
    res.status(200).json({
      discord_id: bodyData?.discord_id,
      first_name: applicant?.first_name,
      last_name: applicant?.last_name,
    });
  }

  res.status(400).json({ message: "Verification codes do not match" });
}

export default handler;
