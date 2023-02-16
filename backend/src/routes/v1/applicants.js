import express from "express";
import { prisma } from "../../index.js";
export const router = express.Router();


router.get("/events/:event_id/applicants", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getApplicants = await prisma.hacker_Applications.findMany({
      where: {
        event_id: event_id_param,
      },
    });
    if (getApplicants == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(404);
    } else {
      res.send(getApplicants);
    }
  }
});

router.get("/events/:event_id/applicants/accepted", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getAcceptedApplicants = await prisma.hacker_Applications.findMany({
      where: {
        event_id: event_id_param,
        acceptance_status: true,
      },
    });
    if (getAcceptedApplicants == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(404);
    } else {
      res.send(getAcceptedApplicants);
    }
  }
});

router.get("/events/:event_id/applicants/declined", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getDeclinedApplicants = await prisma.hacker_Applications.findMany({
      where: {
        event_id: event_id_param,
        acceptance_status: false,
      },
    });
    if (getDeclinedApplicants == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(404);
    } else {
      res.send(getDeclinedApplicants);
    }
  }
});

router.get("/events/:event_id/applicants/pending", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(404);
  } else {
    const getPendingApplicants = await prisma.hacker_Applications.findMany({
      where: {
        event_id: event_id_param,
        acceptance_status: null,
      },
    });
    if (getPendingApplicants == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(404);
    } else {
      res.send(getPendingApplicants);
    }
  }
});

