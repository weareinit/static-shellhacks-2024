import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "src/util/auth0Utils";
import { createEmailTemplate, getEmailTemplates, removeEmailTemplate, updateEmailTemplate } from "@/util/aws";
import z from "zod";

const emailTemplateSchema = z.object({
  templateName: z.string(),
  subject: z.string(),
  htmlTemplate: z.string(),
});

async function sendEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  let emailTemplates = await getEmailTemplates();
  return res.status(200).json({ emailTemplates });
}

async function uploadEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  let body;
  try {
    body = emailTemplateSchema.parse(req.body);
  } catch (e) {
    return res.status(400).json({ message: "Could not parse request body to upload email template" });
  }

  const result = await createEmailTemplate(body.templateName, body.subject, body.htmlTemplate);
  return res.status(200).send(result);
}

const emailTemplateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET") {
    return sendEmailTemplates(req, res);
  }

  if (req.method === "POST") {
    return uploadEmailTemplates(req, res);
  }

  return res.status(403).json({ message: "Forbidden" });
};

export default withApiAuthRequired(emailTemplateHandler);
