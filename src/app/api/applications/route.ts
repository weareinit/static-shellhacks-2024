import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { isAdmin } from "src/app/util/auth0Utils";
import { generateApplicantCSV } from "@/app/util/generateApplicantCSV";
import {
  applicantStatusChangeSchema,
  applicantFiltersSchema,
} from "@/app/schemas/applicantSchemas";
import { newApplicantSchema } from "@/app/schemas/applicantSchemas";
import { sendConfirmationEmail } from "@/app/util/aws";
import { generateSignedResumeUploadUrl } from "@/app/util/aws";
import { randomBytes } from "crypto";
import { validateCaptcha } from "@/app/util/ApiUtils";
import { prisma } from "@/app/util/ApiUtils";
import { NextResponse } from "next/server";

// async function updateApplicant(req: NextApiRequest, res: NextApiResponse) {
//   req.body = JSON.parse(req.body);
//   const { hacker_id, application_status } = applicantStatusChangeSchema.parse(req.body);

//   const updatedApplicant = await prisma.hacker_Applications.update({
//     where: { hacker_id },
//     data: { application_status },
//   });

//   return res.status(200).json(updatedApplicant);
// }

// const user = await getServerAuthSession()

export async function GET(req: NextApiRequest) {
  // const is_admin = user?.user.admin
  const is_admin = true;

  const headers = new Headers(req.headers); // ?

  if (!is_admin) {
    return NextResponse.json({
      message:
        "Unauthorized. You are not allowed get all applicants without the admin role.",
    });
  }

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
      created_at: "asc",
    },
  });

  if (outFormat === "csv") {
    //export the csv of applicant data
    const csvData = await generateApplicantCSV(filteredApplicants);
    // TODO: make sure this works
    headers.set("Content-Type", "text/csv");
    headers.set("Content-Disposition", "attachment; filename=applicants.csv");
    // old: return res.status(200).send(csvData);
    // TODO: make sure this works
    return NextResponse.json(csvData);
  }
  return NextResponse.json(filteredApplicants);
}

export async function PUT(req: NextApiRequest) {
  const admin = isAdmin(req);

  if (!admin) {
    return NextResponse.json({
      message:
        "Unauthorized. You are not allowed to update applicants without the admin role.",
    });
  }

  const { ids, application_status } = applicantStatusChangeSchema.parse(
    req.body,
  );

  await prisma.hacker_Applications.updateMany({
    where: {
      hacker_id: {
        in: ids,
      },
    },
    data: {
      application_status,
    },
  });

  return NextResponse.json({ message: "Successfully updated applicants" });
}

export async function POST(req: NextApiRequest) {
  await validateCaptcha(req);

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user

  const validatedApplicant = newApplicantSchema.parse({
    event_id: "1", //req.query.eventId,
    resume_path: resumeId,
    ...req.body,
  });

  //there's no unique constraint on case insensitive emails, so we have to check manually
  const existingApplicant = await prisma.hacker_Applications.findMany({
    where: {
      email: {
        equals: validatedApplicant.email,
        mode: "insensitive",
      },
    },
  });

  if (existingApplicant.length > 0) {
    return NextResponse.json({
      error: "Duplicate. User already exists with that email.",
    });
  }

  try {
    await prisma.hacker_Applications.create({
      data: validatedApplicant,
    });

    await sendConfirmationEmail(
      validatedApplicant.email,
      validatedApplicant.first_name,
    );
    const url = await generateSignedResumeUploadUrl(resumeId);

    return NextResponse.json({ resume_url: url });
  } catch (e) {
    console.log("Error occured!", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        NextResponse.json({
          error: "Duplicate. User already exists with that email.",
        });
      }
    }
    return NextResponse.json({
      error:
        "Internal Error. Could not create applicant and send confirmation email.",
    });
  }
}
