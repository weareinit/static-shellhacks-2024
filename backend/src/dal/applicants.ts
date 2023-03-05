import { application_status_enums, Hacker_Applications } from "@prisma/client";
import { prisma } from "../index";

export async function getApplicantsByEventId(
  eventId: number
): Promise<Hacker_Applications[]> {
  const applicantsByEventId: Hacker_Applications[] =
    await prisma.hacker_Applications.findMany({
      where: {
        event_id: eventId,
      },
    });

  return applicantsByEventId;
}

export async function getApplicantsByEventIdAndFilteredByApplicationStatus(eventId: number, resultantFilters: object[]): Promise<Hacker_Applications[]> {
  const applicantsByEventIdAndFilteredByApplicationStatus: Hacker_Applications[] = await prisma.hacker_Applications.findMany({
    where: {
      event_id: eventId,
      OR: resultantFilters,
    },
  });

  return applicantsByEventIdAndFilteredByApplicationStatus;
}

export async function getTotalNumberOfApplicantsGroupedByApplicationStatus(eventId: number) : Promise<{ [status in application_status_enums]: number}>{

  const statusCounts = {} as { [status in application_status_enums]: number};
  const applicants = await prisma.hacker_Applications.findMany({
    where: {
    event_id: eventId,
    },
    select: {
      application_status: true,
    },
  });

  for (const applicant of applicants) {
    if (!statusCounts[applicant.application_status]) {
      statusCounts[applicant.application_status] = 0;
    }
    statusCounts[applicant.application_status]++;
  }

  return statusCounts;
}
