import { application_status_enums } from "@prisma/client";

export const APPLICATION_STATUS_DETAILS_MAPPING: Record<string, string> = {
  [application_status_enums.registered]: "You have applied!",
  [application_status_enums.in_wave]: "You have applied!",
  [application_status_enums.accepted]: 'Congratulations! Your application has been accepted. Please click the "Confirm" button below to confirm your attendance.',
  [application_status_enums.confirmed]: "You have confirmed your attendence!",
  [application_status_enums.withdrawn]: "You have withdrawn your application.",
  [application_status_enums.waitlisted]: "You have applied!",
};
