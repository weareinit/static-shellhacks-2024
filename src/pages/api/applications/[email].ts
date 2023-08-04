import { NextApiRequest, NextApiResponse } from "next";
import { Hacker_Applications, PrismaClient, application_status_enums } from "@prisma/client";
import { applicantUpdateSchema } from "@/schemas/applicantSchemas";
import { sendStatusConfirmedEmail } from "@/util/aws";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "@/util/auth0Utils";

const prisma = new PrismaClient();

async function getApplicant(applicant: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const admin = await isAdmin(req, res);
  if (session == null) {
    return res.status(403).json({ message: "Request must be made from authenticated source." });
  }
  if (!admin && session.user.email !== applicant.email) {
    return res.status(403).json({ message: "Forbidden. User does not have access to this route." });
  }
  return res.status(200).json({ applicant });
}

async function updateApplicant(applicant: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email as string;
  const payload = applicantUpdateSchema.parse(req.body);

  if (payload.application_status && payload.application_status == application_status_enums.confirmed) {
    //if the user is changing their application status to confirmed, make sure they were already accepted
    const existingStatus = applicant?.application_status;
    if (existingStatus !== application_status_enums.accepted) {
      return res.status(400).json({ error: "You must be accepted to confirm your application." });
    }

    //send the confirmation email
    await sendStatusConfirmedEmail({ email: applicant?.email!, first_name: applicant?.first_name! });
  }

  // if (payload.resume_path) {
  //   //if the user is changing their resume, delete the old one from s3
  //   const oldResumePath = applicant?.resume_path;

  //   await deleteResume(oldResumePath?.resume_path as string);
  //   console.log("deleting resume...");
  // }

  const result = await prisma.hacker_Applications.update({
    where: { email },
    data: payload,
  });

  res.status(200).json({ result });
}

async function applicationHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.email === undefined) {
    return res.status(400).json({ message: "Email not passed" });
  }

  let applicant = await prisma.hacker_Applications.findFirst({
    where: {
      email: req.query.email as string,
    },
  });

  if (applicant === null) {
    return res.status(404).json({ message: "Applicant not found with passed in email" });
  }

  if (req.method === "GET") {
    return getApplicant(applicant, req, res);
  }

  if (req.method === "PUT") {
    return updateApplicant(applicant, req, res);
  }
}

export default withApiAuthRequired(applicationHandler);
