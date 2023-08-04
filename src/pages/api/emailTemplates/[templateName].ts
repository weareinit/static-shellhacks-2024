import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { removeEmailTemplate, updateEmailTemplate } from "@/util/aws";
import z from "zod";

const emailTemplateSchema = z.object({
  subject: z.string(),
  htmlTemplate: z.string(),
});

async function deleteEmailTemplate(req: NextApiRequest, res: NextApiResponse) {
  const templateName = req.query.templateName as string;
  try {
    const result = removeEmailTemplate(templateName);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ message: "Error deleting email template" });
  }
}

async function putEmailTemplate(req: NextApiRequest, res: NextApiResponse) {
  const templateName = req.query.templateName as string;
  let body;
  try {
    body = emailTemplateSchema.parse(req.body);
  } catch (e) {
    return res.status(400).json({ message: "Could not parse request body to update email template" });
  }

  try {
    const result = updateEmailTemplate(templateName, body.subject, body.htmlTemplate);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ message: "Error updating email template" });
  }
}

async function emailTemplateHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.templateName == null) {
    return res.status(400).json({ message: "templateName must be passed into query string" });
  }

  if (req.method === "PUT") {
    return putEmailTemplate(req, res);
  }

  if (req.method === "DELETE") {
    return deleteEmailTemplate(req, res);
  }

  return res.status(403).json({ message: "Forbidden" });
}

export default withApiAuthRequired(emailTemplateHandler);
