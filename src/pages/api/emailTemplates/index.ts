import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "src/util/auth0Utils";
import { createEmailTemplate, sendAcceptanceEmails, getEmailTemplates, sendConfirmationEmail, removeEmailTemplate, sendStatusConfirmedEmail, updateEmailTemplate } from "@/util/aws";
import { emailTemplateSchema } from "@/schemas/emailSchemas";
import { send } from "process";

async function sendEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  let emailTemplates = await getEmailTemplates();
  return res.status(200).json({ emailTemplates });
}

async function uploadEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  // await sendAcceptanceEmails([{ email: "gipitz@outlook.com", first_name: "Giancarlo" }]);
  // await sendStatusConfirmedEmail({ email: "gipitz@outlook.com", first_name: "Giancarlo" });
  // await sendConfirmationEmail("gipitz@outlook.com", "Giancarlo");
  // return res.status(200).send({});

  let body;
  try {
    body = emailTemplateSchema.parse(req.body);
  } catch (e) {
    return res.status(400).json({ message: "Error. Could not parse request body to upload email template" });
  }

  const result = await createEmailTemplate(body.templateName, body.subject, body.htmlTemplate);
  return res.status(200).send(result);
}

const emailTemplateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const admin = await isAdmin(req, res);

  if (!admin) {
    return res.status(401).json({ error: "Unauthorized. You are not allowed to access this route." });
  }

  if (req.method === "GET") {
    return sendEmailTemplates(req, res);
  }

  if (req.method === "POST") {
    return uploadEmailTemplates(req, res);
  }

  return res.status(405).json({ message: "Method not allowed for this route" });
};

export default withApiAuthRequired(emailTemplateHandler);

function sendStatusAcceptedEmail(arg0: { email: string; first_name: string }) {
  throw new Error("Function not implemented.");
}
