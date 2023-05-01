import { z } from "zod"
import { NextFunction, Request, Response } from "express"
import { InsufficientScopeError } from "express-oauth2-jwt-bearer"
import { logger } from "@config/logger"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  if (err instanceof z.ZodError) res.status(400).send({ message: err.issues })
  if (err instanceof InsufficientScopeError) res.sendStatus(403)
  next(err)
}
