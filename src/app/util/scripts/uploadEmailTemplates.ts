import * as dotenv from "dotenv";
dotenv.config({ path: "../../../../.env", override: true });

import { CreateTemplateCommandInput } from "@aws-sdk/client-ses";
import { createEmailTemplate } from "../aws";
/*
 * INSTRUCTIOSN: This script will upload all email templates to the database.
 */

// console.log(process.env);
const randomNum = Math.floor(Math.random() * 1000000);

const TEMPLATES: CreateTemplateCommandInput[] = [
  {
    Template: {
      TemplateName: `application_confirmation_${randomNum}`,
      SubjectPart: "You've applied to Shellhacks!",
      HtmlPart: await fetch("http://localhost:3000/email_templates/appliedTemplate.html").then((res) => res.text()),
    },
  },
  {
    Template: {
      TemplateName: `application_accepted_${randomNum}`,
      SubjectPart: "Congratulations! - ShellHacks Acceptance",
      HtmlPart: await fetch("http://localhost:3000/email_templates/acceptedTemplate.html").then((res) => res.text()),
    },
  },
  {
    Template: {
      TemplateName: `application_accepted_reminder${randomNum}`,
      SubjectPart: "REMINDER: Confirm Your Attendance to ShellHacks 2024!",
      HtmlPart: await fetch("http://localhost:3000/email_templates/acceptedTemplate.html").then((res) => res.text()),
    },
  },
];

for (const template of TEMPLATES) {
  try {
    // console.log(JSON.stringify(template, null, 2));
    // await sendConfirmationEmail("jschuster8765@gmail.com");

    await createEmailTemplate(template.Template!.TemplateName!, template.Template!.SubjectPart!, template.Template!.HtmlPart!);

    console.log(`Successfully uploaded ${template.Template!.TemplateName}`);
  } catch (e) {
    console.error(e);
  }
}
