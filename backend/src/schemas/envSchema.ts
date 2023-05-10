import { z } from "zod"

export const envSchema = z.object({
  PORT: z.string().default("8000"),
  DATABASE_URL: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ISSUER_BASE_URL: z.string().url(),
  AUDIENCE: z.string().url(),
  AUTH0_API_V2_TOKEN: z.string(),
  AUTH0_DOMAIN: z.string(),
})
