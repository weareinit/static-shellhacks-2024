import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
export const router = express.Router();


router.get("/events", async (_ : Request, res: Response, __ : NextFunction) => {
  const getEvents = await prisma.events.findMany();
  if (getEvents == null) {
    // FIX - Different status code when no results are found
    res.sendStatus(404);
  } else {
    res.send(getEvents);
  }
});

router.get("/events/:eventId", async (req: Request, res: Response, _: NextFunction) => {
  const eventIdParam = parseInt(req.params.eventId, 10);

  if (isNaN(eventIdParam)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getEvent = await prisma.events.findUnique({
      where: {
        event_id: eventIdParam,
      },
    });
    if (getEvent == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(404);
    } else {
      res.send(getEvent);
    }
  }
});
