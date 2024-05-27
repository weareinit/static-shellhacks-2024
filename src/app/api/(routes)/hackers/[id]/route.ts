import { db } from "@/server/db";
import { NextResponse } from "next/server";
import {
  adminApplicantUpdateSchema,
  hackerApplicantUpdateSchema,
} from "@/app/schemas/applicantSchemas";
import { auth } from "@/server/auth";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

/*
 * Route to get an applicant's information. For a hacker, this route is only accessable if they own the id. For an admin, they can get any applicant. This is enforced in the middleware
 */
export const GET = auth(async (request, ctx) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  //yes, the types on ctx are terrible... https://auth0.github.io/nextjs-auth0/types/helpers_with_api_auth_required.AppRouteHandlerFnContext.html
  const id = (ctx.params?.id as string) || "";

  const data = await db.hacker_Applications.findUnique({
    where: {
      userId: request.auth.user.admin ? id : request.auth.user.id,
    },
    include: {
      user: true,
    },
  });

  if (!data) {
    return new NextResponse("Applicant not found", { status: 404 });
  }

  //should convert to DTO?
  return NextResponse.json(data);
});

/*
 * Route to update an applicant's information. For supported fields, see the applicantUpdateSchema.
 * For a hacker, this route is only accessable if they own the id. For an admin, they can update any applicant. This is enforced in the middleware
 */
export const PUT = auth(async (request, { params }) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  //since admins are allowed to change more fields (eg. application status) than the applicant
  const safedata = request.auth.user.admin
    ? adminApplicantUpdateSchema.safeParse(request.body)
    : hackerApplicantUpdateSchema.safeParse(request.body);

  if (!safedata.success) {
    return new NextResponse(safedata.error.message, { status: 400 });
  }

  //make sure a normal hacker can't update anyone's profile other than their own
  const data = await db.hacker_Applications.update({
    where: {
      userId: request.auth.user.admin
        ? (params?.id as string)
        : request.auth.user.id,
    },
    data: safedata.data,
  });

  return NextResponse.json({ data }, { status: 200 });
});
