import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { isAdmin } from "@/util/auth0Utils";
import { PrismaClient } from "@prisma/client";
import { generateSignedResumeUrl } from "src/util/aws";
import { generateSignedResumeUploadUrl } from "src/util/aws";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function getResume(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const email = session?.user?.email;
  const admin = await isAdmin(req, res);
  var resumeId;

  if (req.query.resumeId && admin) {
    resumeId = req.query.resumeId as string;
  } else {
    const userResume = await prisma.hacker_Applications.findUnique({
      where: { email },
      select: { resume_path: true },
    });
    resumeId = userResume?.resume_path ?? "";
  }

  const url: string = await generateSignedResumeUrl(resumeId);
  res.status(200).json({ url });
}

async function uploadResume(req: NextApiRequest, res: NextApiResponse) {
  const { recaptcha } = req.body;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${recaptcha}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    method: "POST",
  });
  const captchaValidation = await response.json();
  if (!captchaValidation.success) res.status(400).json({ error: "Captcha validation failed" });

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user
  const url: string = await generateSignedResumeUploadUrl(resumeId);

  res.status(200).json({ resumeId, url });
}

async function resumeHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getResume(req, res);
  }

  if (req.method === "POST") {
    return uploadResume(req, res);
  }

  return res.status(403).json({ message: "Forbidden" });
}

export default withApiAuthRequired(resumeHandler);
