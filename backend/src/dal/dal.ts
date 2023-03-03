import {
  getApplicantsByEventId,
  getApplicantsByEventIdAndFilteredByApplicationStatus,
  getTotalNumberOfApplicantsGroupedByApplicationStatus,
} from "./applicants";
import { getEvent, getAllEvents } from "./events";

export const dal = {
  applicants: {
    getApplicantsByEventId,
    getApplicantsByEventIdAndFilteredByApplicationStatus,
    getTotalNumberOfApplicantsGroupedByApplicationStatus,
  },
  events: {
    getEvent,
    getAllEvents,
  },
};
