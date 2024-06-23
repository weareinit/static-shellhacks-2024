import { NextResponse } from "next/server";
import {
  adminFetchApplicantsSchema,
  applicantStatusChangeSchema,
} from "@/app/schemas/applicantSchemas";
import { db } from "@/server/db";
import { generateApplicantCSV } from "@/app/util/generateApplicantCSV";
import { auth } from "@/server/auth";

// export const dynamic = "auto";
// export const revalidate = 60;

export const GET = auth(async (request) => {
  if (!request.auth || !request.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const queryparams = Object.fromEntries(request.nextUrl.searchParams);
  const safedata = adminFetchApplicantsSchema.safeParse(queryparams);

  if (!safedata.success) {
    return new NextResponse(safedata.error.message, { status: 400 });
  }

  const { format, cursor, searchParams, ...filters } = safedata.data;

  const filteredApplicants = await db.hacker_Applications.findMany({
    // relationLoadStrategy: "join",
    include: {
      user: {
        select: {
          email: true,
          discordUsername: true,
        },
      },
    },
    where: {
      id: {
        gt: cursor || 0,
      },
      ...(filters.school && { school: filters.school }),
      ...(filters.grad_year && { grad_year: filters.grad_year }),
      ...(filters.application_status != "any" && {
        application_status: filters.application_status,
      }),
      ...(searchParams && {
        OR: [
          { phone_number: { startsWith: searchParams, mode: "insensitive" } },
          { email: { startsWith: searchParams, mode: "insensitive" } },
          { first_name: { startsWith: searchParams, mode: "insensitive" } },
          { last_name: { startsWith: searchParams, mode: "insensitive" } },
          {
            user: {
              discordUsername: {
                startsWith: searchParams,
                mode: "insensitive",
              },
            },
          },

          //{user.discordUsername: {startsWith: searchParams}},
        ],
      }),
    },
    orderBy: {
      created_at: "desc",
    },
    take: 20,
  });

  const nextCursor = filteredApplicants[filteredApplicants.length - 1]?.id;

  if (format === "csv") {
    const csvData = await generateApplicantCSV(filteredApplicants);

    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=applicants.csv",
      },
    });
  }

  const response = {
    data: filteredApplicants,
    nextCursor,
  };

  return NextResponse.json(response);
});

/*
 * Route for an admin to update the status of multiple applicants at once
 * This could be used for adding applicants to the wave, waitlisting, etc.
 */
export const POST = auth(async (request) => {
  if (!request.auth || !request.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const safedata = applicantStatusChangeSchema.safeParse(request.body);

  if (!safedata.success) {
    return new NextResponse(safedata.error.message, { status: 400 });
  }

  const { ids, application_status } = safedata.data;

  await db.hacker_Applications.updateMany({
    where: {
      userId: {
        //idk if we want userid or hackerid here, we will have to see
        in: ids,
      },
    },
    data: {
      application_status,
    },
  });

  return NextResponse.json({ message: "Successfully updated applicants" });
});
