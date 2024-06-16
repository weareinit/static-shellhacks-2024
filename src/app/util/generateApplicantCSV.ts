import Prisma from "@prisma/client";
import { generateSignedResumeUrl } from "./aws";
import { json2csv } from "json-2-csv";

export async function generateApplicantCSV(data: Prisma.Hacker_Applications[]) {
  const applicantsWithResume: Array<
    Prisma.Hacker_Applications & { resume_url: string }
  > = [];

  for (const applicant of data) {
    applicantsWithResume.push({
      ...applicant,
      resume_url: "", //we cannot be generating a signed url for each applicant, its too expensive. Maybe some custom api route + kv store can take care of this??
      // resume_url: await generateSignedResumeUrl(
      //   applicant.resume_path as string
      // ),
    });
  }

  const csv = await json2csv(applicantsWithResume);
  return csv;
}
