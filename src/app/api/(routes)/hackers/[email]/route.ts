import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { applicantUpdateSchema } from "@/app/schemas/applicantSchemas";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

/*
 * Route to get an applicant's information. For a hacker, this route is only accessable if they own the id. For an admin, they can get any applicant. This is enforced in the middleware
 */
export async function GET({ params }: { params: { email: string } }) {
  const data = await db.hacker_Applications.findUnique({
    where: {
      email: params.email,
    },
  });

  //should convert to DTO?
  return NextResponse.json(data);
}

/*
 * Route to update an applicant's information. For supported fields, see the applicantUpdateSchema.
 * For a hacker, this route is only accessable if they own the id. For an admin, they can update any applicant. This is enforced in the middleware
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const safedata = applicantUpdateSchema.safeParse(request.body);

  if (!safedata.success) {
    return new NextResponse(safedata.error.message, { status: 400 });
  }

  const data = await db.hacker_Applications.update({
    where: {
      email: params.email,
    },
    data: safedata.data,
  });

  return NextResponse.json(data);
}
