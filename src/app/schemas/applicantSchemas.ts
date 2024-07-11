import { z } from "zod";
import { application_status_enums } from "@prisma/client";
import { dinosaurNames } from "../constants/dinosaurNames";

export const application_statuses = [
  application_status_enums.registered,
  application_status_enums.in_wave,
  application_status_enums.accepted,
  application_status_enums.confirmed,
  application_status_enums.withdrawn,
  application_status_enums.waitlisted,
  application_status_enums.checked_in,
] as const;

export const application_status_with_any = [...application_statuses, "any"] as const;

export const user_changeable_application_statuses = [application_status_enums.confirmed, application_status_enums.withdrawn] as const;

export const sendReminderEmailSchema = z.enum([application_status_enums.accepted, application_status_enums.confirmed]);
export const sendDiscordEmailSchema = z.object({
  email: z.string().nonempty(),
  discord_id: z.string().nonempty(),
});
export type sendReminderEmailType = z.infer<typeof sendReminderEmailSchema>;

export const applicantUpdateSchemaBase = z.object({
  //id: z.string().regex(/^\d+$/).transform(Number), //only requied to find the user, this is not actually updatable
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().int().positive().optional(),
  resume_path: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number")
    .optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  grad_year: z.number().optional(),
  level_of_study: z.string().optional(),
  discord: z.string().nullable().optional(),
  github: z.string().url().nullable().optional(),
  discord_id: z.string().nullable().optional(),
  discord_verification_code: z.string().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
  country: z.string().nonempty().optional(),
  gender: z.string().nonempty().optional(),
  pronouns: z.string().nonempty().optional(),
  ethnicity: z.string().nonempty().optional(),
  dinosaur_avatar: z
    .number()
    .refine((i) => i >= 0 && i <= dinosaurNames.length)
    .optional(),
});

export const adminApplicantUpdateSchema = applicantUpdateSchemaBase.extend({
  application_status: z.enum(application_statuses).optional(),
});

export const hackerApplicantUpdateSchema = applicantUpdateSchemaBase.extend({
  application_status: z.enum(user_changeable_application_statuses).optional(),
});

export const applicantStatusChangeSchema = z.object({
  ids: z.array(z.number()),
  application_status: z.enum(application_statuses),
});

export const applicantFiltersSchema = z.object({
  application_status: z.enum(application_status_with_any).optional(), //z.string().refine((i: string) => i in application_status_enums).optional(),
  grad_year: z
    .string()
    .regex(/^(202[2-9])$/)
    .transform(Number)
    .optional(),
  school: z.string().optional(),
});
export type ApplicantFilters = z.infer<typeof applicantFiltersSchema>;

export const adminFetchApplicantsSchema = applicantFiltersSchema.extend({
  searchParams: z.string().optional(),
  format: z.enum(["json", "csv"]).optional(),
  cursor: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export const newApplicantSchema = z.object({
  userId: z.string(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.number().int().positive(),
  school: z.string().min(1),
  major: z.string().min(1),
  grad_year: z
    .string()
    .regex(/^(202[2-9])$/)
    .transform(Number),
  level_of_study: z.string(),
  country: z.string().min(1),
  email: z.string().email().toLowerCase(),
  phone_number: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number"),
  resume_path: z.string(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  is_international: z.boolean(),
  gender: z.string().min(1),
  pronouns: z.string().min(1),
  ethnicity: z.string().min(1),
  agreed_mlh_news: z.boolean(),
});
