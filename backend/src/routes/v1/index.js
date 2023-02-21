import express from "express";
import { router as EventsRouter } from "./events.js";
import { router as ApplicantsRouter } from "./applicants.js";
import { router as EmailsRouter } from "./emails.js";
import { router as ResumesRouter } from "./resumes.js"


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
  },
  {
    route: ResumesRouter
  }

];

// Load additional routes
defaultRoutes.forEach((route) => {
  router.use(route.route);
});

router.get("/", (req, res, next) => {
  res.send("Home page");
});

