import { s3Client } from "../index";
import { BucketParams } from "../../src/interfaces/s3";
import { config } from "../config/config";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import {
  S3FileDeletionError,
  S3FileNotFoundError,
  S3FileRetrievalError,
  S3FileUploadError,
} from "../errors/error";
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
  } catch (error) {
    throw new S3FileUploadError(
      `Error uploading object to S3 bucket: ${error.message}`
    );
  }
}

export async function doesFileExistInS3(fileName: string) {
  const params = { Bucket: config.aws_bucket_name, Key: fileName };
  try {
    const headObjectCmd: HeadObjectCommand = new HeadObjectCommand(params);
    await s3Client.send(headObjectCmd);
  } catch (error) {
    throw new S3FileNotFoundError(
      `File not found in S3 bucket: ${error.message}`
    );
  }
}

export async function retrieveFromS3(fileName: string) {
  const params = { Bucket: config.aws_bucket_name, Key: fileName };
  try {
    // Check if file exists
    await doesFileExistInS3(fileName);

    // If it does, then getSignedUrl
    const command: GetObjectCommand = new GetObjectCommand(params);
    const signedURL = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 3,
    });
    return { url: signedURL };

    // If an error occured
  } catch (error) {
    if (error instanceof S3FileNotFoundError) {
      throw new S3FileNotFoundError(
        `File does not exist on S3 bucket: ${error.message}`
      );
    } else {
      throw new S3FileRetrievalError(
        `Error retrieving object from S3 bucket: ${error.message}`
      );
    }
  }
}

export async function deleteFromS3(fileName: string) {
  const params = { Bucket: config.aws_bucket_name, Key: fileName };
  try {
    // Check if file exists
    await doesFileExistInS3(fileName);
    const command: DeleteObjectCommand = new DeleteObjectCommand(params);
    await s3Client.send(command);
  } catch (error) {
    if (error instanceof S3FileNotFoundError) {
      throw new S3FileNotFoundError(
        `File does not exist on S3 bucket: ${error.message}`
      );
    } else {
      throw new S3FileDeletionError(
        `Error deleting object from S3 bucket: ${error.message}`
      );
    }
  }
}
