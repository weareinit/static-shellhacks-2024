import express, { NextFunction, Request, Response } from "express"
import { generateSignedResumeUrl } from "@src/utils/aws"
import { z } from "zod"
import crypto from "crypto"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"
import { auth } from "express-oauth2-jwt-bearer"
import { prisma } from "@src/index"

export const router = express.Router()

router.post("/resumes", async (req: Request, res: Response, next: NextFunction) => {
  //Note: creating a resume does not require authentication, because it is done alongside the application
  try {
    const resumeId = crypto.randomBytes(16).toString("hex") //generate unique resume name for each user
    const url: string = await generateSignedResumeUrl(resumeId)
    res.status(200).send({ resumeId, url })
  } catch (error) {
    next(error)
  }
})

router.get("/resumes/myResume", auth(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth: AuthResult = req.auth!
    const auth0_email = z.string().email().parse(auth.payload.email)

    const resumeId = await prisma.hacker_Applications.findUnique({ where: { email: auth0_email }, select: { resume_path: true } })
    const url: string = await generateSignedResumeUrl(resumeId?.resume_path as string)
    res.status(200).send({ url })
  } catch (error) {
    next(error)
  }
})

router.get("/resumes/:resumeId?", auth(), requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumeIdSchema = z.string().nonempty()
    const resumeId = resumeIdSchema.parse(req.params.resumeId)

    const url: string = await generateSignedResumeUrl(resumeId)
    res.status(200).send(url)
  } catch (error) {
    next(error)
  }
})
