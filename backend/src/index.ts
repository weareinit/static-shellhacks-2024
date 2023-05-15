import dotenv from "dotenv"
import { app } from "./app"
import { logger } from "@config/logger"
import { PrismaClient } from "@prisma/client"
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3"
import { SESClient } from "@aws-sdk/client-ses"
import { envSchema } from "@src/schemas/envSchema"

dotenv.config({ path: "../../.env" })
envSchema.parse(process.env) // Validate environment variables

// Load Database connection - Will throw error here if unable to connect.
export const prisma = new PrismaClient()

// Create S3 client
// FIX - Find some way to make sure this can be caught if there was an error

const s3Configuration: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
}
//logger.info(`Creating S3 client with configuration: ${JSON.stringify(s3Configuration)}`)

export const s3Client = new S3Client(s3Configuration)
export const emailClient = new SESClient({})

// Load server
const port = parseInt(process.env.PORT || "8000")
export const server = app.listen(port, "0.0.0.0")
