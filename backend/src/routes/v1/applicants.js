import express from "express";
import { prisma } from "../../index.js";
import { sanitizeAndPrepareParameters } from "../../models/filters.js";
export const router = express.Router();

router.get("/events/:event_id/applicants", async (req, res, next) => {
  // Check for query params
  if (Object.keys(req.query).length === 0) {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(400);
    } else {
      const getApplicants = await prisma.hacker_Applications.findMany({
        where: {
          event_id: event_id_param,
        },
      });
      if (getApplicants == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(204);
      } else {
        res.send(getApplicants);
      }
    }
    // If there are any query params, go to the GET route that handles them.
  } else {
    next();
  }
});

// By URL Query param ->?application_status='<param>'
router.get("/events/:event_id/applicants", async (req, res, next) => {
  if (req.query.application_status !== "") {
    const application_status_param = req.query.application_status;
    const event_id_param = parseInt(req.params.event_id);

    const resultantFilters = sanitizeAndPrepareParameters(
      application_status_param
    );

    if (isNaN(event_id_param) || resultantFilters.length === 0) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(400);
    } else {
      const getFilteredApplicants = await prisma.hacker_Applications.findMany({
        where: {
          event_id: event_id_param,
          OR: resultantFilters,
        },
      });
      if (getFilteredApplicants == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(204);
      } else {
        res.send(getFilteredApplicants);
      }
    }
  } else {
    // FIX - Different status code when missing or incorrect query param
    res.sendStatus(400);
  }
});

router.get("/events/:event_id/applicants/totals", async (req, res, next) => {
  const event_id_param = parseInt(req.params.event_id);

  if (isNaN(event_id_param)) {
    // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
    res.sendStatus(400);
  } else {
    const getTotalApplicantsGroupedByApplicationStatus =
      await prisma.hacker_Applications.groupBy({
        by: ["application_status"],
        where: { event_id: event_id_param },
        _count: { hacker_id: true },
      });

    if (getTotalApplicantsGroupedByApplicationStatus == null) {
      // FIX - Different status code when no results are found
      res.sendStatus(204);
    } else {

      // Reformat object names for better client use
      let result = getTotalApplicantsGroupedByApplicationStatus.map(obj => ({
        application_status: obj.application_status, total: obj._count.hacker_id
      }))

      res.send(result);
    }
  }
});
