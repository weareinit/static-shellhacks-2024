import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { applicantUpdateSchema } from "@/schemas/applicantSchemas";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const email = session?.user?.email;

  if (req.method === "GET") {
    const applicant = await prisma.hacker_Applications.findUnique({
      where: { email },
    });

    res.status(200).json({ applicant });
  } else if (req.method === "PUT") {
    const payload = applicantUpdateSchema.parse(req.body);

    if (payload.resume_path) {
      //if the user is changing their resume, delete the old one from s3
      const oldResumePath = await prisma.hacker_Applications.findUnique({
        where: {
          email,
        },
        select: {
          resume_path: true,
        },
      });

      //await deleteResume(oldResumePath?.resume_path as string);
      console.log("deleting resume...");
    }

    const applicant = await prisma.hacker_Applications.update({
      where: { email },
      data: payload,
    });

    res.status(200).json({ applicant });
  }
};

export default withApiAuthRequired(handler);
