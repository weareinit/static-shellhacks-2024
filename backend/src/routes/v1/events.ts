import { Events } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@src/index"

export const router = express.Router()

router.get("/events", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const events: Events[] = await prisma.events.findMany()
    res.send(events).status(200)
  } catch (e) {
    next(e)
  }
})

router.get("/events/:eventId", async (req: Request, res: Response, next: NextFunction) => {
  const eventIdSchema = z.string().regex(/^\d+$/).transform(Number)

  try {
    const eventId = eventIdSchema.parse(req.params.eventId)

    const event: Events | null = await prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
    })

    res.send(event).status(200)
  } catch (e) {
    next(e)
  }
})
