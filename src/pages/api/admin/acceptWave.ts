import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient, application_status_enums } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await prisma.hacker_Applications.updateMany({
    where: { application_status: application_status_enums.in_wave },
    data: { application_status: application_status_enums.accepted },
  });

  return res.status(200).send({});
};

export default withApiAuthRequired(handler);
