import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient, application_status_enums } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { sendReminderEmailSchema } from "@/schemas/applicantSchemas";
import { sendAcceptanceEmails, sendConfirmationEmail } from "@/util/aws";
import { prisma } from "@/util/ApiUtils";

interface DummyRecord {
  first_name: string;
  email: string;
}

function generateRandomString(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function generateDummyRecords(count: number): DummyRecord[] {
  const dummyRecords: DummyRecord[] = [];

  for (let i = 0; i < count; i++) {
    const randomFirstName = generateRandomString(5);
    const randomEmail = `shellhackstest+${randomFirstName}@outlook.com`;

    dummyRecords.push({
      first_name: randomFirstName,
      email: randomEmail,
    });
  }

  return dummyRecords;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (process.env.NODE_ENV !== "development") {
    return res.status(401).json({ error: "Unauthorized. You are not allowed to access this route." });
  }

  const numberOfRecords = 200;
  const dummyApplicants = generateDummyRecords(numberOfRecords);

  try {
    await sendAcceptanceEmails(dummyApplicants, true);
  } catch (e) {
    return res.status(500).json({ message: "Internal Error. Could not send reminder email" });
  }

  return res.status(200).send({});
};

export default handler;
