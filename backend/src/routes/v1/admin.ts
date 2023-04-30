import express from "express"
import { Request, Response, NextFunction } from "express"
import { application_status_enums } from "@prisma/client"
import { prisma } from "@src/index"
import { z } from "zod"

export const router = express.Router()

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
