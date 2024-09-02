import { application_status_enums } from "@prisma/client";

export const APPLICATION_STATUS_NAME_MAPPING: Record<string, string> = {
  [application_status_enums.registered]: "Applied",
  [application_status_enums.in_wave]: "In Wave",
  [application_status_enums.accepted]: "Accepted",
  [application_status_enums.confirmed]: "Confirmed",
  [application_status_enums.withdrawn]: "Withdrawn",
  [application_status_enums.waitlisted]: "Waitlisted",
  [application_status_enums.checked_in]: "Checked In",
};

export const APPLICATION_STATUS_COLOR_MAPPING = {
  [application_status_enums.registered]: "#7838FF",
  [application_status_enums.waitlisted]: "#a8a29e",
  [application_status_enums.in_wave]: "#7838FF",
  [application_status_enums.confirmed]: "#22c55e",
  [application_status_enums.accepted]: "#3b82f6",
  [application_status_enums.withdrawn]: "#ef4444",
  [application_status_enums.checked_in]: "#D946EF",
};
