import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  generateSignedResumeUploadUrl,
  generateSignedResumeUrl,
  sendConfirmationEmail,
} from "src/util/aws";
import crypto from "crypto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //the reason this has to be a second route is because this one can't be authenticate
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const resumeId = crypto.randomBytes(16).toString("hex"); //generate unique resume name for each user
  const url: string = await generateSignedResumeUploadUrl(resumeId);

  res.status(200).json({ resumeId, url });
};

export default handler;
