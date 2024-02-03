import z from "zod";

export const emailTemplateSchema = z.object({
  fileName: z.string(),
  subject: z.string(),
});
