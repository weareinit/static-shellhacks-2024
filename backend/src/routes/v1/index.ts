import express from "express"
import { router as EventsRouter } from "./events"
import { router as ApplicantsRouter } from "./applicants"
import { router as EmailsRouter } from "./emails"
import { router as ResumesRouter } from "./resumes"
import { router as AdminRouter } from "./admin"

export const router = express.Router()

const routes = [EventsRouter, ApplicantsRouter, EmailsRouter, ResumesRouter]
const adminRoutes = [AdminRouter]

// Load additional routes
routes.map((route) => {
  router.use(route)
})

adminRoutes.map((route) => {
  router.use("/admin", route) //eventually make these authenticated
})
