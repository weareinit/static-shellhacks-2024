import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { removeEmailTemplate, sendAcceptanceEmails, sendStatusConfirmedEmail, updateEmailTemplate } from "@/util/aws";
import { emailTemplateSchema } from "@/schemas/emailSchemas";

async function deleteEmailTemplate(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.templateName == null) {
    return res.status(400).json({ message: "Error. Template name must be passed into route" });
  }
  const templateName = req.query.templateName as string;
  try {
    const result = removeEmailTemplate(templateName);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ message: "Internal Error. Could not delete email template" });
  }
}

async function putEmailTemplate(req: NextApiRequest, res: NextApiResponse) {
  const emailTemplate = {
    templateName: req.query.templateName,
    ...req.body,
  };

  let body;
  try {
    body = emailTemplateSchema.parse(emailTemplate);
  } catch (e) {
    return res.status(400).json({ message: "Error. Could not parse request body to update email template" });
  }

  try {
    const result = await updateEmailTemplate(body.templateName, body.subject, body.htmlTemplate);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ message: "Internal Error. Could not update email template" });
  }
}

async function emailTemplateHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    return putEmailTemplate(req, res);
  }

  if (req.method === "DELETE") {
    return deleteEmailTemplate(req, res);
  }

  return res.status(405).json({ message: "Method not allowed for this route" });
}

export default withApiAuthRequired(emailTemplateHandler);
