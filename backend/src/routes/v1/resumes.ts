import express, { NextFunction, Request, Response } from "express"
import { SignedUrl } from "@src/interfaces/s3"
import { generateSignedResumeUploadUrl, generateSignedResumeUrl } from "@src/utils/aws"
import { z } from "zod"
import crypto from "crypto"

export const router = express.Router()

router.post("/resumes", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumeId = crypto.randomBytes(16).toString("hex") //generate random resume names
    const url: string = await generateSignedResumeUploadUrl(resumeId)
    res.status(200).send({ resumeId, url })
  } catch (error) {
    next(error)
  }
})

router.get("/resumes/:resumeId?", async (req: Request, res: Response, next: NextFunction) => {
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
