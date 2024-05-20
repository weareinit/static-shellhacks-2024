import { NextRequest, NextResponse } from "next/server";
import { adminApplicantUpdateSchema } from "@/app/schemas/applicantSchemas";
import { db } from "@/server/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const safedata = adminApplicantUpdateSchema.safeParse(request.body);

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
