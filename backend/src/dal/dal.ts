import {
  getApplicantsByEventId,
  getApplicantsByEventIdAndFilteredByApplicationStatus,
  getTotalNumberOfApplicantsGroupedByApplicationStatus,
  insertHackerApplication,
} from "./applicants";
import { getEvent, getAllEvents } from "./events";

export const dal = {
  applicants: {
    getApplicantsByEventId,
    getApplicantsByEventIdAndFilteredByApplicationStatus,
    getTotalNumberOfApplicantsGroupedByApplicationStatus,
    insertHackerApplication,
  },
  events: {
    getEvent,
    getAllEvents,
  },
};
