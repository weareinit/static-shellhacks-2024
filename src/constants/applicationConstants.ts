import { application_status_enums } from "@prisma/client";

export const APPLICATION_STATUS_DETAILS_MAPPING: Record<string, string> = {
  [application_status_enums.registered]: "You have applied!",
  [application_status_enums.in_wave]: "You have applied!",
  [application_status_enums.accepted]: 'Congratulations! Your application has been accepted. Please click the "Confirm" button below to confirm your attendance.',
  [application_status_enums.confirmed]: "You have confirmed your attendence!",
  [application_status_enums.withdrawn]: "You have withdrawn your application :(",
  [application_status_enums.waitlisted]: "You have applied!",
  [application_status_enums.checked_in]: "You have checked in!",
};

export const APPLICATION_STATUS_COLOR_MAPPING = {
  [application_status_enums.registered]: "#facc15",
  [application_status_enums.waitlisted]: "#a8a29e",
  [application_status_enums.in_wave]: "#7c3aed",
  [application_status_enums.confirmed]: "#22c55e",
  [application_status_enums.accepted]: "#3b82f6",
  [application_status_enums.withdrawn]: "#ef4444",
  [application_status_enums.checked_in]: "#D946EF",
};
