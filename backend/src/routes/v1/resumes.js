import express from "express";
import { prisma, s3 } from "../../index.js";
import { config } from "../../config/config.js"

export const router = express.Router();

// FIX 
router.get('/resumes/:resume_path', async (req, res, next) => {
  const resume_path_param = req.params.resume_path
  const params = {Bucket: config.aws_bucket_name, Key: resume_path_param, Expires: 60 * 3}
  const getURL = s3.getSignedUrl('getObject', params);
  res.render(getURL)
})

