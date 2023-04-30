import express from "express"
import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@src/index"
import { application_status_enums, Hacker_Applications, Prisma } from "@prisma/client"
import { logger } from "@config/logger"

export const router = express.Router()

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newApplicantSchema = z.object({
      event_id: z.string().regex(/^\d+$/).transform(Number),
      first_name: z.string().nonempty(),
      last_name: z.string().nonempty(),
      email: z.string().email(),
      discord: z.string().nonempty(), //TODO: add some regex parsing
      gender: z.string().nonempty(),
      ethnicity: z.string().nonempty(),
      race: z.string().nonempty(),
      phone_number: z.string().nonempty(),
      dob: z.date(),
      major: z.string(),
      school: z.string(),
      resume_path: z.string().url(), //is this how we want to do this?
      github: z.string()?.url(),
      linkedin: z.string()?.url(),
      level_of_study: z.string(),
      interest_response: z.string(),
      email_message_status: z.boolean(),
      developer_role: z.string(),
    })

    const validatedApplicant = newApplicantSchema.parse({ event_id: req.params.eventId, ...req.body })

    const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
      ...validatedApplicant,
      application_status: application_status_enums.registered,
      check_in_status: false,
    }
    const applicant = await prisma.hacker_Applications.create({ data: newApplicant })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.get("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filtersSchema = z.object({
      event_id: z.string().nonempty().regex(/^\d+$/).transform(Number),
      application_status: z.enum(["registered", "in_wave", "accepted", "confirmed", "withdrawn"]).optional(), //z.string().refine((i: string) => i in application_status_enums).optional(),
      school: z.string().optional(),
    })
    const filters = filtersSchema.parse({ event_id: req.params.eventId, ...req.query })

    const filteredApplicants = await prisma.hacker_Applications.findMany({
      where: {
        ...filters,
      },
    })

    res.send(filteredApplicants).status(200)
  } catch (e) {
    next(e)
  }
})
