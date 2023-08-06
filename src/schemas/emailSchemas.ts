import z from "zod";

export const emailTemplateSchema = z.object({
  templateName: z.string(),
  subject: z.string(),
  htmlTemplate: z.string(),
});
