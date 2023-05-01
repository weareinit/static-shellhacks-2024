import { s3Client } from "@src/index"
import { BucketParams } from "@src/interfaces/s3"
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const generateSignedResumeUploadUrl = async (resumeId: string) => {
  const params: BucketParams = { Bucket: process.env.AWS_BUCKET_NAME!, Key: resumeId }
  const command = new PutObjectCommand(params)
  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 3 })
}

export const generateSignedResumeUrl = async (resumeId: string) => {
  const params: BucketParams = { Bucket: process.env.AWS_BUCKET_NAME!, Key: resumeId }
  const command = new GetObjectCommand(params)
  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 3 })
}

// export async function uploadToS3(fileName: string, fileBuffer: Buffer, contentType: string) {
//   const params: BucketParams = {
//     Bucket: process.env.AWS_BUCKET_NAME!,
//     Key: fileName,
//     Body: fileBuffer,
//     ContentType: contentType,
//   }

//   try {
//     const response: PutObjectCommandOutput = await s3Client.send(new PutObjectCommand(params))
//     return response
//   } catch (error) {
//     throw Error(`Error uploading object to S3 bucket`)
//   }
// }

// export async function doesFileExistInS3(fileName: string) {
//   const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }
//   try {
//     const headObjectCmd: HeadObjectCommand = new HeadObjectCommand(params)
//     await s3Client.send(headObjectCmd)
//   } catch (error) {
//     throw Error(`File not found in S3 bucket`)
//   }
// }

// export async function retrieveFromS3(fileName: string) {
//   const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }
//   try {
//     // Check if file exists
//     await doesFileExistInS3(fileName)

//     // If it does, then getSignedUrl
//     const command: GetObjectCommand = new GetObjectCommand(params)
//     const signedURL = await getSignedUrl(s3Client, command, {
//       expiresIn: 60 * 3,
//     })
//     return { url: signedURL }

//     // If an error occured
//   } catch (error) {
//     throw new Error(`File does not exist on S3 bucket`)
//   }
// }

// export async function deleteFromS3(fileName: string) {
//   const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }
//   try {
//     // Check if file exists
//     await doesFileExistInS3(fileName)
//     const command: DeleteObjectCommand = new DeleteObjectCommand(params)
//     await s3Client.send(command)
//   } catch (error) {
//     throw Error(`File does not exist on S3 bucket`)
//   }
// }
