import express from "express";
import pkg from "express-openid-connect";
import { prisma } from "../../index.js";
import { router as EventsRouter } from "./events.js";
import { router as ApplicantsRouter } from "./applicants.js";
import { router as EmailsRouter } from "./emails.js";

const { requiresAuth: requiresAuth } = pkg;

export const router = express.Router();

const defaultRoutes = [
  {
    route: EventsRouter,
  },
  {
    route: ApplicantsRouter
  },
  {
    route: EmailsRouter
  }
];

// Load additional routes
defaultRoutes.forEach((route) => {
  router.use(route.route);
});

router.get("/", (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", (req, res, next) => {
  res.send(JSON.stringify(req.oidc.user));
});
