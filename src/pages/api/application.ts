import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { applicantUpdateSchema } from "@/schemas/applicantSchemas";
import { application_status_enums } from "@prisma/client";
import { sendConfirmationEmail } from "@/util/aws";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const email = session?.user?.email;

  const applicant = await prisma.hacker_Applications.findUnique({
    where: { email },
  });

  if (req.method === "GET") {
    res.status(200).json({ applicant });
  } else if (req.method === "PUT") {
    const payload = applicantUpdateSchema.parse(req.body);

    if (payload.application_status && payload.application_status == application_status_enums.confirmed) {
      //if the user is changing their application status to confirmed, make sure they were already accepted
      const existingStatus = applicant?.application_status;
      if (existingStatus !== application_status_enums.accepted) {
        return res.status(400).json({ error: "You must be accepted to confirm your application." });
      }

      //send the confirmation email
      await sendConfirmationEmail(applicant?.email as string, applicant?.first_name as string);
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
};

export default withApiAuthRequired(handler);
