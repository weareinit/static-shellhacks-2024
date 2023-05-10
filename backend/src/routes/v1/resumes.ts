import express, { NextFunction, Request, Response } from "express"
import { generateSignedResumeUrl } from "@src/utils/aws"
import { z } from "zod"
import crypto from "crypto"
import { requiredScopes, type AuthResult } from "express-oauth2-jwt-bearer"

export const router = express.Router()

router.post("/resumes", async (req: Request, res: Response, next: NextFunction) => {
  const auth: AuthResult = req.auth!

  try {
    const resumeId = `${auth.payload.sub}_resume_${crypto.randomBytes(16).toString("hex")}` //generate unique resume name for each user
    const url: string = await generateSignedResumeUrl(resumeId)
    res.status(200).send({ resumeId, url })
  } catch (error) {
    next(error)
  }
})

router.get("/resumes/:resumeId?", requiredScopes("access:admin-routes"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumeIdSchema = z.string().nonempty()
    const resumeId = resumeIdSchema.parse(req.params.resumeId)

    const url: string = await generateSignedResumeUrl(resumeId)
    res.status(200).send(url)
  } catch (error) {
    next(error)
  }
})

// router.delete("/resumes/:fileName?", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { fileName } = resumeSchema.parse(req.params)

//     await deleteFromS3(fileName)
//     res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })
