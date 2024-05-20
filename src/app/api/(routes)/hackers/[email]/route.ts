import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { userApplicantUpdateSchema } from "@/app/schemas/applicantSchemas";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

export async function GET({ params }: { params: { email: string } }) {
  const data = await db.hacker_Applications.findUnique({
    where: {
      email: params.email,
    },
  });

  //should convert to DTO?
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const safedata = userApplicantUpdateSchema.safeParse(request.body);

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
