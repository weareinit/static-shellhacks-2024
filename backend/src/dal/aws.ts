import { s3Client } from "../index";
import { BucketParams } from "../../src/interfaces/s3";
import { config } from "../config/config";
import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { S3RetrievalError, S3UploadError } from "../errors/error";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadToS3(
  fileName: string,
  fileBuffer: Buffer,
  contentType: string
) {
  const params: BucketParams = {
    Bucket: config.aws_bucket_name,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    const response: PutObjectCommandOutput = await s3Client.send(
      new PutObjectCommand(params)
    );
    return response;

    // If an error occured
  } catch (error) {
    throw new S3UploadError(`Error uploading object to S3: ${error.message}`);
  }
}

export async function retrieveFromS3(fileName: string) {
  const params = { Bucket: config.aws_bucket_name, Key: fileName };
  try {
    // Check if file exists
    const headObjectCmd = new HeadObjectCommand(params);
    await s3Client.send(headObjectCmd);

    // If it does, then getSignedUrl
    const command = new GetObjectCommand(params);
    const signedURL = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 3,
    });
    return { url: signedURL };

    // If an error occured
  } catch (error) {
    throw new S3RetrievalError(
      `Error retrieving object from S3: ${error.message}`
    );
  }
}
