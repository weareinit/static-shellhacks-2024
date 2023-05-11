import dotenv from "dotenv"
import { app } from "./app"
import { logger } from "@config/logger"
import { PrismaClient } from "@prisma/client"
import { S3Client } from "@aws-sdk/client-s3"
import { SESClient } from "@aws-sdk/client-ses"
import { envSchema } from "@src/schemas/envSchema"
import { ManagementClient } from "auth0"

dotenv.config({ path: "../../.env" })
envSchema.parse(process.env) // Validate environment variables

// Load Database connection - Will throw error here if unable to connect.
export const prisma = new PrismaClient()

// Create S3 client
// FIX - Find some way to make sure this can be caught if there was an error
export const s3Client = new S3Client({})
export const emailClient = new SESClient({})

export const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  token: process.env.AUTH0_API_V2_TOKEN!,
})

// Load server
export const server = app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`)
})
