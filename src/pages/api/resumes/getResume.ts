import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { generateSignedResumeUrl } from "src/util/aws";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession(req, res);
  const email = session?.user?.email;
  const admin = await isAdmin(req, res);

  var resumeId;

  if (req.query.resumeId && admin) {
    resumeId = req.query.resumeId as string;
  } else {
    const userResume = await prisma.hacker_Applications.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: { resume_path: true },
    });
    resumeId = userResume?.resume_path ?? "";
  }

  const url: string = await generateSignedResumeUrl(resumeId);
  res.status(200).json({ url });
};

export default withApiAuthRequired(handler);
