import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "src/util/auth0Utils";
import { createEmailTemplate } from "@/util/aws";
import z from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // const admin = await isAdmin(req, res);

  // if (!admin) {
  //   return res.status(403).json({ error: "Forbidden" });
  // }

  const payloadSchema = z.object({
    templateName: z.string(),
    subject: z.string(),
    htmlTemplate: z.string(),
  });

  const { templateName, subject, htmlTemplate } = payloadSchema.parse(req.body);

  const result = await createEmailTemplate(templateName, subject, htmlTemplate);
  return res.status(200).send(result);
};

export default handler; //withApiAuthRequired(handler);
