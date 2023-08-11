import { z } from "zod";
import { application_status_enums } from "@prisma/client";

const application_statuses = [
  application_status_enums.registered,
  application_status_enums.in_wave,
  application_status_enums.accepted,
  application_status_enums.confirmed,
  application_status_enums.withdrawn,
  application_status_enums.waitlisted,
] as const;
export const user_changeable_application_statuses = [application_status_enums.confirmed, application_status_enums.withdrawn] as const;

export const sendReminderEmailSchema = z.enum([application_status_enums.accepted, application_status_enums.confirmed]);
export type sendReminderEmailType = z.infer<typeof sendReminderEmailSchema>;

export const applicantUpdateSchema = z.object({
  email: z.string().email().optional(),
  resume_path: z.string().optional(),
  application_status: z.enum(application_statuses).optional(),
  phone_number: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number")
    .optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  grad_year: z.number().optional(),
  level_of_study: z.string().optional(),
  github: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
});

export const applicantStatusChangeSchema = z.object({
  //event_id: z.string().regex(/^\d+$/).transform(Number),
  ids: z.array(z.number()),
  application_status: z.enum(application_statuses),
});

export const applicantFiltersSchema = z.object({
  //event_id: z.string().nonempty().regex(/^\d+$/).transform(Number),
  hacker_id: z.number().optional(),
  application_status: z.enum(application_statuses).optional(), //z.string().refine((i: string) => i in application_status_enums).optional(),
  grad_year: z
    .string()
    .regex(/^(202[2-8])$/)
    .transform(Number)
    .optional(),
  school: z.string().optional(),
  format: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number")
    .optional(),
});

export const newApplicantSchema = z.object({
  event_id: z.string().regex(/^\d+$/).transform(Number),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  age: z.number().int().positive(),
  school: z.string(),
  major: z.string(),
  grad_year: z
    .string()
    .regex(/^(202[2-8])$/)
    .transform(Number),
  level_of_study: z.string(),
  country: z.string().nonempty(),
  email: z.string().email(),
  phone_number: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number"),
  resume_path: z.string(),
  discord: z.string().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  is_international: z.boolean(),
  gender: z.string().nonempty(),
  pronouns: z.string().nonempty(),
  ethnicity: z.string().nonempty(),
  agreed_mlh_news: z.boolean(),
});
