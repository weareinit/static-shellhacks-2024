import { Events } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { dal } from "../../dal/dal";
export const router = express.Router();


router.get("/events", async (_ : Request, res: Response, __ : NextFunction) => {
  const events: Events[] = await dal.events.getAllEvents()
  if (events.length < 1) {
    // FIX - Different status code when no results are found
    res.sendStatus(204);
  } else {
    res.send(events);
  }
});

router.get("/events/:eventId?", async (req: Request, res: Response, _: NextFunction) => {

  if(!req.params){
    res.sendStatus(400)
  }

  const eventIdParam = parseInt(req.params.eventId, 10);

  if (isNaN(eventIdParam) || eventIdParam < 1) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {

    const uniqueEvent: Events = await dal.events.getEvent(eventIdParam);
    if (uniqueEvent == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(204);
    } else {
      res.send(uniqueEvent);
    }
  }
});
