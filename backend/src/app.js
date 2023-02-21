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

export const app = express()

if(config.env !== 'test'){
  app.use(morganHandlers.successHandler);
  app.use(morganHandlers.errorHandler);
}

// Secure http headers
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
);

// Parse Json request body 
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

// Enable cors 
app.use(cors())

// Final cors setup
// app.use(cors({
//   origin: config.clientOriginUrl,
//   allowedHeaders: ["Authorization", "Content-Type"],
//   maxAge: 86400,
// }));

if(config.env === 'production'){
  app.use('/api/v1', rateLimiter);
}

// api routes 
app.use('/api/v1', router)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// Convert errors to ApiError and handle 
app.use(errorConverter)
app.use(errorHandler)
