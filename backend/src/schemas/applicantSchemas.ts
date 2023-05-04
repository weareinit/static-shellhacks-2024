import { z } from "zod"

export const applicantUpdateSchema = z.object({
  resume_path: z.string().optional(),
  application_status: z.literal("withdrawn").optional(),
})

export const newApplicantSchema = z.object({
  auth0_id: z.string().nonempty(),
  event_id: z.string().regex(/^\d+$/).transform(Number),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.string().email(),
  discord: z.string().nonempty(), //TODO: add some regex parsing
  gender: z.string().nonempty(),
  ethnicity: z.string().nonempty(),
  race: z.string().nonempty(),
  country: z.string().nonempty(),
  is_international: z.boolean(),
  phone_number: z.string().nonempty(),
  dob: z.date(),
  major: z.string(),
  school: z.string(),
  resume_path: z.string().url(),
  github: z.string()?.url(),
  linkedin: z.string()?.url(),
  level_of_study: z.string(),
  interest_response: z.string(),
  email_message_status: z.boolean(),
  developer_role: z.string(),
})
