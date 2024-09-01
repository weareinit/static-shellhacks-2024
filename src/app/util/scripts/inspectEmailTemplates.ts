import { SESClient, GetTemplateCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

const emailClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getEmailTemplate(templateName: string) {
  try {
    const command = new GetTemplateCommand({
      TemplateName: templateName,
    });
    const response = await emailClient.send(command);

    console.log("Email template details:");
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error getting email template:", error);
  }
}

const templateName = process.argv[2];

if (!templateName) {
  console.error("Please provide a template name as an argument.");
  process.exit(1);
}

void getEmailTemplate(templateName);
