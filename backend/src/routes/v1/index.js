import express from "express";
import pkg from "express-openid-connect";
import { isNull } from "util";
import { prisma } from "../../index.js";

const { requiresAuth: requiresAuth } = pkg;

export const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", (req, res, next) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.get("/events", async (req, res, next) => {
  const getEvents = await prisma.events.findMany();
  res.send(getEvents);
});

router.get("/events/:event_id", async (req, res, next) => {

  const id = parseInt(req.params.event_id);

  if (isNaN(id)) {
    res.sendStatus(404);
  } else {
    const getEvent = await prisma.events.findUnique({
      where: {
        event_id: id,
      },
    });
    if(isNull(getEvent)){
      res.sendStatus(404)
    }
    else{
      res.send(getEvent);
    }
  }
});
