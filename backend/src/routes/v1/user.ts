import express, { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { type AuthResult } from "express-oauth2-jwt-bearer"
import { prisma } from "@src/index"
import { applicantUpdateSchema } from "@src/schemas/applicantSchemas"

export const router = express.Router()

router.get("/user/profile", async (req: Request, res: Response, next: NextFunction) => {
  const auth: AuthResult = req.auth!
  const auth0_id = z.string().nonempty().parse(auth.payload.sub)

  try {
    const applicant = await prisma.hacker_Applications.findUnique({ where: { auth0_id } })
    res.send(applicant).status(200)
  } catch (e) {
    next(e)
  }
})

router.put("/user/profile", async (req: Request, res: Response, next: NextFunction) => {
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
