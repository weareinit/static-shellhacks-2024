import express from "express"
import { Request, Response, NextFunction } from "express"
import { prisma, auth0Management } from "@src/index"
import { logger } from "@config/logger"
import { z } from "zod"
import { application_status_enums, Prisma } from "@prisma/client"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"
import { applicantStatusChangeSchema, newApplicantSchema, applicantFiltersSchema, applicantUpdateSchema } from "@src/schemas/applicantSchemas"
import { deleteResume, sendConfirmationEmail } from "@src/utils/aws"
import crypto from "crypto"

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
    if (payload.resume_path) {
      //if the user is changing their resume, delete the old one from s3
      const oldResumePath = await prisma.hacker_Applications.findUnique({
        where: {
          auth0_id,
        },
        select: {
          resume_path: true,
        },
      })

      await deleteResume(oldResumePath?.resume_path as string)
    }

    const applicant = await prisma.hacker_Applications.update({ where: { auth0_id }, data: payload })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.post("/events/:eventId/applicants", async (req: Request, res: Response, next: NextFunction) => {
  //Add a new applicant to the DB (register)
  const auth: AuthResult = req.auth!
  auth.payload.sub = crypto.randomBytes(6).toString("hex")

  try {
    const validatedApplicant = newApplicantSchema.parse({ event_id: req.params.eventId, ...req.body })

    auth0Management.createUser(
      {
        email: validatedApplicant.email,
        connection: "email",
        verify_email: false,
        email_verified: true,
      },
      async (err, authResult) => {
        if (err) {
          logger.error("Unable to create auth0 account")
          next(err)
        }

        logger.info("User created")

        const newApplicant: Prisma.Hacker_ApplicationsUncheckedCreateInput = {
          ...validatedApplicant,
          auth0_id: authResult?.user_id as string,
          application_status: application_status_enums.registered,
          check_in_status: false,
        }

        try {
          const applicant = await prisma.hacker_Applications.create({ data: newApplicant })
          const confirmationEmailStatus = await sendConfirmationEmail(validatedApplicant.email, validatedApplicant.first_name)

          res.send({ applicant: applicant, auth0: authResult }).status(200)
        } catch (err) {
          next(err)
        }
      }
    )
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
