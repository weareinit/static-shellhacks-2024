import express, { NextFunction, Request, Response } from "express";
import { router as EventsRouter } from "./events";
import { router as ApplicantsRouter } from "./applicants";
import { router as EmailsRouter } from "./emails";
import { router as ResumesRouter } from "./resumes"


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
