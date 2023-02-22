import express from "express";
import { prisma, s3Client } from "../../index.js";
import { config } from "../../config/config.js"
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export const router = express.Router();

// FIX 
router.get('/resumes/:file_name', async (req, res, next) => {

  // Only file currently in the bucket is 
  // SagePagesFullTime2023.docx.pdf

  const file_name_param = req.params.file_name
  const bucket_params = {Bucket: config.aws_bucket_name, Key: file_name_param}
  const command = new GetObjectCommand(bucket_params)
  const getURL = await getSignedUrl(s3Client, command, {expiresIn: 60 * 3});
  res.send(getURL)
})

