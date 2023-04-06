import express, { NextFunction, Request, Response } from "express"
import multer from "multer"
import { SignedUrl } from "@src/interfaces/s3"
import { deleteFromS3, retrieveFromS3, uploadToS3 } from "@src/dal/aws"
import { z } from "zod"

export const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const resumeSchema = z.object({ fileName: z.string().nonempty() })

router.post("/resumes", upload.single("resume"), async (req: Request, res: Response, _: NextFunction) => {
  try {
    await uploadToS3(req.file.originalname, req.file.buffer, req.file.mimetype)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send("Error uploading object to S3 bucket")
  }
})

router.get("/resumes/:fileName?", async (req: Request, res: Response, _: NextFunction) => {
  const validatedParams = resumeSchema.safeParse(req.params)
  if (!validatedParams.success) {
    res.sendStatus(400)
  }

  const { fileName } = validatedParams as z.infer<typeof resumeSchema>
  try {
    const URL: SignedUrl = await retrieveFromS3(fileName)
    res.status(200).send(URL)
  } catch (error) {
    res.status(500).send("Error retrieving object to S3 bucket")
  }
})

router.delete("/resumes/:fileName?", async (req: Request, res: Response, _: NextFunction) => {
  const validatedParams = resumeSchema.safeParse(req.params)
  if (!validatedParams.success) {
    res.sendStatus(400)
  }

  const { fileName } = validatedParams as z.infer<typeof resumeSchema>
  try {
    await deleteFromS3(fileName)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send("Error deleting object from S3 bucket")
  }
})
