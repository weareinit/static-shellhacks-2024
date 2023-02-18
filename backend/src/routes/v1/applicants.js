import express from "express";
import { prisma } from "../../index.js";
import { isParamInApplicantFilters } from "../../models/filters.js";
export const router = express.Router();

router.get("/events/:event_id/applicants", async (req, res, next) => {
  // Check for query params
  if (Object.keys(req.query).length === 0) {
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
    // If there are any query params, go to the GET route that handles them.
  } else {
    next();
  }
});

router.get("/events/:event_id/applicants", async (req, res, next) => {
  if (req.query.application_status !== "") {
    // applicants?application_status='<param>'
    const application_status_param = req.query.application_status;
    const event_id_param = parseInt(req.params.event_id);

    if (
      isNaN(event_id_param) ||
      !isParamInApplicantFilters(application_status_param)
    ) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getFilteredApplicants = await prisma.hacker_Applications.findMany({
        where: {
          event_id: event_id_param,
          application_status: application_status_param,
        },
      });
      if (getFilteredApplicants == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getFilteredApplicants);
      }
    }
  } else {
    // FIX - Different status code when missing or incorrect query param
    res.sendStatus(404);
  }
});
