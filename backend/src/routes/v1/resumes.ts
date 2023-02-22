import express, { NextFunction, Request, Response } from "express";
import { s3Client } from "../../index";
import { config } from "../../config/config"
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export const router = express.Router();

// FIX
router.get('/resumes/:fileName', async (req: Request, res: Response, _: NextFunction) => {

  // Only file currently in the bucket is
  // SagePagesFullTime2023.docx.pdf

  const fileNameParam = req.params.fileName
  const bucketParams = {Bucket: config.aws_bucket_name, Key: fileNameParam}
  const command = new GetObjectCommand(bucketParams)
  const getURL = await getSignedUrl(s3Client, command, {expiresIn: 60 * 3});
  res.send(getURL)
})

