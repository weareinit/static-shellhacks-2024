const express = require('express')
const cors = require('cors')
const router = require('./routes/v1')
const httpStatus = require('http-status')
const ApiError = require('./errors/ApiError')


const app = express()

// app.use(cors)
// app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use('/v1', router)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

module.exports = app
