import express from "express"
import { Request, Response, NextFunction } from "express"
import { prisma } from "@src/index"
import { logger } from "@config/logger"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"
import { applicantStatusChangeSchema, newApplicantSchema, applicantFiltersSchema, applicantUpdateSchema } from "@src/schemas/applicantSchemas"
import { deleteResume, sendConfirmationEmail } from "@src/utils/aws"
import { auth } from "express-oauth2-jwt-bearer"

export const router = express.Router()

router.get("/events/:eventId/application", auth(), async (req: Request, res: Response, next: NextFunction) => {
  //Get the application of the current user
  const auth: AuthResult = req.auth!
  const auth0_email = z.string().email().parse(auth.payload.email)
  logger.info(`User ${auth0_email} is getting their application`)

  try {
    const applicant = await prisma.hacker_Applications.findUnique({ where: { email: auth0_email } })
    res.send({ applicant }).status(200)
  } catch (e) {
    next(e)
  }
})

router.put("/events/:eventId/application", auth(), async (req: Request, res: Response, next: NextFunction) => {
  //Update the application of the current user according to the "payload" schema
  const auth: AuthResult = req.auth!
  const auth0_email = z.string().email().parse(auth.payload.email)
  const payload = applicantUpdateSchema.parse(req.body)

  try {
    if (payload.resume_path) {
      //if the user is changing their resume, delete the old one from s3
      const oldResumePath = await prisma.hacker_Applications.findUnique({
        where: {
          email: auth0_email,
        },
        select: {
          resume_path: true,
        },
      })

      await deleteResume(oldResumePath?.resume_path as string)
    }

    const applicant = await prisma.hacker_Applications.update({ where: { email: auth0_email }, data: payload })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  //Note: creating an application does not require authentication
  const validatedApplicant = newApplicantSchema.parse({ event_id: req.params.eventId, ...req.body })

  const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
    ...validatedApplicant,
    auth0_id: "test", //auth0_id: authResult?.user_id as string,
  }

  try {
    const applicant = await prisma.hacker_Applications.create({ data: newApplicant })
    const confirmationEmailStatus = await sendConfirmationEmail(validatedApplicant.email, validatedApplicant.first_name)

    res.send({ applicant }).status(200)
  } catch (err) {
    next(err)
  }
})

router.get("/events/:eventId/applicants", auth(), requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
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

router.put("events/:eventId/applicants/:hackerId/applicationStatus", auth(), requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
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
