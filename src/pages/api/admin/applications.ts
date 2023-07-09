import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "src/util/auth0Utils";
import { generateApplicantCSV } from "@/util/generateApplicantCSV";
import { applicantStatusChangeSchema, applicantFiltersSchema } from "@/schemas/applicantSchemas";
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  if (req.method == "PUT") {
    const { event_id, hacker_id, application_status } = applicantStatusChangeSchema.parse({
      event_id: "1",
      //hacker_id: req.query.hackerId,
      ...req.body,
    });

    const updatedApplicant = await prisma.hacker_Applications.update({
      where: { hacker_id },
      data: { application_status },
    });

    res.status(200).json({ updatedApplicant });
  } else if (req.method === "GET") {
    const filters = applicantFiltersSchema.parse({
      event_id: "1",
      ...req.query,
    });

    const outFormat = filters.format;
    delete filters.format;

    const filteredApplicants = await prisma.hacker_Applications.findMany({
      where: {
        ...filters,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (outFormat === "csv") {
      //export the csv of applicant data
      const csvData = await generateApplicantCSV(filteredApplicants);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=applicants.csv");
      res.status(200).send(csvData);
    } else {
      //otherwise, return the data as JSON
      return res.status(200).json(filteredApplicants);
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default withApiAuthRequired(handler);
