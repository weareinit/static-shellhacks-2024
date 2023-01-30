const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const router = require('./routes/v1')
const httpStatus = require('http-status')
const morgan = require('./config/morgan')
const helmet = require('helmet')
const xssClean = require('xss-clean')
const ApiError = require('./errors/ApiError')
const { errorConverter, errorHandler } = require('./errors/error')
const rateLimiter = require('./middleware/ratelimiter')


const app = express()

if(config.env !== 'test'){
  app.use(morgan.errorHandler);
  app.use(morgan.successHandler);
}

// Secure http headers
app.use(helmet())

// Santize input data
app.use(xssClean())

// Parse Json request body 
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

// Enable cors 
// app.use(cors)
// app.options('*', cors())

if(config.env === 'production'){
  app.use('/v1', rateLimiter);
}

// v1 api routes
app.use('/v1', router)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// Convert errors to ApiError and handle 
app.use(errorConverter)
app.use(errorHandler)


module.exports = app
