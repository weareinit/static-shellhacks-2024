import express from "express"
import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@src/index"
import { application_status_enums, Hacker_Applications, Prisma } from "@prisma/client"
import { logger } from "@config/logger"

export const router = express.Router()

router.get("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  //Validate request params
  try {
    const eventIdSchema = z.object({ eventId: z.string().nonempty().transform(Number) })
    const { eventId } = eventIdSchema.parse(req.params)

    const applicants: Hacker_Applications[] = await prisma.hacker_Applications.findMany({
      where: {
        event_id: eventId,
      },
    })

    res.status(200).send(applicants)
  } catch (e) {
    if (e instanceof z.ZodError) res.sendStatus(400)
    logger.error(e)
    res.sendStatus(500)
  }
})

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newApplicantSchema = z.object({
      event_id: z.number(),
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

    const validatedApplicant = newApplicantSchema.parse(req.body)

    const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
      ...validatedApplicant,
      application_status: application_status_enums.pending,
      check_in_status: false,
    }
    const applicant = await prisma.hacker_Applications.create({ data: newApplicant })
    res.send(applicant).status(200)
  } catch (e) {
    if (e instanceof z.ZodError) res.sendStatus(400)
    logger.error(e)
    res.sendStatus(500)
  }
})

// The URL query param takes a filter of type ApplicantFilter
router.get("/events/:eventId/applicants", async (req: Request, res: Response) => {
  try {
    const applicantFilterSchema = z.object({
      eventId: z.string().nonempty().transform(Number),
      filter: z.object({ status: z.string().refine((i: string) => i in application_status_enums) }),
    })
    const { eventId, filter } = applicantFilterSchema.parse({ eventId: req.params.eventId, filter: req.query.filter })

    const filteredApplicants = await prisma.hacker_Applications.findMany({
      where: {
        event_id: eventId,
        ...filter,
      },
    })

    res.send(filteredApplicants).status(200)
  } catch (e) {
    if (e instanceof z.ZodError) res.sendStatus(400)
    logger.error(e)
    res.sendStatus(500)
  }
})
