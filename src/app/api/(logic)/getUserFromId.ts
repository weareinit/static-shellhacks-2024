import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const getHackerApplicationFromId = async (id: string) => {
  const data = await db.hacker_Applications.findUnique({
    where: {
      userId: id,
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
};
