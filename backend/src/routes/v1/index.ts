import express from "express"
import { requiredScopes } from "express-oauth2-jwt-bearer"
import { router as EventsRouter } from "./events"
import { router as ApplicantsRouter } from "./applicants"
import { router as ResumesRouter } from "./resumes"
import { router as AdminRouter } from "./admin"
import { auth } from "express-oauth2-jwt-bearer"

export const router = express.Router()

const routes = [EventsRouter, ApplicantsRouter, ResumesRouter]
const adminRoutes = [AdminRouter]

// Load additional routes
routes.map((route) => {
  router.use(route)
})

adminRoutes.map((route) => {
  router.use("/admin", auth(), requiredScopes("access:admin-routes"), route)
})
