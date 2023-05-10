import "module-alias/register"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { router } from "./routes/v1/index"
import helmet from "helmet"
import { rateLimiter } from "./middleware/ratelimiter"
import { errorHandler } from "./middleware/errors"
import { auth } from "express-oauth2-jwt-bearer"
import { ManagementClient, AuthenticationClient } from "auth0"
import { logger } from "@config/logger"

var management = new ManagementClient({
  token: process.env.AUTH0_API_V2_TOKEN!,
  domain: process.env.AUTH0_DOMAIN!,
  clientId: `1T8U66xEruLkLNp1xcyts88zPibzP4Vl`, //process.env.AUTH0_CLIENT_ID!, //process.env.AUTH0_MANAGEMENT_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!, //process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!
})

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: `1T8U66xEruLkLNp1xcyts88zPibzP4Vl`, //process.env.AUTH0_CLIENT_ID!, //process.env.AUTH0_MANAGEMENT_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!, //process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!
})

const email = "jschuster8765@gmail.com"
const password = "password1werwiuahriareuAJKDEHSKJFHISDKEFHR334982347298#$@(*&$(*&2323"

auth0.database?.signUp(
  {
    email,
    password: "",
    connection: "email",
  },
  (err, res) => {
    if (err) {
      logger.error(err)
    } else {
      logger.info("User created")
    }
  }
)

// management.createUser(
//   {
//     connection: "email",
//     // connection: "Username-Password-Authentication",
//     email: "jschuster8765@outlook.com",
//     //password: "jhghjghFSdHFD#$$#@#$@^$45334",
//   },
//   (err: any) => {
//     if (err) {
//       logger.error(err)
//     } else {
//       logger.info("User created")
//     }
//   }
// )

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

app.use("/api/v1", auth(), router) //require a valid JWT for all routes, ISSUER_BASE_URL and AUDIENCE are fetched from .env

app.use(errorHandler)
