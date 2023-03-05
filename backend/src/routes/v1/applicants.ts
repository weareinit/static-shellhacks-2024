import express from "express";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../index";
import { sanitizeAndPrepareParameters } from "../../filters/filters";
import { Hacker_Applications } from "@prisma/client";
import { TestApplicantStruct } from "../../models/test_applicant";


export const router = express.Router();

router.get(
  "/events/:eventId/applicants",
  async (req: Request, res: Response, next: NextFunction) => {
    // Check for query params
    if (Object.keys(req.query).length < 1) {
      const eventIdParam: number = parseInt(req.params.eventId, 10);

      if (isNaN(eventIdParam)) {
        // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
        res.sendStatus(400);
      } else {
        const getApplicants: Hacker_Applications[] =
          await prisma.hacker_Applications.findMany({
            where: {
              event_id: eventIdParam,
            },
          });
        if (getApplicants == null || getApplicants.length < 1) {
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

      if (isNaN(eventIdParam) || resultantFilters.length === 0) {
        // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
        res.sendStatus(400);
      } else {
        const getFilteredApplicants: Hacker_Applications[] =
          await prisma.hacker_Applications.findMany({
            where: {
              event_id: eventIdParam,
              OR: resultantFilters,
            },
          });
        if (getFilteredApplicants == null || getFilteredApplicants.length < 1) {
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
  }
);

router.get(
  "/events/:eventId/applicants/totals",
  async (req: Request, res: Response) => {
    const eventIdParam: number = parseInt(req.params.eventId, 10);

    if (isNaN(eventIdParam)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(400);
    } else {
      const getTotalApplicantsGroupedByApplicationStatus =
        await prisma.hacker_Applications.groupBy({
          by: ["application_status"],
          where: { event_id: eventIdParam},
          _count: { hacker_id: true },
        });

      if (
        getTotalApplicantsGroupedByApplicationStatus == null ||
        getTotalApplicantsGroupedByApplicationStatus.length < 1
      ) {
        // FIX - Different status code when no results are found
        res.sendStatus(204);
      } else {
        // Reformat object names for better client use
        const result = getTotalApplicantsGroupedByApplicationStatus.map(
          (obj) => ({
            application_status: obj.application_status,
            total: obj._count.hacker_id,
          })
        );

        res.send(result);
      }
    }
  }
);

//Add Applicants when they register
router.post(
  "/events/:eventId/applicants",
  async (req: Request, res: Response) => {

    const eventIdParam: number = parseInt(req.params.eventId, 10);
    // const { event_id, 
    //         first_name, 
    //         last_name, 
    //         email, 
    //         discord, 
    //         gender, 
    //         ethnicity, 
    //         phone_number} = req.body;
    if (isNaN(eventIdParam)) {
      // FIX - Come up with a better way to validate user input for request params - i.e. ":event_id"
      res.sendStatus(400);
    } else {
      const applicant = await prisma.hacker_Applications.create({
        data: {
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
        }
      })
      
      res.send("applicant sent")
    }

  });