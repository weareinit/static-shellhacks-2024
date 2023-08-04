import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Prisma, PrismaClient } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { generateApplicantCSV } from "@/util/generateApplicantCSV";
import { applicantStatusChangeSchema, applicantFiltersSchema } from "@/schemas/applicantSchemas";
import { newApplicantSchema } from "@/schemas/applicantSchemas";
import { sendConfirmationEmail } from "@/util/aws";
import { generateSignedResumeUploadUrl } from "@/util/aws";
import { randomBytes } from "crypto";
const prisma = new PrismaClient();

// async function updateApplicant(req: NextApiRequest, res: NextApiResponse) {
//   req.body = JSON.parse(req.body);
//   const { hacker_id, application_status } = applicantStatusChangeSchema.parse(req.body);

//   const updatedApplicant = await prisma.hacker_Applications.update({
//     where: { hacker_id },
//     data: { application_status },
//   });

//   return res.status(200).json(updatedApplicant);
// }

async function isValidCaptcha(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const { recaptcha } = req.body;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${recaptcha}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    method: "POST",
  });

  const captchaValidation = await response.json();
  return await captchaValidation.success;
}

async function getApplicant(req: NextApiRequest, res: NextApiResponse) {
  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(403).json({ message: "Forbidden. You are not allowed access to this route with the admin role." });
  }

  const filters = applicantFiltersSchema.parse({
    event_id: "1",
    ...req.query,
  });

  const outFormat = filters.format;
  delete filters.format;

  const filteredApplicants = await prisma.hacker_Applications.findMany({
    where: {
      ...filters,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (outFormat === "csv") {
    //export the csv of applicant data
    const csvData = await generateApplicantCSV(filteredApplicants);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=applicants.csv");
    return res.status(200).send(csvData);
  }
  return res.status(200).json(filteredApplicants);
}

async function createApplicant(req: NextApiRequest, res: NextApiResponse) {
  let captchaValid: boolean = await isValidCaptcha(req, res);
  if (!captchaValid) {
    return res.status(400).json({ message: "Captcha validation failed" });
  }

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user

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
    res.status(304);

    return res.status(500).json({ error: "Internal server error" });
  }
}

const applicationsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return getApplicant(req, res);
  }

  if (req.method === "POST") {
    return createApplicant(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default applicationsHandler;
