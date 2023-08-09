import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient, application_status_enums } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { sendReminderEmailSchema } from "@/schemas/applicantSchemas";
import { sendAcceptanceEmails, sendConfirmationEmail } from "@/util/aws";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const emailType = sendReminderEmailSchema.parse(req.body);

  const applicants = await prisma.hacker_Applications.findMany({
    where: { application_status: emailType },
    select: { email: true, first_name: true },
  });

  try {
    if (emailType === application_status_enums.accepted) {
      await sendAcceptanceEmails(applicants, true);
    } else if (emailType === application_status_enums.confirmed) {
      //send a reminder for people who haven't yet confirmed
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Error. Could not send reminder email" });
  }

  return res.status(200).send({});
};

export default withApiAuthRequired(handler);
