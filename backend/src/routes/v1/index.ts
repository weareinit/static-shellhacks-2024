import express from "express"
import { router as EventsRouter } from "./events"
import { router as ApplicantsRouter } from "./applicants"
import { router as EmailsRouter } from "./emails"
import { router as ResumesRouter } from "./resumes"

export const router = express.Router()

const routes = [EventsRouter, ApplicantsRouter, EmailsRouter, ResumesRouter]

// Load additional routes
routes.map((route) => {
  router.use(route)
})
