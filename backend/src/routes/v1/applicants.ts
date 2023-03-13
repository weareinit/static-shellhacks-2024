import express from "express";
import { Request, Response, NextFunction } from "express";
import { sanitizeAndPrepareParameters } from "../../filters/filters";
import { Hacker_Applications } from "@prisma/client";
import { dal } from "../../dal/dal";
import { newHackerApplication } from "../../interfaces/newHackerApplication";

export const router = express.Router();

const newHackerApplicant: newHackerApplication =
  {
      event_id: 1,
      first_name: 'Giancarlo',
      last_name: 'Padron',
      email: 'pipi@mail.com',
      discord: 'vibes#0044',
      gender: 'M',
      ethnicity: 'Hispanic',
      phone_number: '9999999999',
      race: 'white',
      dob: new Date(2023,1,1),
      major: 'comp sci',
      school: 'fiu',
      resume_path: 'giancarlopadron.pdf',
      github: null,
      linkedin: null,
      level_of_study: 'Junior',
      interest_response: 'Placeholder',
      email_message_status: true,
      developer_role: "Top G",
  };

router.get(
  "/events/:eventId/applicants",
  async (req: Request, res: Response, next: NextFunction) => {
    // Check for query params
    if (Object.keys(req.query).length < 1) {
      const eventIdParam: number = parseInt(req.params.eventId, 10);

      if (isNaN(eventIdParam) || eventIdParam < 1) {
        // FIX - Come up with a better way to validate user input for request params - i.e. ":eventId"
        res.sendStatus(404);
      } else {
        const applicants: Hacker_Applications[] =
          await dal.applicants.getApplicantsByEventId(eventIdParam);
        if (applicants.length < 1) {
          // FIX - Different status code when no results are found
          res.sendStatus(204);
        } else {
          res.send(applicants);
        }
      }
      // If there are any query params, go to the GET route that handles them.
    } else {
      next();
    }
  }
);

// By URL Query param ->?application_status='<param>'
router.get(
  "/events/:eventId/applicants",
  async (req: Request, res: Response) => {
    if (req.query.application_status !== "") {
      const applicationStatusParam: string | string[] = req.query
        .application_status as string | string[];
      const eventIdParam: number = parseInt(req.params.eventId, 10);

      const resultantFilters: object[] = sanitizeAndPrepareParameters(
        applicationStatusParam
      );

      if (isNaN(eventIdParam) || resultantFilters.length < 1) {
        // FIX - Come up with a better way to validate user input for request params - i.e. ":eventId"
        res.sendStatus(404);
      } else {
        const filteredApplicants =
          await dal.applicants.getApplicantsByEventIdAndFilteredByApplicationStatus(
            eventIdParam,
            resultantFilters
          );
        if (filteredApplicants.length < 1) {
          // FIX - Different status code when no results are found
          res.sendStatus(204);
        } else {
          res.send(filteredApplicants);
        }
      }
    } else {
      // FIX - Different status code when missing or incorrect query param
      res.sendStatus(404);
    }
  }
);

router.get(
  "/events/:eventId/applicants/application_status/totals",
  async (req: Request, res: Response) => {
    const eventIdParam: number = parseInt(req.params.eventId, 10);

    if (isNaN(eventIdParam)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":eventId"
      res.sendStatus(404);
    } else {
      const totalNumberOfApplicantsGroupedByApplicationStatus: object =
        await dal.applicants.getTotalNumberOfApplicantsGroupedByApplicationStatus(
          eventIdParam
        );
      if (totalNumberOfApplicantsGroupedByApplicationStatus == null) {
        // FIX - Different status code when no results are found
        res.sendStatus(204);
      } else {
        res.send(totalNumberOfApplicantsGroupedByApplicationStatus);
      }
    }
  }
);

//Add Applicants when they register
router.post(
  "/events/:eventId/applicants",
  async (req: Request, res: Response) => {
    console.log(req.body)
    const eventIdParam: number = parseInt(req.params.eventId, 10);
    if (isNaN(eventIdParam)) {
      res.sendStatus(400);
    } else {
      const createApplicant: object =
        await dal.applicants.insertHackerApplication(
          req.body,
          eventIdParam
        );
        console.log(createApplicant)
      }

      res.send("applicant sent")
    }
  );