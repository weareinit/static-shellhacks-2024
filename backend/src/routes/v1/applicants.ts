import express from "express"
import { Request, Response, NextFunction } from "express"
import { prisma } from "@src/index"
import { z } from "zod"
import { application_status_enums, Prisma } from "@prisma/client"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"
import { applicantStatusChangeSchema, newApplicantSchema, applicantFiltersSchema, applicantUpdateSchema } from "@src/schemas/applicantSchemas"

export const router = express.Router()

router.get("/events/:eventId/application", async (req: Request, res: Response, next: NextFunction) => {
  //Get the application of the current user
  const auth: AuthResult = req.auth!
  const auth0_id = z.string().nonempty().parse(auth.payload.sub)

  try {
    const applicant = await prisma.hacker_Applications.findUnique({ where: { auth0_id } })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.put("/events/:eventId/application", async (req: Request, res: Response, next: NextFunction) => {
  //Update the application of the current user according to the "payload" schema
  const auth: AuthResult = req.auth!
  const auth0_id = z.string().nonempty().parse(auth.payload.sub)
  const payload = applicantUpdateSchema.parse(req.body)

  try {
    const applicant = await prisma.hacker_Applications.update({ where: { auth0_id }, data: payload })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  //Add a new applicant to the DB (register)
  const auth: AuthResult = req.auth!

  try {
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
  //Admin route to get info on one or many hackers
  try {
    const filters = applicantFiltersSchema.parse({ event_id: req.params.eventId, ...req.query })

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

router.put("events/:eventId/applicants/:hackerId/applicationStatus", requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
  //Admin route to update the app status of a hacker (add to wave, remove from wave, etc.)
  try {
    const { event_id, hacker_id, application_status } = applicantStatusChangeSchema.parse({ event_id: req.params.eventId, hacker_id: req.params.hackerId, ...req.body })

    const updatedApplicant = await prisma.hacker_Applications.update({
      where: { hacker_id },
      data: { application_status },
    })

    res.send(updatedApplicant).status(200)
  } catch (e) {
    next(e)
  }
})
