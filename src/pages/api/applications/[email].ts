import { NextApiRequest, NextApiResponse } from "next";
import { Hacker_Applications, PrismaClient, application_status_enums } from "@prisma/client";
import { applicantUpdateSchema, user_changeable_application_statuses } from "@/schemas/applicantSchemas";
import { sendStatusConfirmedEmail } from "@/util/aws";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "@/util/auth0Utils";
import { prisma } from "@/util/ApiUtils";

async function getApplicant(applicant: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const admin = await isAdmin(req, res);
  if (!admin && session?.user.email.toLowerCase() !== applicant.email.toLowerCase()) {
    return res.status(401).json({ message: "Unauthorized. User does not have access to this route." });
  }

  return res.status(200).json(applicant);
}

async function updateApplicant(applicant: Hacker_Applications, req: NextApiRequest, res: NextApiResponse) {
  const newApplicantInfo = {
    email: req.query.email,
    ...req.body,
  };

  const parsedResult = applicantUpdateSchema.safeParse(newApplicantInfo);
  if (!parsedResult.success) {
    return res.status(400).json({ message: `Error. Could not parse provided update applicant information ${JSON.stringify(parsedResult.error)}` });
  }

  const { email, ...payload } = parsedResult.data;

  const admin = await isAdmin(req, res);
  if (admin) {
    try {
      const result = await prisma.hacker_Applications.updateMany({
        where: {
          email: {
            equals: email,
            mode: "insensitive",
          },
        },
        data: payload,
      });
      return res.status(200).json({ result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Error. Could not update user as admin" });
    }
  }

  const session = await getSession(req, res);
  if (session?.user.email.toLowerCase() !== applicant.email.toLowerCase()) {
    return res.status(401).json({ message: "Unauthorized. You are not authorized to change another user's application" });
  }

  const appStatus = payload.application_status;
  if (appStatus != null && !user_changeable_application_statuses.includes(appStatus as any)) {
    console.log("session user email: ", session?.user.email, "applicant email: ", applicant.email);
    console.log("app status: ", appStatus, "user changeable statuses: ", user_changeable_application_statuses);
    return res.status(401).json({ message: "Unauthorized. You are not authorized to change your status outside of conformed and withdrawn" });
  }

  if (appStatus == application_status_enums.confirmed) {
    //if the user is changing their application status to confirmed, make sure they were already accepted
    const existingStatus = applicant?.application_status;
    if (existingStatus !== application_status_enums.accepted) {
      return res.status(400).json({ error: "Error. You must be accepted to confirm your application." });
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

  try {
    const result = await prisma.hacker_Applications.update({
      where: { email: applicant.email },
      data: payload,
    });
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ message: "Failed updating user with user permissions" });
  }
}

async function applicationHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.email === undefined) {
    return res.status(400).json({ message: "Email not passed" });
  }

  const applicant = await prisma.hacker_Applications.findFirst({
    where: {
      email: {
        equals: req.query.email as string,
        mode: "insensitive",
      },
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

  return res.status(405).json({ message: "Method is not allowed for this route" });
}

export default withApiAuthRequired(applicationHandler);
