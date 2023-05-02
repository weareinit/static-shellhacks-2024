import express from "express"
import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@src/index"
import { application_status_enums, Prisma } from "@prisma/client"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"

export const router = express.Router()

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  const auth: AuthResult = req.auth!

  try {
    const newApplicantSchema = z.object({
      auth0_id: z.string().nonempty(),
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
      resume_path: z.string().url(),
      github: z.string()?.url(),
      linkedin: z.string()?.url(),
      level_of_study: z.string(),
      interest_response: z.string(),
      email_message_status: z.boolean(),
      developer_role: z.string(),
    })

    const validatedApplicant = newApplicantSchema.parse({ auth0_id: auth.payload.sub, event_id: req.params.eventId, ...req.body })

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

router.get("/events/:eventId/applicants", requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
  //NOTE: Admin route to get info on one or many hackers
  try {
    const filtersSchema = z.object({
      event_id: z.string().nonempty().regex(/^\d+$/).transform(Number),
      hacker_id: z.number().optional(),
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

router.put("events/:eventId/applicants/applicationStatus", requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
  //NOTE: Admin route to update the app status of a hacker (add to wave, remove from wave, accept wave, etc.)
  try {
    const requestSchema = z.object({
      event_id: z.string().regex(/^\d+$/).transform(Number),
      hacker_id: z.string().regex(/^\d+$/).transform(Number),
      application_status: z.enum(["registered", "in_wave", "accepted", "confirmed", "withdrawn"]),
    })
    const { hacker_id, application_status } = requestSchema.parse({ event_id: req.params.eventId, hacker_id: req.query.hackerId, ...req.body })

    const updatedApplicant = await prisma.hacker_Applications.update({
      where: { hacker_id },
      data: { application_status },
    })

    res.send(updatedApplicant).status(200)
  } catch (e) {
    next(e)
  }
})
