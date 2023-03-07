import httpStatus from 'http-status'
import { config } from '../config/config'
import { logger } from '../config/logger'
import ApiError from '../errors/ApiError'
import { NextFunction, Request, Response } from 'express'

export const errorConverter = (err: any, _: Request, __: Response, next: NextFunction) => {
  let error = err;
  if(!(error instanceof ApiError)){
    const statusCode = error.statusCode;
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err: any, _: Request, res: Response) => {
  let { statusCode, message } = err;
  if(config.env === 'production' && !err.isOperational){
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && {stack: err.stack}),
  };

  if(config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export class S3UploadError extends Error {
  constructor(message: string){
    super(message);
    this.name = "S3UploadError"
  }
}

export class S3RetrievalError extends Error {
  constructor(message: string){
    super(message);
    this.name = "S3RetrievalError"
  }
}
