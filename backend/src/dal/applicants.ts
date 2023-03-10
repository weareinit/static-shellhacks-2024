import { application_status_enums, Hacker_Applications } from "@prisma/client";
import { TestApplicantStruct } from "../models/test_applicant";
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

export async function insertHackerApplication(hacker_applications: TestApplicantStruct, eventId: number): Promise<Hacker_Applications> {
  const savedApplicant: Hacker_Applications = await prisma.hacker_Applications.create({
    data: {
      event_id: eventId,
      first_name: hacker_applications.first_name,
      last_name: hacker_applications.last_name,
      email: hacker_applications.email,
      discord: hacker_applications.discord,
      gender: hacker_applications.gender,
      ethnicity: hacker_applications.ethnicity,
      phone_number: hacker_applications.phone_number,
      race: hacker_applications.race,
      dob: new Date(2023,1,1),
      major: hacker_applications.major,
      school: hacker_applications.school,
      resume_path: hacker_applications.resume_path,
      github: hacker_applications.github,
      linkedin: hacker_applications.linkedin,
      level_of_study: hacker_applications.level_of_study,
      interest_response: hacker_applications.interest_response,
      email_message_status: hacker_applications.email_message_status,
      developer_role: hacker_applications.developer_role,
    },
  });

  return savedApplicant;
}