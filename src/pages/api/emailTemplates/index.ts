import { NextApiRequest, NextApiResponse } from "next";
import { createEmailTemplate, sendAcceptanceEmails, getEmailTemplates, sendConfirmationEmail, removeEmailTemplate, sendStatusConfirmedEmail, updateEmailTemplate } from "@/util/aws";
import { emailTemplateSchema } from "@/schemas/emailSchemas";
import fs from "fs-extra";
import path from "path";

async function sendEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  let emailTemplates = await getEmailTemplates();
  return res.status(200).json({ emailTemplates });
}

/*
 * To upload an email, place the template in the public/emailTemplates folder
 * and then send a POST request to this route with the following body:
 * {
 *   fileName: "name of file without extension",
 *   subject: "subject of email"
 * }
 */
async function uploadEmailTemplates(req: NextApiRequest, res: NextApiResponse) {
  const publicPath = path.join(process.cwd(), "public/emailTemplates");
  const { fileName, subject } = emailTemplateSchema.parse(req.body);

  try {
    const filePath = path.join(publicPath, `${fileName}.html` as string);
    const fileContent = await fs.readFile(filePath, "utf-8");
    //generate a sequence of random numbers
    const templateName = `${fileName}${new Date().getTime().toString(16)}`;

    const result = await createEmailTemplate(templateName, subject as string, fileContent);
    return res.status(200).send(templateName);
  } catch (e) {
    return res.status(500).json({ message: "Error. Could not upload template", error: e });
  }
}

const emailTemplateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  //These routes should only be accessible if running in dev
  if (process.env.NODE_ENV !== "development") {
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

export default emailTemplateHandler;

function sendStatusAcceptedEmail(arg0: { email: string; first_name: string }) {
  throw new Error("Function not implemented.");
}
