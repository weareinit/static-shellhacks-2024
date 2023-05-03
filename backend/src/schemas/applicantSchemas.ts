import { z } from "zod"

export const applicantUpdateSchema = z.object({
  resume_path: z.string(),
})
