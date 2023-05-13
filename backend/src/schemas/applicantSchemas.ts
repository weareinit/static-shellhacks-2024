import { z } from "zod"

export const applicantUpdateSchema = z.object({
  resume_path: z.string().optional(),
  application_status: z.literal("withdrawn").optional(),
  phone: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number")
    .optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
})

export const applicantStatusChangeSchema = z.object({
  event_id: z.string().regex(/^\d+$/).transform(Number),
  hacker_id: z.string().regex(/^\d+$/).transform(Number),
  application_status: z.enum(["registered", "in_wave", "accepted", "confirmed", "withdrawn"]),
})

export const applicantFiltersSchema = z.object({
  event_id: z.string().nonempty().regex(/^\d+$/).transform(Number),
  hacker_id: z.number().optional(),
  application_status: z.enum(["registered", "in_wave", "accepted", "confirmed", "withdrawn"]).optional(), //z.string().refine((i: string) => i in application_status_enums).optional(),
  school: z.string().optional(),
})

export const newApplicantSchema = z.object({
  event_id: z.string().regex(/^\d+$/).transform(Number),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.string().email(),
  discord: z.string().regex(/^.{3,32}#[0-9]{4}$/, "Invalid discord tag"),
  gender: z.string().nonempty(),
  ethnicity: z.string().nonempty(),
  race: z.string().nonempty(),
  country: z.string().nonempty(),
  is_international: z.boolean(),
  phone_number: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number"),
  age: z.number().int().positive(),
  major: z.string(),
  school: z.string(),
  resume_path: z.string().url(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  level_of_study: z.string(),
  interest_response: z.string(),
  developer_role: z.string(),
})
