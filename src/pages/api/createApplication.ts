import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { sendConfirmationEmail } from "src/util/aws";
import { newApplicantSchema } from "@/schemas/applicantSchemas";
import { generateSignedResumeUploadUrl } from "src/util/aws";
import crypto from "crypto";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //the reason this has to be a second route is because this one can't be authenticate
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recaptcha } = req.body;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${recaptcha}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    method: "POST",
  });

  const captchaValidation = await response.json();
  if (!captchaValidation.success) return res.status(400).json({ error: "Captcha validation failed" });
  delete req.body.recaptcha;

  const resumeId = crypto.randomBytes(16).toString("hex"); //generate unique resume name for each user

  const validatedApplicant = newApplicantSchema.parse({
    event_id: "1", //req.query.eventId,
    resume_path: resumeId,
    ...req.body,
  });

  const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
    ...validatedApplicant,
  };
  console.log("validated", validatedApplicant);

  try {
    const applicant = await prisma.hacker_Applications.create({
      data: newApplicant,
    });

    await sendConfirmationEmail(validatedApplicant.email, validatedApplicant.first_name);
    const url: string = await generateSignedResumeUploadUrl(resumeId);

    return res.status(200).json({ resume_url: url });
  } catch (e) {
    console.log("Error occured!", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "User already exists with that email." });
      }
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
