import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { sendConfirmationEmail } from "src/util/aws";
import { newApplicantSchema } from "@/schemas/applicantSchemas";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //the reason this has to be a second route is because this one can't be authenticate
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  delete req.body.recaptcha; //maybe do something with this in the future?

  const validatedApplicant = newApplicantSchema.parse({
    event_id: "1", //req.query.eventId,
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
    console.log("inserted applicant");

    const confirmationEmailStatus = await sendConfirmationEmail(validatedApplicant.email, validatedApplicant.first_name);
    return res.status(200).json({ applicant });
  } catch (e) {
    console.log("Error occured!", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "User already exists with that email." });
      }
    }

    return res.status(500).json({ error: "Internal server error" });
  }

  console.log("got here");
};

export default handler;
