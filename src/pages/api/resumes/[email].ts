import { isAdmin } from "@/util/auth0Utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Hacker_Applications, PrismaClient } from "@prisma/client";
import { generateSignedResumeUploadUrl, generateSignedResumeUrl } from "@/util/aws";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/ApiUtils";
import { newApplicantSchema } from "@/schemas/applicantSchemas";
import z from "zod";

async function getResume(hacker: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const admin = await isAdmin(req, res);
  const session = await getSession(req, res);

  if (!admin && session?.user.email.toLowerCase() !== hacker.email.toLowerCase()) {
    return res.status(403).json({ message: "Forbidden. User does not have credentials to access this route." });
  }

  const url: string = await generateSignedResumeUrl(hacker.resume_path);
  return res.status(200).json({ url });
}

async function updateResume(hacker: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const admin = await isAdmin(req, res);
  const session = await getSession(req, res);

  if (!admin && session?.user.email.toLowerCase() !== hacker.email.toLowerCase()) {
    return res.status(403).json({ message: "Forbidden. User does not have credentials to access this route." });
  }

  const url = await generateSignedResumeUploadUrl(hacker.resume_path);
  return res.status(200).json({ url });
}

async function resumeHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.email == null) {
    return res.status(400).json({ message: "Error. Failed to pass in email" });
  }

  const email = req.query.email as string;

  const hacker = await prisma.hacker_Applications.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  if (hacker == null) {
    return res.status(404).json({ message: "Missing. User does not exist" });
  }

  if (hacker.resume_path == null) {
    return res.status(404).json({ message: "Missing. Resume for user does not exist" });
  }

  if (req.method === "GET") {
    return getResume(hacker, req, res);
  }

  if (req.method === "PUT") {
    return updateResume(hacker, req, res);
  }

  return res.status(403).json({ message: "Forbidden" });
}

export default withApiAuthRequired(resumeHandler);
