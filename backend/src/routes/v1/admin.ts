import express from "express"
import { Request, Response, NextFunction } from "express"
import { application_status_enums } from "@prisma/client"
import { prisma } from "@src/index"
import { z } from "zod"

export const router = express.Router()

router.put("/:hackerId/addToWave", async (req: Request, res: Response, next: NextFunction) => {
  // Handle validation of the request body
  try {
    const requestSchema = z.object({ hackerId: z.string().regex(/^\d+$/).transform(Number) })
    const { hackerId } = requestSchema.parse(req.params)

    await prisma.hacker_Applications.update({
      where: { hacker_id: hackerId },
      data: { application_status: application_status_enums.in_wave },
    })

    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.post("/acceptWave", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.hacker_Applications.updateMany({
      where: { application_status: application_status_enums.in_wave },
      data: { application_status: application_status_enums.accepted },
    })

    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})
