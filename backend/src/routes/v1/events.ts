import { Events } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@src/index"
import { logger } from "@config/logger"

export const router = express.Router()

router.get("/events", async (_: Request, res: Response, __: NextFunction) => {
  try {
    const events: Events[] = await prisma.events.findMany()
    res.send(events).status(200)
  } catch (e) {
    res.sendStatus(500)
  }
})

router.get("/events/:eventId", async (req: Request, res: Response, _: NextFunction) => {
  const eventIdSchema = z.string().transform(Number)

  try {
    const eventId = eventIdSchema.parse(req.params.eventId)

    const event: Events | null = await prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
    })

    res.send(event).status(200)
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.sendStatus(400)
    } else {
      logger.error(e)
      res.sendStatus(500)
    }
  }
})
