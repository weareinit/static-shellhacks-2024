import express from "express";
import { prisma } from "../../index.js";
export const router = express.Router();


// FIX - These routes are subject to change. I wrote the routes in this way because in the previous years
//       the shell team liked sending the acceptance emails in waves (batches). Through these routes we could
//       get all the applicants that have been accepted (or declined) and filter them by which ones haven't been
//       (or have been) emailed yet, download the emails, and send them via the mail solution if we don't design
//       one.
//       I think it would be best if we could do one click accept/decline and send the appropriate email for it.

router.get(
  "/events/:event_id/applicants/emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getAnyApplicantsThatHaveBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            email_message_status: true,
          },
        });
      if (getAnyApplicantsThatHaveBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getAnyApplicantsThatHaveBeenEmailed);
      }
    }
  }
);

router.get(
  "/events/:event_id/applicants/not-emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getAnyApplicantsThatHaveNotBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            email_message_status: false,
          },
        });
      if (getAnyApplicantsThatHaveNotBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getAnyApplicantsThatHaveNotBeenEmailed);
      }
    }
  }
);


router.get(
  "/events/:event_id/applicants/accepted/emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getAcceptedApplicantsThatHaveBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            acceptance_status: true,
            email_message_status: true,
          },
        });
      if (getAcceptedApplicantsThatHaveBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getAcceptedApplicantsThatHaveBeenEmailed);
      }
    }
  }
);

router.get(
  "/events/:event_id/applicants/accepted/not-emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getAcceptedApplicantsThatHaveNotBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            acceptance_status: true,
            email_message_status: false,
          },
        });
      if (getAcceptedApplicantsThatHaveNotBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getAcceptedApplicantsThatHaveNotBeenEmailed);
      }
    }
  }
);

router.get(
  "/events/:event_id/applicants/declined/emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getDeclinedApplicantsThatHaveBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            acceptance_status: false,
            email_message_status: true,
          },
        });
      if (getDeclinedApplicantsThatHaveBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getDeclinedApplicantsThatHaveBeenEmailed);
      }
    }
  }
);


router.get(
  "/events/:event_id/applicants/declined/not-emailed",
  async (req, res, next) => {
    const event_id_param = parseInt(req.params.event_id);

    if (isNaN(event_id_param)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(404);
    } else {
      const getDeclinedApplicantsThatHaveNotBeenEmailed =
        await prisma.hacker_Applications.findMany({
          where: {
            event_id: event_id_param,
            acceptance_status: false,
            email_message_status: false,
          },
        });
      if (getDeclinedApplicantsThatHaveNotBeenEmailed == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(404);
      } else {
        res.send(getDeclinedApplicantsThatHaveNotBeenEmailed);
      }
    }
  }
);
