import express from 'express'
import { config } from './config/config.js'
import cors from 'cors'
import { router } from './routes/v1/index.js'
import httpStatus from 'http-status'
import { morganHandlers } from './config/morgan.js'
import helmet from 'helmet'
import ApiError from './errors/ApiError.js'
import { errorConverter, errorHandler } from './errors/error.js'
import { rateLimiter } from './middleware/ratelimiter.js'
import { auth } from 'express-openid-connect'

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: config.auth_0_secret,
  baseURL: config.baseURL,
  clientID: config.clientID,
  issuerBaseURL: config.issuerBaseUrl,
}

export const app = express()

if(config.env !== 'test'){
  app.use(morganHandlers.successHandler);
  app.use(morganHandlers.errorHandler);
}

// Secure http headers
app.use(helmet())

// Parse Json request body 
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

// Enable cors 
// app.use(cors)
// app.options('*', cors())

app.use(auth(authConfig))

if(config.env === 'production'){
  app.use('/', rateLimiter);
}

// api routes
app.use('/', router)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// Convert errors to ApiError and handle 
app.use(errorConverter)
app.use(errorHandler)
