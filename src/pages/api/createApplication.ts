import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { sendConfirmationEmail } from "src/util/aws";
import { newApplicantSchema } from "@/schemas/applicantSchemas";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //the reason this has to be a second route is because this one can't be authenticate
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const validatedApplicant = newApplicantSchema.parse({
    event_id: "1", //req.query.eventId,
    ...req.body,
  });

  const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
    ...validatedApplicant,
  };

  try {
    const applicant = await prisma.hacker_Applications.create({
      data: newApplicant,
    });

    const confirmationEmailStatus = await sendConfirmationEmail(
      validatedApplicant.email,
      validatedApplicant.first_name
    );
    res.status(200).json({ applicant });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res
          .status(409)
          .json({ message: "User already exists with that email." });
      }
    }
  }
};

export default handler;
