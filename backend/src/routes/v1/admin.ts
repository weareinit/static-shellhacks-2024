import express from "express"
import { Request, Response, NextFunction } from "express"
import { application_status_enums } from "@prisma/client"
import { prisma } from "@src/index"
import { z } from "zod"
import { createEmailTemplate, sendConfirmationEmail } from "@src/utils/aws"

export const router = express.Router()

router.post("/acceptWave", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.hacker_Applications.updateMany({
      where: { application_status: application_status_enums.in_wave },
      data: { application_status: application_status_enums.accepted },
    })

    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.post("/createEmailTemplate", async (req: Request, res: Response, next: NextFunction) => {
  const payloadSchema = z.object({
    templateName: z.string(),
    subject: z.string(),
    htmlTemplate: z.string(),
  })

  try {
    const { templateName, subject, htmlTemplate } = payloadSchema.parse(req.body)

    const result = await createEmailTemplate(templateName, subject, htmlTemplate)
    res.status(200).send(result)
  } catch (e) {
    next(e)
  }
})

router.post("/testEmail", async (req: Request, res: Response, next: NextFunction) => {
  const payloadSchema = z.object({
    recipient: z.string(),
    firstName: z.string(),
  })

  try {
    const { recipient, firstName } = payloadSchema.parse(req.body)

    const result = await sendConfirmationEmail(recipient, firstName)
    res.status(200).send(result)
  } catch (e) {
    next(e)
  }
})
