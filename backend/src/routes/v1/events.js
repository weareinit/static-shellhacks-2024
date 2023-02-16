import express from "express";
import { prisma } from "../../index.js";
export const router = express.Router();


router.get("/events", async (req, res, next) => {
  const getEvents = await prisma.events.findMany();
  if (getEvents == null) {
    // FIX - Different status code when no results are found
    res.sendStatus(404);
  } else {
    res.send(getEvents);
  }
});

router.get("/events/:event_id", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getEvent = await prisma.events.findUnique({
      where: {
        event_id: event_id_param,
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
