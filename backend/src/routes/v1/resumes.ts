import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { SignedUrl } from "../../interfaces/s3";
import { deleteFromS3, retrieveFromS3, uploadToS3 } from "../../dal/aws";
import { S3FileRetrievalError, S3FileUploadError } from "../../errors/error";

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// FIX ~ what should this return to notify the client that a successful upload/deletion occured?

router.post(
  "/resumes",
  upload.single("resume"),
  async (req: Request, res: Response, _: NextFunction) => {
    try {
      await uploadToS3(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype
      );
      res.sendStatus(200);
    } catch (error) {
      if (error instanceof S3FileUploadError) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error uploading object to S3 bucket");
      }
    }
  }
);

// FIX
router.get(
  "/resumes/:fileName?",
  async (req: Request, res: Response, _: NextFunction) => {
    if (!req.params) {
      res.sendStatus(404);
    }
    try {
      const URL: SignedUrl = await retrieveFromS3(req.params.fileName);
      res.status(200).send(URL);
    } catch (error) {
      if (error instanceof S3FileRetrievalError) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error retrieving object to S3 bucket");
      }
    }
  }
);

// FIX
router.delete(
  "/resumes/:fileName?",
  async (req: Request, res: Response, _: NextFunction) => {
    if (!req.params) {
      res.sendStatus(404);
    }
    try {
      await deleteFromS3(req.params.fileName);
      res.sendStatus(200);
    } catch (error) {
      if (error instanceof S3FileRetrievalError) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error deleting object from S3 bucket");
      }
    }
  }
);
