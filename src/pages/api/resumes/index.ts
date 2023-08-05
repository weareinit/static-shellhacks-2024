import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { generateSignedResumeUploadUrl } from "src/util/aws";
import { randomBytes } from "crypto";
import { validateCaptcha } from "@/util/ApiUtils";

async function uploadResume(req: NextApiRequest, res: NextApiResponse) {
  validateCaptcha(req, res);

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user
  const url: string = await generateSignedResumeUploadUrl(resumeId);

  res.status(200).json({ resumeId, url });
}

async function resumeHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return uploadResume(req, res);
  }

  return res.status(403).json({ message: "Forbidden" });
}

export default withApiAuthRequired(resumeHandler);
