import { application_status_enums } from "@prisma/client";
import { ApplicantFilters } from "@/app/schemas/applicantSchemas";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const getAggregateHackerApplicationStats = async (filters: ApplicantFilters) => {
  //   const session = await auth();
  //   if (!session?.user.admin) {
  //     return false;
  //   }

  type FilterConditions = Prisma.Hacker_ApplicationsWhereInput;

  // Construct the filter object for the Prisma query
  const filterConditions: FilterConditions = {};
  if (filters.application_status && filters.application_status !== "any") {
    if (Object.values(application_status_enums).includes(filters.application_status as application_status_enums)) {
      filterConditions.application_status = filters.application_status as application_status_enums;
    }
  }
  if (filters.grad_year) {
    filterConditions.grad_year = Number(filters.grad_year);
  }
  if (filters.school) {
    filterConditions.school = {
      contains: filters.school,
      mode: "insensitive",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Total number of people registered
  const totalRegistered = await db.hacker_Applications.count();

  // Number of users registered by status
  const registeredByStatus = await db.hacker_Applications.groupBy({
    by: ["application_status"],
    _count: {
      application_status: true,
    },
  });

  // Number of users registered today
  const registeredToday = await db.hacker_Applications.count({
    where: {
      created_at: {
        gte: today,
      },
    },
  });

  // Date the last user registered
  const lastRegisteredUser = await db.hacker_Applications.findFirst({
    orderBy: {
      created_at: "desc",
    },
    select: {
      created_at: true,
    },
  });

  const totalFiltered = await db.hacker_Applications.count({
    where: filterConditions,
  });

  const data = {
    totalFiltered,
    totalRegistered,
    registeredByStatus,
    registeredToday,
    lastRegisteredDate: lastRegisteredUser?.created_at,
  };

  return data;
};
