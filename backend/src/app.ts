import "module-alias/register"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { router } from "./routes/v1/index"
import httpStatus from "http-status"
import helmet from "helmet"
import { rateLimiter } from "./middleware/ratelimiter"
import { errorHandler } from "./middleware/errors"
import { RecordWithTtl } from "dns"
import { auth, requiredScopes } from "express-oauth2-jwt-bearer"

export const app = express()

// Secure http headers
//Is this necessary or can nginx handle it?
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
)

const validateToken = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
})

// Parse Json request body
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// Enable cors
app.use(cors())

// Final cors setup
// app.use(cors({
//   origin: config.clientOriginUrl,
//   allowedHeaders: ["Authorization", "Content-Type"],
//   maxAge: 86400,
// }));

if (process.env.NODE_ENV === "production") {
  app.use("/api/v1", rateLimiter)
}

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello World" })
})

app.use("/api/v1", validateToken, router)

app.use(errorHandler)
